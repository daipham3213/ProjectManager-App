import React,{Component} from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PublishIcon from '@material-ui/icons/Publish';
import {Link} from "react-router-dom";
import "./MyProfile.css"
export class MyProfile extends Component{
    render(){
        return(
            <div className="myprofile">
                <div className="profileContainer">
                <div className="profileUpDate">
                      <from className="profileUpdateFrom">
                          <div className="profileUpdateLeft">
                          <div className="profileShowTopTitle">
                            <span className="profileShowprofileName">Đô Lâm</span>
                            <span className="profileShowprofileTitle">Software Engineer</span>
                            </div>
                             <span className="profileShowTitle">Account Details</span>
                             <div className="profileShowInfo">
                            <PermIdentityIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Đô Lâm</span>
                            </div>
                            <div className="profileShowInfo">
                            <CalendarTodayIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">16.01.1998</span>
                            </div>
                            <span className="profileShowTitle">Contact Details</span>
                            <div className="profileShowInfo">
                            <PhoneAndroidIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">+84 964 507 389</span>
                            </div>
                            <div className="profileShowInfo">
                            <MailOutlineIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">dolam1697@gmail.com</span>
                            </div>
                            <div className="profileShowInfo">
                            <PersonPinIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Sóc Trăng | Vietnamese</span>
                            </div>
                            <span className="profileShowTitle">Working Position</span>
                            <div className="profileShowInfo">
                            <MeetingRoomIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Phòng FontEnd</span>
                            </div>
                            <div className="profileShowInfo">
                            <PeopleOutlineIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Chưa có</span>
                            </div>
                          </div>
                          <div className="profileUpdateRight">
                              <div className="profileUpdateUpload">
                                  <img className="profileUpdateImg" src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg" alt=""/>
                              </div>
                          </div>
                      </from>
                  </div>
                    {/* <div className="profileShow">
                      <div className="profileShowTop">
                               <div className="profileShowTopTitle">
                                   <span className="profileShowUserName">Đô Lâm</span>
                                   <span className="profileShowUserTitle">Software Engineer</span>
                               </div>
                               <span className="profileShowTitle">Account Details</span>
                          <div className="profileShowInfo">
                            <PermIdentityIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Đô Lâm</span>
                            </div>
                            <div className="profileShowInfo">
                            <CalendarTodayIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">16.01.1998</span>
                            </div>
                            <span className="profileShowTitle">Contact Details</span>
                            <div className="profileShowInfo">
                            <PhoneAndroidIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">+84 964 507 389</span>
                            </div>
                            <div className="profileShowInfo">
                            <MailOutlineIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">dolam1697@gmail.com</span>
                            </div>
                            <div className="profileShowInfo">
                            <PersonPinIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Sóc Trăng | Vietnamese</span>
                            </div>
                            <span className="profileShowTitle">Working Position</span>
                            <div className="profileShowInfo">
                            <MeetingRoomIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Phòng FontEnd</span>
                            </div>
                            <div className="profileShowInfo">
                            <PeopleOutlineIcon className="profileShowIcon"/>
                            <span className="profileShowInfoTitle">Chưa có</span>
                            </div>
                      </div>
                            <div className="profileShowBottom">
                         
                            <div className="profileUpdateUpload">
                                  <img className="profileUpdateImg" src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg" alt=""/>
                              </div>
                      
                            </div>
                            
                  </div> */}
                  </div>
            </div>
        )
    }
}