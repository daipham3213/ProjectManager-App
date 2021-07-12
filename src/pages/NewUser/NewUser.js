
import "./NewUser.css"
import React,{Component} from 'react';

export class NewUser extends Component{
    render(){
        return(
            <div className="newUser">
               <h1 className="newUserTitle">New User</h1>
               <from className="newUserFrom">
                   <div className="newUserItem">
                       <label>UserName</label>
                       <input type="text" placeholder="Thành"/>
                   </div>

                   <div className="newUserItem">
                       <label>Full Name</label>
                       <input type="text" placeholder="Tuấn Thành"/>
                   </div>

                   <div className="newUserItem">
                       <label>Email</label>
                       <input type="Email" placeholder="tuanthanh@gmail.com"/>
                   </div>

                   <div className="newUserItem">
                       <label>Password</label>
                       <input type="Password" placeholder="Password"/>
                   </div>

                   <div className="newUserItem">
                       <label>Phone</label>
                       <input type="text" placeholder="+84 964 507 389"/>
                   </div>

                   <div className="newUserItem">
                       <label>Address</label>
                       <input type="text" placeholder="Sóc Trăng | Vietnamese"/>
                   </div>

                   <div className="newUserItem">
                       <label>Department</label>
                       <input type="text" placeholder="Phòng phân thích thiết kế"/>
                   </div>

                   <div className="newUserItem">
                       <label>Group</label>
                       <input type="text" placeholder="Nhóm 1"/>
                   </div>

                   <div className="newUserItem">
                       <label>Gender</label>
                       <div className="newUserGender"> 
                       <input type="radio" name="gender" id="male" value="male"/>
                       <label for="male">Male</label>
                       <input type="radio" name="gender" id="female" value="female"/>
                       <label for="female">Female</label>
                       <input type="radio" name="gender" id="other" value="other"/>
                       <label for="other">Other</label>
                        </div>
                      
                   </div>
                   <div className="newUserItem">
                   <label>Active</label>
                   <select className="newUserSelect" name="active" id="active">
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                   </select>
                   </div>
                   <button className="newUserButton">Create</button>
               </from>
            </div>
        )
    }
}




