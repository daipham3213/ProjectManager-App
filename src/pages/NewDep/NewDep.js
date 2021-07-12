import "./NewDep.css"
import React,{Component} from 'react';

export class NewDep extends Component{
    render(){
        return(
            <div className="newDep">
               <h1 className="newDepTitle">New Dep</h1>
               <from className="newDepFrom">
                   <div className="newDepItem">
                       <label>Department Name</label>
                       <input type="text" placeholder="Thành"/>
                   </div>

                   <div className="newDepItem">
                       <label>Leader Name</label>
                       <input type="text" placeholder="Tuấn Thành"/>
                   </div>

                   <div className="newDepItem">
                       <label>Email</label>
                       <input type="Email" placeholder="tuanthanh@gmail.com"/>
                   </div>

                   <div className="newDepItem">
                       <label>Phone</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>
                   <div className="newDepItem">
                       <label>Number of member</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>

                  
                   <div className="newDepItem">
                   <label>Active</label>
                   <select className="newDepSelect" name="active" id="active">
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                   </select>
                   </div>
                   <button className="newDepButton">Create</button>
               </from>
            </div>
        )
    }
}