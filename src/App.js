import React, {Component} from 'react';
import AppBar from './AppBar';
import SlideBar from './SilderBar/SlideBar';
import {User} from './pages/Usepage/User';
import {NewUser} from './pages/NewUser/NewUser';
import {MyProfile} from './pages/Usepage/MyProfile';
import {NewDep} from './pages/NewDep/NewDep';
import './App.css';
import {NewTask} from './pages/PopupNewTask/NewTask';
import {TaskEdit} from './pages/PopupNewTask/TaskEdit';
import DepEdit from './pages/NewDep/DepEdit';
import {EditGroup} from './pages/NewGroup/EditGroup';
import {NewGroup} from './pages/NewGroup/NewGroup';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import AuthPage from "./pages/Authentication/AuthPage";
import {Group} from "./pages/Group";
import {Department} from "./pages/Department";
import {Task} from "./pages/Task";
import {AuthService} from "./services/services";


export default class App extends Component {
    render() {
        if (!AuthService.isLoggedIn())
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={AuthPage}/>
                        <Route path="/" component={AuthPage}/>
                    </Switch>
                </BrowserRouter>
            )
        else
        return (
            <BrowserRouter>
                <div><AppBar/></div>
                <div>
                    <Switch>
                        <PrivateRoute exact path="/user/:userID" component={User}/>
                        <PrivateRoute exact path="/department/:depID" component={DepEdit}/>
                        <PrivateRoute exact path="/department" component={Department}/>
                        <PrivateRoute exact path="/user/create" component={NewUser}/>
                        <PrivateRoute exact path="/profile" component={MyProfile}/>
                        <PrivateRoute exact path="/department/create" component={NewDep}/>
                        <PrivateRoute exact path="/group" component={Group}/>
                        <PrivateRoute exact path="/group/:groupID" component={EditGroup}/>
                        <PrivateRoute exact path="/group/create" component={NewGroup}/>
                        <PrivateRoute exact path="/task/:taskID" component={TaskEdit}/>
                        <PrivateRoute exact path="/task/create" component={NewTask}/>
                        <PrivateRoute exact path="/task" component={Task}/>
                    </Switch>
                </div>
                <div className="container"><SlideBar/></div>
            </BrowserRouter>
        );
    }
}