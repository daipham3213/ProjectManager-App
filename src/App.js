import React from 'react';
import AppBar from './AppBar';
import SlideBar from './SilderBar/SlideBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {User} from './pages/Usepage/User';
import {NewUser} from './pages/NewUser/NewUser';
import {MyProfile} from './pages/Usepage/MyProfile';
import {NewDep} from './pages/NewDep/NewDep';
import './App.css';
import { NewTask } from './pages/PopupNewTask/NewTask';
import { TaskEdit } from './pages/PopupNewTask/TaskEdit';
import DepEdit from './pages/NewDep/DepEdit';
import { EditGroup } from './pages/NewGroup/EditGroup';
import { NewGroup } from './pages/NewGroup/NewGroup';
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";

function App() {
    if (localStorage.getItem("token") == null){
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path=""><SignIn/>Login</Route>
                        <Route path="/register"><SignUp/>Login</Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }


  return(
    <BrowserRouter>
    <div><AppBar/></div>
    <div>
        <Switch>
          <Route path="/user/:userID" component = {User}/>
          <Route path="/department/:depID" component = {DepEdit}/>
          <Route path="/newUser" component = {NewUser}/>
          <Route path="/myprofile"component = {MyProfile}/>
          <Route path="/newdep"component = {NewDep}/>
          <Route path="/Group/:groupID" component = {EditGroup}/>
          <Route path="/newgroup" component = {NewGroup}/>
          <Route path="/task/:taskID" component = {TaskEdit}/>
          <Route path="/newtask" component = {NewTask}/>
        </Switch>
     </div>
    <div className="container"><SlideBar/></div>
    </BrowserRouter>
  
  );
}

export default App;