import React, {Component, useState} from 'react';
import "./DepEdit.css"
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {GroupService, UserService} from "../../services/services";
import {
    DataGrid,
    } from '@material-ui/data-grid';
import Avatar from '@material-ui/core/Avatar';

export default function DepLoad() {
    const [depName, setDepName] = useState({});
    const [depLeader, setDepLeader] = useState({});
    const [member, setMember] = useState([]);
    const [checked, setChecked] = useState([]);
    const [dep, setDep] = useState([]);

    const addMember = (m) => {
        setMember(oldArray => [...oldArray, m]);
    };
    const addCheck = (m) => {
        setChecked(oldArray => [...oldArray, m]);
    };
    const loadDepName = (e) => {
        setDepName(e)
    }
    const loadDep = (e) => {
        setDep(e)
    }

    const loadLeader = (e) => {
        setDepLeader(e)
    }
    // eslint-disable-next-line no-restricted-globals
    let myParam = window.location.pathname.split("/");

    const kickHandle = async(ids) => {
        await GroupService.removeMembers(depName,ids).then(res => {
            console.log(res.status);
        })
    }
    const promotionHandle = async(username) => {
        await GroupService.promotion(username).then(res => {
            console.log(res.status);
        })
    }

    React.useEffect(() => {
        async function fetchData() {
            const result = await GroupService.getDetail(myParam[2]);
            loadDepName(result.data.name);
            result.data.users.forEach(user => {
                FetchUser(user.id)
            })
            loadLeader(result.data.leader?.name);
            loadDep(result.data);
        }

        async function FetchUser(id) {
            const user = await UserService.getProfile(id);
            addMember(user.data);
            console.log(user.data.id + " Fetched User");
        }

        fetchData().then(r => {
            console.log(r);
        });
    }, {});

    const columns = [
        {
            field: "avatarUrl", headerName: "Avatar", width: 120,
            renderCell: (params) => {
                let url = null;
                if (params.rows?.user?.avatarUrl == null)
                    url = process.env.default_avatar;
                else url = params.rows.user.avatarUrl;
                return (
                    <div>
                        <Avatar alt="avatar" src={url}/>
                    </div>
                );
            }
        },
        {field: "name", headerName: "Name", width: 200},
        {field: 'id', hide: true, identity: true},
        {
            field: "privilege", headerName: "Privilege", width: 150,
            renderCell: params => {
                let role = "Member";
                if (params.getValue(params.id, 'groupId') === myParam[2])
                    role = "Leader";
                return (
                    <Button>{role}</Button>
                );
            }
        },
        {
            field: "actions", headerName: "Actions", width: "100%",
            renderCell: params => {
                return (<>
                        <Button onClick={kickHandle(checked)}>Kick</Button>
                        <Button onClick={promotionHandle(params.getValue(params.id, 'userName'))}>Promotion</Button>
                    </>
                );
            }
        },
    ];

    return (
        <div className="DepContainer">
            <div className="DepUpDate">
                <span className="DepUpdateTitle">Edit Department</span>
                <from className="DepUpdateFrom">
                    <div className="DepUpdateLeft">
                        <div className="DepUpdateItem">
                            <label>Department Name</label>
                            <input
                                type="text"
                                className="DepUpdateInput"
                                value={depName}
                            />
                        </div>
                        <div className="DepUpdateItem">
                            <label>Leader Name</label>
                            <input
                                type="text"
                                className="DepUpdateInput"
                                value={depLeader}
                            />
                        </div>
                        <button className="DepUpdateButton">Update</button>
                    </div>
                    <div className="DepUpdateRight">
                        <div className="memList">
                            <DataGrid
                                onSelectionModelChange={itm => addCheck(itm)}
                                rows={member}
                                disableSelectionOnClick
                                columns={columns}
                                pageSize={5}
                                checkboxSelection/>
                        </div>
                    </div>
                </from>
            </div>
        </div>
    );
}

export class DepEdit extends Component {
    render() {
        return (
            <div classname="DepEdit">
                <div className="DepTitleContainer">
                    <Link to="/newDep">
                        <button className="DepAddButton">Create</button>
                    </Link>
                </div>
                <div>
                    <DepLoad/>
                </div>
            </div>
        )
    }
}