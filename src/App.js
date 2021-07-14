import React, {Component} from 'react';
import AppBar from './AppBar';
import SlideBar from './SilderBar/SlideBar';
import {User} from './pages/Usepage/User';
import {NewUser} from './pages/NewUser/NewUser';
import {UserProfile} from './pages/Usepage/UserProfile';
import {DepCreateModal} from './pages/Department/components/DepCreateModal';
import './App.css';
import {NewTask} from './pages/PopupNewTask/NewTask';
import {TaskEdit} from './pages/PopupNewTask/TaskEdit';
import DepEdit from './pages/Department/components/DepEdit';
import {EditGroup} from './pages/NewGroup/EditGroup';
import {NewGroup} from './pages/NewGroup/NewGroup';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import AuthPage from "./pages/Authentication/AuthPage";
import {Group} from "./pages/Group";
import DepList from "./pages/Department/components/DepList";
import {Task} from "./pages/Task";
import {AuthService} from "./services/services";
import Department from "./pages/Department/Department";
import {Employee} from "./pages/Employee";


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
                        <PrivateRoute exact path="/:username" component={User}/>
                        <PrivateRoute exact path="/department/:depId" component={DepEdit}/>
                        <PrivateRoute exact path="/department" component={Department}/>
                        <PrivateRoute exact path="/user/create" component={NewUser}/>
                        <PrivateRoute exact path="/profile?id=:userId" component={UserProfile}/>
                        <PrivateRoute exact path="/department/create" component={DepCreateModal}/>
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