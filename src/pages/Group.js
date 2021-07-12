import './Group.css';   
import React,{Component} from 'react'; 
import { DataGrid } from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { GrRows } from "../../src/Data";
import { Link } from "react-router-dom";
import { useState } from 'react';
export default function DataTable() {
const [data,setData] = useState(GrRows);
const handleDelete = (id) =>{
  setData(data.filter(item=>item.id !== id));
}

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "groupname", headerName: "Groupname", width: 160 },
  { field: "leader", headerName: "Leader", width: 160 },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "project",headerName: "Project", width: 180},
  { field: "report", headerName: "Report",width: 160, 
      renderCell:(params)=>{
    return(
      <>
      <button className="GroupListEdit">Download</button>
      </>
    )
  }},
  { field: "action",headerName: "Action",width: 150,
        renderCell:(params)=>{
          return(
            <>
            {/* <Route path="/roup/:userID"><DepEdit/></Route> */}
            <Link to={"/Group/"+params.row.id}>
            <button className="GroupListEdit">Edit</button>
            </Link>
            
            <DeleteForeverIcon className="GroupListDelete" onClick={()=>handleDelete(params.row.id)}/>
            </>
          )
        }
        
      }
      
  ];
  
  const rows = [
    {
      id: 1, 
      groupname: 'Nhóm 1',
      leader: "Đô Lâm",
      quantity: "4",
      status:"active",
      project:"Tên dự án",
      
  },
  {
      id: 2, 
      groupname: 'Nhóm 2',
      leader: "Tuấn Thành",
      quantity: "4",
      status:"active",
      project:"Tên dự án",
      
  },
  {
      id: 3, 
      groupname: 'Nhóm 3',
      leader: "Đại Phạm",
      quantity: "4",
      status:"active",
      project:"Tên dự án",
      
  },
  {
      id: 4, 
      groupname: 'Nhóm 4',
      leader: "Vĩnh Phát",
      quantity: "4",
      status:"active",
      project:"Tên dự án",
      
  },
  ];

  return (
    <div className="GroupListt" style={{ height: 400, width: '100%' }}>
      <DataGrid 
      rows={data} 
      disableSelectionOnClick 
      columns={columns} 
      pageSize={5} checkboxSelection />
    </div>
  );
}
export class Group extends Component{
    render(){
        return(
            <div classname="Group">
                <DataTable/>
                <Link to="/newgroup"><button className="GroupAddButton">Create</button>
                    </Link>
            </div>
        )
    }
}