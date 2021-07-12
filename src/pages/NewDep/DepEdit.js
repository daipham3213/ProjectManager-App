import React,{Component} from 'react'; 
import "./DepEdit.css"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PublishIcon from '@material-ui/icons/Publish';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {Link} from "react-router-dom";
export class DepEdit extends Component{
    render(){
        return(
            <div classname="DepEdit">
                <div className="DepTitleContainer">
                   
                    <Link to="/newDep"><button className="DepAddButton">Create</button>
                    </Link>
                    
                </div>
                <div className="DepContainer">
                  <div className="DepUpDate">
                      <span className="DepUpdateTitle">Edit Department</span>
                      <from className="DepUpdateFrom">
                          <div className="DepUpdateLeft">
                              <div className="DepUpdateItem">
                                  <label>Department Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Phòng FontEnd" 
                                  className="DepUpdateInput"/>
                              </div>
                              <div className="DepUpdateItem">
                                  <label>Leader Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Đô Lâm" 
                                  className="DepUpdateInput"/>
                              </div> 
                              <div className="DepUpdateItem">
                                  <label>Phone</label>
                                  <input 
                                  type="text" 
                                  placeholder="+84 964 507 389" 
                                  className="DepUpdateInput"/>
                              </div>   
                              <div className="DepUpdateItem">
                                  <label>Email</label>
                                  <input 
                                  type="text" 
                                  placeholder="dolam1697@gmail.com" 
                                  className="DepUpdateInput"/>
                              </div>   
                             
                              <div className="DepUpdateItem">
                                  <label>Number of Member</label>
                                  <input 
                                  type="text" 
                                  placeholder="10" 
                                  className="DepUpdateInput"/>
                              </div>
                              <div className="DepUpdateItem">
                                  <label>Group</label>
                                  <input 
                                  type="text" 
                                  placeholder="Chưa có" 
                                  className="DepUpdateInput"/>
                              </div>
                              <button className="DepUpdateButton">Update</button>
                          </div>
                          
                      </from>
                  </div>
                  
                </div>
            </div>
        )
    }
}