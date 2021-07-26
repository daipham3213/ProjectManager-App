import {Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {DateRange, Description, Domain, PeopleSharp, PermIdentity} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import React, {useEffect, useRef, useState} from "react";
import {GroupService, UserService} from "../../services/services";
import {useConfirm} from "material-ui-confirm";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {DataGrid} from "@material-ui/data-grid";
import BorderProgressBar from "../../component/BorderProgressBar";
import BackButton from "../../component/BackButton";
import AddMemberModal from "../Department/AddMemberModal";

const Group = () => {
    const [isShow, setShow] = useState(false);
    const [mounted, setMounted] = useState(true);
    const [checked, setChecked] = useState([]);
    const confirm = useConfirm();
    const history = useHistory();
    const modalRef= useRef();
    const {enqueueSnackbar} = useSnackbar();

    const toggle = () => setShow(!isShow);
    const toggleMount = () => setMounted(!mounted);
    const addMember = (m) => {
        setMember(oldArray => [...oldArray, m]);
    };

    const [group, setGroup] = useState({});
    const [member, setMember] = useState([]);
    const [leader, setLeader] = useState({});
    const {...leaderProps} = leader;
    const {groupType="", users = [], id, name, leaderId, remark, dateCreated} = group;

    const cols = [
        {field: "avatarUrl", headerName: "Avatar", width: 200,
            renderCell: (p) => {
                return (
                    <Avatar alt={p.row.username} src={p.row.avatarUrl}/>
                )
            }},
        {field: "name", headerName: "Name", width: 200},
        {field: "Privilege", headerName: "Privilege", width: 200,
            renderCell: (p) => {
                return  (
                    <Button variant={"outlined"}
                            children={p.row.id === leaderId? "Leader" : "Member"}
                            color={p.row.id === leaderId? "secondary" : "primary"}
                    />
                )
            }},
        {field: "contrib", headerName: "Contribution", width: 200,
            renderCell: p => {
                return (
                    <BorderProgressBar value={p.row.contrib}/>
                )
            }},
        {
            field: "action", headerName: "Actions", width: 200,
            renderCell: (p) => {
                return (
                    <>
                        <Button
                            variant={"outlined"}
                            style={{marginRight: 5}}
                            onClick={() => kickHandle(name, checked)}
                        >
                            Kick
                        </Button>
                        <Button
                            variant={"outlined"}
                            onClick={() => promotionHandle(p.getValue(p.id, 'userName'))}
                        >
                            Promotion
                        </Button>
                    </>
                )
            }
        }
    ];

    const deleteHandle = () => {
        confirm({description: "Are you sure that you want to delete group " + name + "? This action is permanent."})
            .then(() => {
                GroupService.deleteGroup(id)
                    .then((r) => {
                        if (r.status === 200) {
                            enqueueSnackbar("Deleted group " + name + "successfully.", {variant: "success"});
                            history.goBack();
                        } else enqueueSnackbar(r.data.message, {variant: "warning"});
                    })
                    .catch((r) => {
                        enqueueSnackbar(r, {variant: "error"});
                    })
            })
    }

    const kickHandle = (depName, ids) => {
        if (ids.length === 0) {
            enqueueSnackbar("Please select at least one member!", {variant: "warning"});
            return;
        }
        confirm({description: "Are you sure?"})
            .then(() => {
                GroupService.removeMembers(depName, ids).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar("Success", {variant: "success"});
                        toggleMount();
                    } else enqueueSnackbar(res.data.message, {variant: "warning"});
                })
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant: "error"});
            })

    }
    const promotionHandle = (username) => {
        if (username == null) {
            enqueueSnackbar("Please select at least one member!", {variant: "warning"});
            return;
        }
        confirm("Are you sure? You will lose all privilege after this.")
            .then(() => {
                GroupService.promotion(username).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar("Success", {variant: "success"});
                        toggleMount();
                    } else enqueueSnackbar(res.data.message, {variant: "warning"});
                })
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant: "error"});
            })
    }

    useEffect(() => {
        GroupService.getByUser()
            .then((r) => {
                if (r.status === 200)
                    setGroup(r.data);
                else
                {
                    enqueueSnackbar("You don't have a group. Create one or ask some one to add you to a group", {variant: "warning"});
                    history.push("/");
                }
            }, {})
            .catch((r) => {
                enqueueSnackbar(r, {variant: "error"});
            })
        users.forEach((u) => {
            UserService.getProfile(u.id)
                .then((result) => {
                    if (result.status === 200) {
                        addMember(result.data);
                        if (result.data.id === leaderId) setLeader(result.data);
                    }
                }, {})
                .catch((result) => {
                    enqueueSnackbar(result, "error");
                });

        })
        document.title="Team information - " + name;
    }, [mounted, setMounted, JSON.stringify(group)])

    return (
        <Grid container spacing={3}>
            <AddMemberModal
                modalRef={modalRef}
                toggleMount={toggleMount}
                toggleModal={toggle}
                isShowing={isShow}
                groupName={name}
            />
            <Grid item xs={3}>
                <Paper>
                    <List>
                        <List style={{padding: "20px 0 0 10px"}}>
                            <ListItem>
                                <BackButton children={"Back to home"} switchTo={"/"}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<Domain/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={groupType} secondary={name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<Description/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Description"} secondary={remark}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<PeopleSharp/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Leader"} secondary={leaderProps.name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<DateRange/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Establish date"}
                                              secondary={moment(dateCreated).format("MM Do YYYY")}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<PermIdentity/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Establish By"} secondary={leaderProps.name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Button children={"Add members"} onClick={toggle} color={"primary"}/>
                                    <Button children={"Delete"} onClick={deleteHandle} color={"secondary"}/>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </List>
                </Paper>
            </Grid>

            <Grid item xs={9}>
                <Paper >
                    <DataGrid columns={cols} rows={member}
                              onSelectionModelChange={(rows) => setChecked(rows)}
                              checkboxSelection
                              pageSize={5}
                              style={{minHeight:500}}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Group;