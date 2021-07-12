import "./NewGroup.css"
import React,{Component} from 'react';

export class NewGroup extends Component{
    render(){
        return(
            <div className="newGroup">
               <h1 className="newGroupTitle">New Group</h1>
               <from className="newGroupFrom">
                   <div className="newGroupItem">
                       <label>Group Name</label>
                       <input type="text" placeholder="Thành"/>
                   </div>

                   <div className="newGroupItem">
                       <label>Leader Name</label>
                       <input type="text" placeholder="Tuấn Thành"/>
                   </div>

                   <div className="newGroupItem">
                       <label>Email</label>
                       <input type="Email" placeholder="tuanthanh@gmail.com"/>
                   </div>

                   <div className="newGroupItem">
                       <label>Phone</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>
                   <div className="newGroupItem">
                       <label>Number of member</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>

                  
                   <div className="newGroupItem">
                   <label>Active</label>
                   <select className="newGroupSelect" name="active" id="active">
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                   </select>
                   </div>
                   <button className="newGroupButton">Create</button>
               </from>
            </div>
        )
    }
}