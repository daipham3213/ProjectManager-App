import "./Newtask.css";
import React,{Component} from 'react';

export class NewTask extends Component{
    render(){
        return(
            <div className="newTask">
               <h1 className="newTaskTitle">New Task</h1>
               <from className="newTaskFrom">
                   <div className="newTaskItem">
                       <label>TaskName</label>
                       <input type="text" placeholder="Thành"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Full Name</label>
                       <input type="text" placeholder="Tuấn Thành"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Email</label>
                       <input type="Email" placeholder="tuanthanh@gmail.com"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Password</label>
                       <input type="Password" placeholder="Password"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Phone</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Address</label>
                       <input type="text" placeholder="Sóc Trăng | Vietnamese"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Taskartment</label>
                       <input type="text" placeholder="Phòng phân thích thiết kế"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Group</label>
                       <input type="text" placeholder="Nhóm 1"/>
                   </div>

                   <div className="newTaskItem">
                       <label>Gender</label>
                       <div className="newTaskGender"> 
                       <input type="radio" name="gender" id="male" value="male"/>
                       <label for="male">Male</label>
                       <input type="radio" name="gender" id="female" value="female"/>
                       <label for="female">Female</label>
                       <input type="radio" name="gender" id="other" value="other"/>
                       <label for="other">Other</label>
                        </div>
                      
                   </div>
                   <div className="newTaskItem">
                   <label>Active</label>
                   <select className="newTaskSelect" name="active" id="active">
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                   </select>
                   </div>
                   <button className="newTaskButton">Create</button>
               </from>
            </div>
        )
    }
}