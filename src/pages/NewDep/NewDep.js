import "./NewDep.css"
import React, {Component, useState} from 'react';

import {GroupService} from "../../services/services";



export class NewDep extends Component {
    department = {
        name: '',
        description: ''
    }
    changeName = event => {
        this.department.name = event.target.value;
    }
    changeDes = event => {
        this.department.description = event.target.value;
    }
    handleSubmit = event => {
        GroupService.postDepartment(this.department.name, this.department.description, "")
            .then(r => {
               if (r.status === 200){
                   console.log("Create Success");
               }
               else console.log(r.data);
            });
    }
    render(){
        return(
            <div className="newDep">
               <h1 className="newDepTitle">New Dep</h1>
               <from className="newDepFrom">
                   <div className="newDepItem">
                       <label>Department Name</label>
                       <input type="text" onChange={this.changeName}/>
                   </div>

                   <div className="newDepItem">
                       <label>Description</label>
                       <input type="text"  onChange={this.changeDes}/>
                   </div>
                   <button className="newDepButton" onClick={this.handleSubmit}>Create</button>
               </from>
            </div>
        )
    }
}
