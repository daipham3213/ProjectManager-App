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
import { DepEdit } from './pages/NewDep/DepEdit';
import { EditGroup } from './pages/NewGroup/EditGroup';
import { NewGroup } from './pages/NewGroup/NewGroup';
import SignIn from './pages/Authentication/SignIn';

function App() {

  return(
    <BrowserRouter>
     <Route path="/login"><SignIn/>Login</Route>
    <div><AppBar/></div>
    <div>
        <Switch>
          <Route path="/user/:userID"><User/></Route>
          <Route path="/department/:depID"><DepEdit/></Route>
          <Route path="/newUser"><NewUser/></Route>
          <Route path="/myprofile"><MyProfile/></Route>
          <Route path="/newdep"><NewDep/></Route>
          <Route path="/Group/:groupID"><EditGroup/></Route>
          <Route path="/newgroup"><NewGroup/></Route>
          <Route path="/task/:taskID"><TaskEdit/></Route>
          <Route path="/newtask"><NewTask/></Route>
        </Switch>
     </div>
    <div className="container"><SlideBar/></div>
     
    </BrowserRouter>
  
  );
}

export default App;