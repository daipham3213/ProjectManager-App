import React, {Component, useRef, useState} from 'react';
import "./styles/DepEdit.css"
import Button from "@material-ui/core/Button";
import {GroupService, UserService} from "../../../services/services";
import {
    DataGrid,
    } from '@material-ui/data-grid';
import Avatar from '@material-ui/core/Avatar';
import AddMemberModal from "./AddMemberModal";
import {useLoading} from "../../../component/hooks/hooks";

const DepEdit = () =>{
    const [depName, setDepName] = useState({});
    const [depLeader, setDepLeader] = useState({});
    const [member, setMember] = useState([]);
    const [checked, setChecked] = useState([]);
    const [dep, setDep] = useState({});
    const [isShowing, setIsShowing] = useState(false);
    const modalRef = useRef(null);
    const {loading, onLoading, offLoading} = useLoading();

    const addMember = (m) => {
        setMember(oldArray => [...oldArray, m]);
    };
    const addCheck = (m) => {
        let index = checked.indexOf(m);
        if (index === -1)
            setChecked(oldArray => [...oldArray, m]);
        else checked.splice(index, 1);
    };
    const loadDepName = (e) => {
        setDepName(e)
    }
    const loadDep = (e) => {
        setDep(e)
    }
    const toggle = () => {
        setIsShowing(!isShowing);
    };
    const loadLeader = (e) => {
        setDepLeader(e)
    }
    // eslint-disable-next-line no-restricted-globals
    let myParam = window.location.pathname.split("/");

    const loadCheck =  (e) => {
        setChecked(e);
        console.log(checked);
    }

    React.useEffect(() => {
        async function fetchData() {
            onLoading();
            const result = await GroupService.getDetail(myParam[2]);
            loadDepName(result.data.name);
            result.data.users.forEach(user => {
                FetchUser(user.id)
            })
            loadLeader(result.data.leader?.name);
            loadDep(result.data);
            offLoading();
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
                if (params.id === dep.leaderId)
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
                        <Button onClick={() => kickHandle(depName, checked) }>Kick</Button>
                        <Button onClick={() => promotionHandle(params.getValue(params.id, 'userName'))}>Promotion</Button>
                    </>
                );
            }
        },
    ];

    return (
        <div className="DepContainer">
            <AddMemberModal
                isShowing={isShowing}
                toggleModal={toggle}
                modalRef={modalRef}
                groupName={depName}
            />
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
                        <button
                            className="DepUpdateButton"
                            onClick={toggle}
                        >Add Member
                        </button>
                    </div>
                    <div className="DepUpdateRight">
                        <div className="memList">
                            <DataGrid
                                onSelectionModelChange={ m => {
                                    console.log(m.selectionModel);
                                    loadCheck(m.selectionModel);
                                }}
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


export default DepEdit;

const kickHandle = async(depName, ids) => {
    if (ids.length === 0) {
        alert("Please select at least one member!");
        return  ;
    }
    await GroupService.removeMembers(depName,ids).then(res => {
        alert(res.data.message);
    })
}
const promotionHandle = async(username) => {
    if (username == null) {
        alert("Please select at least one member!");
        return  ;
    }
    await GroupService.promotion(username).then(res => {
        alert(res.data.message);
    })
}