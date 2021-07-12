import './Department.css';
import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DepRows } from "../../src/Data";
import { Link } from "react-router-dom";
import { useState } from 'react';
export default function DataTable() {
    const [data, setData] = useState(DepRows);
    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'departmentname', headerName: 'Departmentname', width: 150 },
        { field: 'totalgroup', headerName: 'Total Group', width: 150 },
        { field: 'totalmember', headerName: 'Total Member', width: 150 },
        { field: 'manager', headerName: 'Manager', width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return ( <
                    >
                    <
                    Link to = { "/Department/" + params.row.id } >
                    <
                    button className = "depListEdit" > Edit < /button> <
                    /Link>

                    <
                    DeleteForeverIcon className = "depListDelete"
                    onClick = {
                        () => handleDelete(params.row.id) }
                    /> <
                    />
                )
            }

        }
    ];

    const rows = [{
            id: 1,
            departmentname: "Phòng Phân tích cở sở dữ liệu",
            totalgroup: "4",
            totalmember: "10",
            manager: "Đô Lâm",
        },

        {
            id: 2,
            departmentname: "Phòng Phân tích cở sở dữ liệu",
            totalgroup: "4",
            totalmember: "10",
            manager: "Tuấn Thành",
        },

        {
            id: 3,
            departmentname: "Phòng BackEnd",
            totalgroup: "4",
            totalmember: "10",
            manager: "Vĩnh Phát",
        },

        {
            id: 4,
            departmentname: "Phòng BackEnd",
            totalgroup: "4",
            totalmember: "10",
            manager: "Đại Phạm",
        },
        // {
        //     id: 1, departmentname: 'Đô Lâm ',
        //     Email: "dolam@gmail.com",
        //     status:"active",
        //     Department:"Phòng FontEnd",
        //     Group: "null",
        //     Task: "null.",
        // },
        // {
        //     id: 2, username: 'Tuấn Thành ',Avatar:"https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
        //     Email: "dolam@gmail.com",
        //     status:"active",
        //     Department:"Phòng phân tích thiết kế",
        //     Group: "null",
        //     Task: "null.",
        // },
        // {
        //     id: 3, username: 'Vĩnh Phát',Avatar:"https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
        //     Email: "dolam@gmail.com",
        //     status:"active",
        //     Department:"Phòng BackEnd",
        //     Group: "null",
        //     Task: "null.",
        // },
        // {
        //     id: 4, username: 'Đại Phạm',Avatar:"https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
        //     Email: "dolam@gmail.com",
        //     status:"active",
        //     Department:"Phòng BackEnd",
        //     Group: "null",
        //     Task: "null.",
        // },
    ];

    return ( <
        div className = "depListt"
        style = {
            { height: 400, width: '100%' } } >
        <
        DataGrid rows = { data }
        disableSelectionOnClick columns = { columns }
        pageSize = { 5 }
        checkboxSelection / >
        <
        /div>
    );
}

export class Department extends Component {
    render() {
        return ( <
            div classname = "Department" >
            <
            DataTable / >
            <
            Link to = "/newdep" > < button className = "DepAddButton" > Create < /button> <
            /Link> <
            /div>
        )
    }
}