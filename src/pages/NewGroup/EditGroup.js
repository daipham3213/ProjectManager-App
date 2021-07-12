import React,{Component} from 'react'; 
import "./EditGroup.css"
import {Link} from "react-router-dom";
export class EditGroup extends Component{
    render(){
        return(
            <div classname="GroupEdit">
                <div className="GroupTitleContainer">
                    
                    <Link to="/newGroup"><button className="GroupAddButton">Create</button>
                    </Link>
                    
                </div>
                <div className="GroupContainer">
                  <div className="GroupUpDate">
                      <span className="GroupUpdateTitle">Edit Group</span>
                      <from className="GroupUpdateFrom">
                          <div className="GroupUpdateLeft">
                              <div className="GroupUpdateItem">
                                  <label>Groupartment Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Phòng FontEnd" 
                                  className="GroupUpdateInput"/>
                              </div>
                              <div className="GroupUpdateItem">
                                  <label>Leader Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Đô Lâm" 
                                  className="GroupUpdateInput"/>
                              </div> 
                              <div className="GroupUpdateItem">
                                  <label>Phone</label>
                                  <input 
                                  type="text" 
                                  placeholder="+84 964 507 389" 
                                  className="GroupUpdateInput"/>
                              </div>   
                              <div className="GroupUpdateItem">
                                  <label>Email</label>
                                  <input 
                                  type="text" 
                                  placeholder="dolam1697@gmail.com" 
                                  className="GroupUpdateInput"/>
                              </div>   
                             
                              <div className="GroupUpdateItem">
                                  <label>Number of Member</label>
                                  <input 
                                  type="text" 
                                  placeholder="10" 
                                  className="GroupUpdateInput"/>
                              </div>
                              <div className="GroupUpdateItem">
                                  <label>Group</label>
                                  <input 
                                  type="text" 
                                  placeholder="Chưa có" 
                                  className="GroupUpdateInput"/>
                              </div>
                              <button className="GroupUpdateButton">Update</button>
                          </div>
                          
                      </from>
                  </div>
                  
                </div>
            </div>
        )
    }
}