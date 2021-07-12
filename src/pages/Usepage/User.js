import React,{Component} from 'react'; 
import "./User.css"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PublishIcon from '@material-ui/icons/Publish';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {Link} from "react-router-dom";
export class User extends Component{
    render(){
        return(
            <div classname="user">
                <div className="UserTitleContainer">
                    <h1 className="UserTitle">Edit User</h1>
                    <Link to="/newuser"><button className="UserAddButton">Create</button>
                    </Link>
                    
                </div>
                <div className="UserContainer">
                  <div className="UserShow">
                      <div className="UserShowTop">
                          <img src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg" 
                                alt="" 
                                className="UserShowImg"/>
                               <div className="UserShowTopTitle">
                                   <span className="UserShowUserName">Đô Lâm</span>
                                   <span className="UserShowUserTitle">Software Engineer</span>

                               </div>
                      </div>
                      <div className="UserShowBottom">
                          <span className="UserShowTitle">Account Details</span>
                          <div className="UserShowInfo">
                            <PermIdentityIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">Đô Lâm</span>
                            </div>
                            <div className="UserShowInfo">
                            <CalendarTodayIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">16.01.1998</span>
                            </div>
                            <span className="UserShowTitle">Contact Details</span>
                            <div className="UserShowInfo">
                            <PhoneAndroidIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">+84 964 507 389</span>
                            </div>
                            <div className="UserShowInfo">
                            <MailOutlineIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">dolam1697@gmail.com</span>
                            </div>
                            <div className="UserShowInfo">
                            <PersonPinIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">Sóc Trăng | Vietnamese</span>
                            </div>
                            <span className="UserShowTitle">Working Position</span>
                            <div className="UserShowInfo">
                            <MeetingRoomIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">Phòng FontEnd</span>
                            </div>
                            <div className="UserShowInfo">
                            <PeopleOutlineIcon className="UserShowIcon"/>
                            <span className="UserShowInfoTitle">Chưa có</span>
                            </div>
                      </div>
                  </div>
                  <div className="UserUpDate">
                      <span className="UserUpdateTitle">Edit</span>
                      <from className="UserUpdateFrom">
                          <div className="UserUpdateLeft">
                              <div className="UserUpdateItem">
                                  <label>User Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Đô Lâm" 
                                  className="UserUpdateInput"/>
                              </div>
                              <div className="UserUpdateItem">
                                  <label>Full Name</label>
                                  <input 
                                  type="text" 
                                  placeholder="Đô Lâm" 
                                  className="UserUpdateInput"/>
                              </div> 
                              <div className="UserUpdateItem">
                                  <label>Phone</label>
                                  <input 
                                  type="text" 
                                  placeholder="+84 964 507 389" 
                                  className="UserUpdateInput"/>
                              </div>   
                              <div className="UserUpdateItem">
                                  <label>Email</label>
                                  <input 
                                  type="text" 
                                  placeholder="dolam1697@gmail.com" 
                                  className="UserUpdateInput"/>
                              </div>   
                              <div className="UserUpdateItem">
                                  <label>Address</label>
                                  <input 
                                  type="text" 
                                  placeholder="Sóc Trăng | Vietnamese" 
                                  className="UserUpdateInput"/>
                              </div>
                              <div className="UserUpdateItem">
                                  <label>Department</label>
                                  <input 
                                  type="text" 
                                  placeholder="Phòng FontEnd" 
                                  className="UserUpdateInput"/>
                              </div>
                              <div className="UserUpdateItem">
                                  <label>Group</label>
                                  <input 
                                  type="text" 
                                  placeholder="Chưa có" 
                                  className="UserUpdateInput"/>
                              </div>
                          </div>
                          <div className="UserUpdateRight">
                              <div className="UserUpdateUpload">
                                  <img className="UserUpdateImg" src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg" alt=""/>
                                    <label htmlFor= "file">
                                        <PublishIcon className="UserUpdateIcon"/> </label> 
                                    <input type="file" id="file" style={{display:"none"}}/>
                              </div>
                              <button className="UserUpdateButton">Update</button>
                          </div>
                      </from>
                  </div>
                  
                </div>
            </div>
        )
    }
}