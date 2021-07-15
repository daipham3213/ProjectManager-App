import './styles/DepList.css';
import React, {useContext, useRef, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useHistory} from "react-router-dom";
import {GroupService} from "../../../services/services";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Button} from "@material-ui/core";
import {Label} from "@material-ui/icons";
import DepContext from "../depContext";
import AddMemberModal from "./AddMemberModal";


const DepList = () => {
    const [data, setData] = useState([]);
    const history = useHistory();
    const [isShowingCreate, setIsShowingCreate] = useState(false);
    const modalRef = useRef(null);

    const toggle = () => {
        setIsShowingCreate(!isShowingCreate);
    };
    const handleDelete = (id) => {
        GroupService.deleteGroup(id).then(r => {
            if (r.status === 200) {
                console.log(r.statusText);
            } else alert("Failed");
        });
    }

    const {switchToEdit} = useContext(DepContext);
    React.useEffect(() => {
        async function fetchData() {
            await GroupService.getList("department")
                .then(r => {
                    console.log(r.status);
                    if (r.status === 200)
                        setData(r.data);
                    else setData([]);
                }, []);
        }

        fetchData();
    }, []);
    const columns = [
        {field: 'name', headerName: 'DepList Name', width: 200},
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
                                switchToEdit(params.row.id);
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
    return (
        <div className="Department">
            <AddMemberModal
                isShowing={isShowingCreate}
                toggleModal={toggle}
                modalRef={modalRef}
            />
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                checkboxSelection
                className="MuiDataGrid-windowContainer"
            />
            <div>
                <Button autoCapitalize={false} onClick={toggle}>
                    <Label>Create</Label>
                    <AddBoxIcon/>
                </Button>
            </div>
        </div>
    );
}
export default DepList;