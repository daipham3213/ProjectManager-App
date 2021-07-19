import React, {useContext, useRef, useState} from 'react';
import "./styles/DepEdit.css"
import Button from "@material-ui/core/Button";
import {GroupService, UserService} from "../../services/services";
import {DataGrid,} from '@material-ui/data-grid';
import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddMemberModal from "./AddMemberModal";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import ContextProvider from "../../component/ContextProvider";
import BackButton from "../../component/BackButton";
import {TextField} from "@material-ui/core";

const DepEdit = (depId) => {
    const [depName, setDepName] = useState({});
    const [depLeader, setDepLeader] = useState({});
    const [member, setMember] = useState([]);
    const [checked, setChecked] = useState([]);
    const [dep, setDep] = useState({});
    const [isShowing, setIsShowing] = useState(false);
    const modalRef = useRef(null);
    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);


    const toggleMount = () => setMounted(!mounted);
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
    const loadCheck = (e) => {
        setChecked(e);
        console.log(checked);
    }

    const {switchToListDep} = useContext(ContextProvider);

    React.useEffect(() => {
        async function fetchData() {
            onLoading();
            await GroupService.getDetail(depId.value)
                .then((result) => {
                   if(result.status ===200) {
                       loadDepName(result.data.name);
                       result.data.users.forEach(user => {
                           FetchUser(user.id)
                       })
                       loadDep(result.data);
                   } else console.log(result.data.message);
                    offLoading();
                })
                .catch(() => {
                    console.log("Internal server error");
                });
        }

        async function FetchUser(id) {
           await UserService.getProfile(id)
                .then((result) => {
                    if (result.status === 200){
                        addMember(result.data);
                        if (result.data.id === dep.leaderId){
                            loadLeader(result.data.name);
                        }
                        console.log(result.data.id + " Fetched User");
                    }
                })
               .catch(() => {
                   console.log("Internal server error");
               });
        }

        fetchData().then(r => {
            console.log(r);
        });
        offLoading();
    }, [mounted, setMounted]);

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
                        <Button onClick={() => kickHandle(depName, checked)}>Kick</Button>
                        <Button
                            onClick={() => promotionHandle(params.getValue(params.id, 'userName'))}>Promotion</Button>
                    </>
                );
            }
        },
    ];

    return (
        <div>
            <BackButton children="Back" switchTo={() => switchToListDep()}/>
            <div className="DepContainer">
                {loading? <FullscreenLoading/>: null}
                <AddMemberModal
                    isShowing={isShowing}
                    toggleModal={toggle}
                    modalRef={modalRef}
                    groupName={depName}
                    toggleMount={toggleMount}
                />
                <div className="DepUpDate">
                    <span className="DepUpdateTitle">Edit Department</span>
                    <from className="DepUpdateFrom">
                        <div className="DepUpdateLeft">
                            <div className="DepUpdateItem">
                                <label>Department Name</label>
                                <TextField
                                    type="text"
                                    className="DepUpdateInput"
                                    value={depName}
                                />
                            </div>
                            <div className="DepUpdateItem">
                                <label>Leader Name</label>
                                <TextField
                                    type="text"
                                    className="DepUpdateInput"
                                    value={depLeader}
                                    disabled
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
                                    onSelectionModelChange={m => {
                                        console.log(m.selectionModel);
                                        loadCheck(m.selectionModel);
                                    }}
                                    rows={member}
                                    disableSelectionOnClick
                                    columns={columns}
                                    pageSize={5}
                                    checkboxSelection
                                />
                            </div>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
}


export default DepEdit;

const kickHandle = async (depName, ids) => {
    if (ids.length === 0) {
        alert("Please select at least one member!");
        return;
    }
    await GroupService.removeMembers(depName, ids).then(res => {
        if (res.status === 200)
            alert(res.data.message);
        else
            window.location.reload(false);
    })
}
const promotionHandle = async (username) => {
    if (username == null) {
        alert("Please select at least one member!");
        return;
    }
    await GroupService.promotion(username).then(res => {
        if (res.status === 200)
            alert(res.data.message);
        else
            window.location.reload(false);
    })
}