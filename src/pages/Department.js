import './Department.css';
import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DepRows } from "../../src/Data";
import { Link } from "react-router-dom";
import { useState } from 'react';
import {GroupService} from "../services/services";


export default function DataTable() {
    const [data, setData] = useState([]);
    const handleDelete = (id) => {
        GroupService.deleteGroup(id).then(r => {
            if (r.status === 200){
                console.log(r.statusText);
            }
            else alert("Failed");
        });
    }
    React.useEffect(() => {
        async function fetchData() {
            const result =await GroupService.getList("department");
            setData(result.data);
        }
        fetchData();
    }, []);
    const columns = [
        {field: 'id', headerName: 'ID', width: 130},
        {field: 'name', headerName: 'Department Name', width: 150},
        {field: 'groupTypeFk', headerName: 'Type', width: 150},
        {field: 'users', headerName: 'Total Member', width: 150},
        {field: 'leaderId', headerName: 'Leader', width: 150},
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (<>
                        <Link to={"/Department/" + params.row.id}>
                            <button className="depListEdit"> Edit </button>
                        </Link>

                        <DeleteForeverIcon
                            className="depListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                )
            }

        }
    ];
    return (<div className="depList"
                style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={5}
                checkboxSelection />
            </div>
    );
}

export class Department extends Component {

    render() {

        return (
            <div classname = "Department" >
                <DataTable/>
                <Link to = "/newdep">
                    <button className = "DepAddButton" > Create </button>
                </Link>
            </div>
        )
    }
}