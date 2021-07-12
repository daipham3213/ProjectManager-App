import React,{Component} from 'react'; 
import "./TaskEdit.css"
import {Link} from "react-router-dom";
export class TaskEdit extends Component{
    render(){
        return(
            <div classname="TaskEdit">
                <div className="TaskTitleContainer">
                    
                    <Link to="/newTask"><button className="TaskAddButton">Create</button>
                    </Link>
                    
                </div>
                <div className="TaskContainer">
                  <div className="TaskUpDate">
                      <span className="TaskUpdateTitle">Edit Task</span>
                      <from className="TaskUpdateFrom">
                          <div className="TaskUpdateLeft">
                              <div className="TaskUpdateItem">
                                  <label>Taskartment Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Phòng FontEnd" 
                                  className="TaskUpdateInput"/>
                              </div>
                              <div className="TaskUpdateItem">
                                  <label>Leader Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Đô Lâm" 
                                  className="TaskUpdateInput"/>
                              </div> 
                              <div className="TaskUpdateItem">
                                  <label>Phone</label>
                                  <input 
                                  type="text" 
                                  placeholder="+84 964 507 389" 
                                  className="TaskUpdateInput"/>
                              </div>   
                              <div className="TaskUpdateItem">
                                  <label>Email</label>
                                  <input 
                                  type="text" 
                                  placeholder="dolam1697@gmail.com" 
                                  className="TaskUpdateInput"/>
                              </div>   
                             
                              <div className="TaskUpdateItem">
                                  <label>Number of Member</label>
                                  <input 
                                  type="text" 
                                  placeholder="10" 
                                  className="TaskUpdateInput"/>
                              </div>
                              <div className="TaskUpdateItem">
                                  <label>Task</label>
                                  <input 
                                  type="text" 
                                  placeholder="Chưa có" 
                                  className="TaskUpdateInput"/>
                              </div>
                              <button className="TaskUpdateButton">Update</button>
                          </div>
                          
                      </from>
                  </div>
                  
                </div>
            </div>
        )
    }
}