import './styles/DepList.css';
import React, {useContext, useRef, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useHistory} from "react-router-dom";
import {GroupService} from "../../services/services";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import DepCreateModal from "./DepCreateModal";
import useLoading from "../../component/hooks/useLoading";
import FullscreenLoading from "../../component/FullScreenLoading";
import ContextProvider from "../../component/ContextProvider";
import AddIcon from "@material-ui/icons/Add";


const DepList = () => {
    const [data, setData] = useState([]);
    const history = useHistory();
    const [isShowingCreate, setIsShowingCreate] = useState(false);
    const modalRef = useRef(null);
    const [mounted, setMounted] = useState(true);
    const {loading, onLoading, offLoading} = useLoading()

    const toggleMount = () => setMounted(!mounted);
    const toggleCreate = () => {
        setIsShowingCreate(!isShowingCreate);
    };
    const handleDelete = (id) => {
        GroupService.deleteGroup(id).then((r) => {
            if (r.status === 200) {
                console.log(r.statusText);
            } else alert("Failed");
        });
    }

    const {switchToEditDep} = useContext(ContextProvider);
    React.useEffect(() => {
        async function fetchData() {
            onLoading();
            await GroupService.getList("department")
                .then((r) => {
                    console.log(r.status);
                    if (r.status === 200)
                        setData(r.data);
                    else setData([]);
                    offLoading();
                }, []);
        }

        fetchData();
    }, [mounted,setMounted]);
    const columns = [
        {field: 'name', headerName: 'Department Name', width: 200},
        {
            field: 'groupType',
            headerName: 'Type',
            width: 200,
            valueFormatter: (params) => params.row?.groupType?.name
        },
        {field: 'users', headerName: 'Members', width: 150},
        {
            field: 'leader', headerName: 'Leader', width: 150,
            valueFormatter: (params) => params.row?.leader?.name
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                const link = {
                    pathname: "/DepList/" + params.row.id,
                    state: {
                        depId: params.row.id
                    }
                };
                return (<>
                        <button
                            className="depListEdit"
                            onClick={() => {
                                switchToEditDep(params.row.id);
                            }}
                        >
                            Edit
                        </button>
                        <DeleteForeverIcon
                            className="depListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                )
            }
        },
    ];
    return (<>
            {loading ? <FullscreenLoading/> : null}
            <DepCreateModal
                isShowing={isShowingCreate}
                toggleModal={toggleCreate}
                modalRef={modalRef}
                toggleMount = {toggleMount}
            />
           <Paper style={{height:"100%"}}>
               <Grid container justify="center" spacing={3}>
                   <Grid item xs={1}>
                       <Typography variant="h6" align="center">DEPARTMENT</Typography>
                   </Grid>
               </Grid>
               <Grid container justify="center" spacing={3} xs={1}>
                   <Grid item xs={1}>
                       <Button autoCapitalize={false} onClick={toggleCreate}>
                           <AddIcon/> Create
                       </Button>
                   </Grid>
               </Grid>
               <Grid container className="Department" spacing={3}>
                   <Grid item xs={12} style={{minHeight:500}}>
                       <DataGrid
                           rows={data}
                           disableSelectionOnClick
                           columns={columns}
                           pageSize={10}
                           checkboxSelection
                       />
                   </Grid>
               </Grid>
           </Paper>
        </>
    );
}
export default DepList;