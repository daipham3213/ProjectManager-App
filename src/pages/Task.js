import './Task.css';   
import React,{Component} from 'react'; 
import { DataGrid } from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TaskRows } from "../../src/Data";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { NewTask } from './PopupNewTask/NewTask';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import AddIcon from '@material-ui/icons/Add';
// import Controls from "../pages/Controls/Control"
export default function DataTable() {
const [data,setData] = useState(TaskRows);
const handleDelete = (id) =>{
  setData(data.filter(item=>item.id !== id));
// const [openPopup, setOpenPopup] = useState(false);
// const useStyles = makeStyles(theme => ({
//     newButton:{
//       position:'adsolute',
//       right: '10px'
//     }
}


const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "groupname", headerName: "Groupname", width: 160 },
  { field: "leader", headerName: "Leader", width: 160 },
  { field: "taskname", headerName: "Taskname", width: 180 },
  { field: "date", headerName: "Date", width: 120 },
  { field: "term",headerName: "Term", width: 180},
  { field: "request", headerName: "Request", width: 180,
        renderCell:(params)=>{
        return(
                <>
                <button className="TaskListEdit">Download</button>
                </>
                )
         },
        },
  { field: "complete", headerName: "Complete",width: 180, 
      renderCell:(params)=>{
    return(
      <>
      <button className="TaskListEdit">Download</button>
      </>
    )
  }},
  { field: "action",headerName: "Action",width: 180,
        renderCell:(params)=>{
          return(
            <>
            <Link to={"/Task/"+params.row.id}>
            <button className="TaskListEdit">Edit</button>
            </Link>
            
            <DeleteForeverIcon className="TaskListDelete" onClick={()=>handleDelete(params.row.id)}/>
            </>
          )
        }

      }
  ];
  
  const rows = [
    {
      id: 1, 
      groupname: 'Nhóm 3',
      leader: "Đô Lâm",
      taskname: "Thiết kế cơ sở dữ liệu",
      request: "Null",
      date:"01/01/2021",
      term:"01/02/2021",
      complete:"null",
    },
    {
        id: 2, 
        groupname: 'Nhóm 1',
        leader: "Đô Lâm",
        taskname: "Webside bán hàng",
        date:"01/01/2021",
        term:"01/02/2021",
        complete:"null",  
      },
      {
        id: 3, 
        groupname: 'Nhóm 1',
        leader: "Đô Lâm",
        taskname: "Thiết kế cơ sở dữ liệu",
        date:"01/01/2021",
        term:"01/02/2021",
        complete:"null",    
      },
      {
        id: 4, 
        groupname: 'Nhóm 1',
        leader: "Đô Lâm",
        taskname: "Thiết kế cơ sở dữ liệu",
        date:"01/01/2021",
        term:"01/02/2021",   
        complete:"null", 
      },
  ];
  
  return (
    
    <div className="TaskListt" style={{ height: 400, width: '100%' }}>
      <DataGrid 
      rows={data} 
      disableSelectionOnClick 
      columns={columns} 
      pageSize={5} checkboxSelection />
      
    </div>
    
  );
  }

export class Task extends Component{
 
    render(){
        return(
            <div classname="Task">
                <DataTable/>
                <Route path=""><NewTask/></Route>
                <Link to="/newtask"><button className="TaskAddButton">Create</button>
                    </Link>
                {/* <NewTask
                 openPopup = {openPopup}
                  setOpenPopup = {setOpenPopup}>
        
                </NewTask> */}
            </div>
        )
    }
}