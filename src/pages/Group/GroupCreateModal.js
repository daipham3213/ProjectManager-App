import useStyles from "../../component/styles/modalStyles";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {createPortal} from "react-dom";
import {Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import {GroupService, GroupTypeService, UserService} from "../../services/services";
import Button from "@material-ui/core/Button";
import {useLoading} from "../../component/hooks/hooks";

const GroupCreateModal = ({modalRef, isShow, toggle, toggleMount}) => {
    const classes = useStyles();
    const [departs, setDeparts] = useState([]);
    const [group, setGroup] = useState({});
    const [types, setTypes] = useState([]);
    const [type, setType] = useState({});
    const [available, setAvailable] = useState([]);
    const [error, setError] = useState({});
    const {loading, onLoading, offLoading} = useLoading();

    const {name="", remark="", leaderId="", parentNId=""} = group;
    const {errName="", errLeaderId="", errParentNId=""} = error;

    const changeName = (e) => setGroup((prevState => ({...prevState, name: e.target.value})))
    const changeRemark = (e) => setGroup((prevState => ({...prevState, remark: e.target.value})))
    const changeLeader = (e) => setGroup((prevState => ({...prevState, leaderId: e.target.value})))
    const changeParentN = (e) => setGroup((prevState => ({...prevState, parentNId: e.target.value})))
    const changeTypes = (e) => setType(e.target.value);

    const {...bar} = useSnackbar();
    let role = localStorage.getItem("roles") === "Admin"

    useEffect(() => {
        onLoading();
        GroupService.getListDepartment()
            .then((r) => {
                if (r.status === 200)
                    setDeparts(r.data);
            })
            .catch((r) => bar.enqueueSnackbar(r, {variant: "error"}))
        GroupTypeService.getList()
            .then((r) => {
                setTypes(r.data);
            })
            .catch((r) => {
            bar.enqueueSnackbar(r, {variant: "error"})
        })
        UserService.getAvailable()
            .then((r) => {
                if (r.status === 200)
                    setAvailable(r.data);
            })
            .catch((r) => {
                bar.enqueueSnackbar(r, {variant: "error"})
            })
        offLoading();
    },[modalRef,toggle]);

    const validate = () => {
        let isError = false;
        debugger;
        if (name === ""){
            isError = true;
            setError(prevState => ({...prevState, errName:"This field is required."}))
        }
        if (parentNId === "" && type === "Group"){
            isError = true;
            setError(prevState => ({...prevState, errParentNId:"This field is required."}))
        }
        if (role && leaderId === ""){
            isError = true;
            setError(prevState => ({...prevState, errLeaderId:"This field is required."}))
        }
        return !isError
    }

    const handleCreate = () => {
        if (validate()) {
            onLoading();
            if (type === "Group") {
                GroupService.postTeam(name, remark, leaderId, parentNId)
                    .then((r) => {
                        if (r.status === 200) {
                            bar.enqueueSnackbar("Create group " + name + " success. Please wait for the admin to confirm", {variant: "success"});
                            toggle();
                            toggleMount();
                        } else bar.enqueueSnackbar(r.data.message, {variant: "error"});
                    })
                    .catch((r) => {
                        bar.enqueueSnackbar(r, {variant: "error"});
                    })
                offLoading();
            }
            else {
                GroupService.postDepartment(name, remark, leaderId)
                    .then((r) => {
                        if (r.status === 200) {
                            bar.enqueueSnackbar("Create department " + name + " success. Please wait for the admin to confirm", {variant: "success"});
                            toggle();
                            toggleMount();
                        } else bar.enqueueSnackbar(r.data.message, {variant: "error"});
                    })
                    .catch((r) => {
                        bar.enqueueSnackbar(r, {variant: "error"});
                    })
                offLoading();
            }
        }
    }

    isShow ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto")

    return isShow ? createPortal(
        <div>
            {}
            <div className={classes.modalOverlay}/>
            <Paper className={classes.root} ref={modalRef} style={{width:400, padding:20}}>
                <Grid container justifyContent={"center"} spacing={3}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5" className="newDepTitle">
                            Create New Department
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            onChange={changeName}
                            label="Team Name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoFocus
                            value={name??""}
                            helperText={errName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            onChange={changeRemark}
                            value={remark??""}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            id="name"
                            name="name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type-select"
                            value={type??""}
                            variant="outlined"
                            required
                            onChange={changeTypes}
                            label="Type"
                            fullWidth
                        >
                            <MenuItem value={""}>Select</MenuItem>
                            {types.map(({id, name}, index) =>
                                <MenuItem key={index} value={name}>
                                    {name}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    {type === "Group"  ? (
                        <Grid item xs={12}>
                            <InputLabel id="depart-label">Department</InputLabel>
                            <Select
                                labelId="depart-label"
                                id="depart-select"
                                value={parentNId??""}
                                variant="outlined"
                                required
                                onChange={changeParentN}
                                label="Department"
                                fullWidth
                            >
                                <MenuItem value={""}>Select</MenuItem>
                                {departs.map(({id, name}, index) =>
                                    <MenuItem key={index} value={id}>
                                        {name}
                                    </MenuItem>
                                )}
                            </Select>
                            {errParentNId!=="" ? (
                                <Typography variant={"caption"}>{errParentNId}</Typography>
                            ):null}
                        </Grid>
                        ) : null
                    }
                    <Grid item xs={12} >
                        {role ? (
                            <>
                                <InputLabel id="leader-label">Leader</InputLabel>
                                <Select
                                    labelId="leader-label"
                                    id="leader-select"
                                    value={leaderId??""}
                                    variant="outlined"
                                    required
                                    onChange={changeLeader}
                                    label="Group"
                                    fullWidth
                                >
                                    <MenuItem value={""}>Select</MenuItem>
                                    {available.map(({id, name}, index) =>
                                        <MenuItem key={index} value={id}>
                                            {name}
                                        </MenuItem>
                                    )}
                                </Select>
                                {errLeaderId!=="" ? (
                                    <Typography variant={"caption"}>{errLeaderId}</Typography>
                                ):null}
                            </>
                        ):null}
                    </Grid>
                    <Grid item container xs={12} justifyContent={"space-evenly"}>
                        <Button children={"Create"} variant={"outlined"} color={"primary"} onClick={handleCreate}/>
                        <Button children={"Cancel"} variant={"outlined"} color={"secondary"} onClick={toggle}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>, document.body
    ) : null
}
export default GroupCreateModal;