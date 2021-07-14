import './Department.css';
import React, {Component, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useHistory} from "react-router-dom";
import {GroupService} from "../services/services";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {GridColumnHeaderParams} from "@material-ui/data-grid";

export default function DataTable() {
    const [data, setData] = useState([]);
    const history = useHistory();
    const handleDelete = (id) => {
        GroupService.deleteGroup(id).then(r => {
            if (r.status === 200) {
                console.log(r.statusText);
            } else alert("Failed");
        });
    }

    function handleClick(id) {
        history.push("/Department/" + id);
        window.location.reload(false);
    }

    React.useEffect(() => {
        async function fetchData() {
            const result = await GroupService.getList("department");
            setData(result.data);
        }

        fetchData();
    }, []);
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
                    pathname: "/Department/" + params.row.id,
                    state: {
                        depId: params.row.id
                    }
                };
                return (<>
                        <button
                            className="depListEdit"
                            onClick={() => handleClick(params.row.id)}
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
        {field: "", width: 150, type: 'date',
            renderHeader: (prams : GridColumnHeaderParams) => {
                <AddBoxIcon>Create</AddBoxIcon>
            }},
    ];
    return (<div className="depList">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={5}
                checkboxSelection/>
        </div>
    );
}

export class Department extends Component {
    render() {
        return (
            <div classname="Department">
                <DataTable/>

            </div>
        )
    }
}