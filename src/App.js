import React, {Component} from 'react';
import AppBar from './AppBar';
import SlideBar from './SilderBar/SlideBar';
import {NewUser} from './pages/NewUser/NewUser';
import {UserProfile} from './pages/Usepage/UserProfile';
import './App.css';
import {NewTask} from './pages/PopupNewTask/NewTask';
import {TaskEdit} from './pages/PopupNewTask/TaskEdit';
import {EditGroup} from './pages/NewGroup/EditGroup';
import {NewGroup} from './pages/NewGroup/NewGroup';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import AuthPage from "./pages/Authentication/AuthPage";
import {Group} from "./pages/Group";
import {Task} from "./pages/Task";
import {AuthService} from "./services/services";
import {Employee} from "./pages/Employee";
import Home from "./pages/Home";


export default class App extends Component {


    render() {
        if (!AuthService.isLoggedIn())
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={AuthPage}/>
                    </Switch>
                </BrowserRouter>
            )
        else
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <PrivateRoute path="/" component={Home}/>
                        <PrivateRoute exact path="/user/create" component={NewUser}/>
                        <PrivateRoute exact path="/profile?id=:userId" component={UserProfile}/>
                        <PrivateRoute exact path="/group" component={Group}/>
                        <PrivateRoute exact path="/group/:groupID" component={EditGroup}/>
                        <PrivateRoute exact path="/group/create" component={NewGroup}/>
                        <PrivateRoute exact path="/task/:taskID" component={TaskEdit}/>
                        <PrivateRoute exact path="/task/create" component={NewTask}/>
                        <PrivateRoute exact path="/task" component={Task}/>
                        <PrivateRoute exact path="/employee" component={Employee}/>
                    </Switch>
                </div>
                <div className="container"><SlideBar/></div>
            </BrowserRouter>
        );
    }
}