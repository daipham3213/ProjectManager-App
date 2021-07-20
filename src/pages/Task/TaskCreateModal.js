import React, {useEffect, useState} from "react";
import {GroupService, PhaseService, ReportService} from "../../services/services";
import TaskServices from "../../services/task.service";
import * as ReactDOM from "react-dom";
import useStyles from "../../component/styles/modalStyles"
import {Button, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const TaskCreateModal = ({
                             toggle,
                             toggleMount,
                             modalRef,
                             isShowed,
                             isOnReport = true,
                             reportId,
                             groupUrl = "",
                             onLoading,
                             offLoading
                         }) => {
    const [reports, setReports] = useState([]);
    const [phases, setPhases] = useState([]);
    const [tasks, setTask] = useState([]);
    const [member, setMember] = useState([]);
    const [rpId, setRpId] = useState("");
    const [phaseId, setPhaseId] = useState("");
    const [parent_n, setParent_n] = useState("");
    const [memberId, setMemberId] = useState("");
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [percent, setPercent] = useState(0);

    const loadReports = (value) => setReports(value);
    const loadPhases = (value) => setPhases(value);
    const loadTasks = (value) => setTask(value);
    const loadMember = (value) => setMember(value);

    const changeRpId = (e) => setRpId(e.target.value);
    const changeParent_n = (e) => setParent_n(e.target.value);
    const changePhaseId = (e) => setPhaseId(e.target.value);
    const changeMemberId = (e) => setMemberId(e.target.value);
    const changeName = (e) => setName(e.target.value);
    const changeRemark = (e) => setRemark(e.target.value);
    const changeDueDate = (e) => setDueDate(e.target.value);
    const changeStartDate = (e) => setStartDate(e.target.value);
    const changePercent = (e) => setPercent(e.target.value);

    isShowed && (document.body.style.overflow = "hidden");
    const classes = useStyles();
    const [error, setError] = useState({});

    const fetchPhases = async () => {
        await PhaseService.getList(reportId)
            .then((result) => {
                if (result.status === 200) {
                    loadPhases(result.data);
                } else console.log(result.data.message);
            })
            .catch(() => {
                console.log("Internal Server Error");
            });
    }
    const fetchReports = async () => {
        await ReportService.getList("")
            .then((r) => {
                if (r.status === 200) {
                    loadReports(r.data);
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal Server Error");
            });
    }
    const fetchTasks = async (phaseId) => {
        await TaskServices.getListByPhase(phaseId)
            .then((r) => {
                if (r.status === 200) {
                    loadTasks(r.data);
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal Server Error");
            });
    }
    const fetchMember = async () => {
        let groupId = groupUrl.split("/");
        if  (groupId.length !== 0 && groupUrl !== null)
        await GroupService.memberList(groupId[2])
            .then((r) => {
                if (r.status === 200) {
                    loadMember(r.data);
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal Server Error");
            })
    }

    const createHandler = async () => {
        await TaskServices.postTask(name, remark, dueDate, startDate, percent, phaseId, memberId, parent_n)
            .then((r) => {
                if (r.status === 200) {
                    console.log("created task " + name);
                    toggle();
                    toggleMount();
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal Server Error");
            });
    }

    useEffect(() => {
        onLoading();
        fetchPhases();
        if (!isOnReport) fetchReports();
        if (phaseId !== "") fetchTasks(phaseId);
        if (groupUrl !== null && groupUrl !== "undefined") fetchMember();
        offLoading();
    }, [modalRef, toggle, phaseId, setPhaseId]);

    const reportSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="reports-label">Reports</InputLabel>
                <Select
                    labelId="reports-label"
                    id="reports-select"
                    value={rpId}
                    variant="outlined"
                    onChange={changeRpId}
                    label="Reports"
                    fullWidth
                    required
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {reports.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    }

    const phaseSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="phase-label">Phase</InputLabel>
                <Select
                    labelId="phase-label"
                    id="phase-select"
                    value={phaseId}
                    variant="outlined"
                    onChange={changePhaseId}
                    label="Phases"
                    fullWidth
                    required
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {phases.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const taskSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="phase-label">Parent Task</InputLabel>
                <Select
                    labelId="phase-label"
                    id="phase-select"
                    value={parent_n}
                    variant="outlined"
                    onChange={changeParent_n}
                    label="Parent Task"
                    fullWidth
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {tasks.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const memberSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="member-label">Member</InputLabel>
                <Select
                    labelId="member-label"
                    id="member-select"
                    value={memberId}
                    variant="outlined"
                    onChange={changeMemberId}
                    label="Member"
                    fullWidth
                    required
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {member.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const emptyPhase = () => {
        return (<>
                <Grid item xs={12}>
                    <Typography variant="overline">
                        Please Create Phase Before Create Task
                    </Typography>
                </Grid>
                <Grid item={8}/>
                <Grid item xs={4}>
                    <Button
                        color="secondary"
                        onClick={() => {
                            toggle();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </>
        )
    }

    const createForm = () => {
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        onChange={changeName}
                        label="Task Name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        name="name"
                        helperText={error.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        onChange={changeRemark}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        id="description"
                        name="description"
                    />
                </Grid>
                {!isOnReport ? reportSelect() : null}
                {phases?.length ? phaseSelect() : null}
                {phaseId !== "" ? taskSelect() : null}
                {phaseId !== "" ? memberSelect() : null}
                <Grid item xs={12}>
                    <TextField
                        type="date"
                        onChange={changeStartDate}
                        value={startDate}
                        label="Start Date"
                        variant="outlined"
                        required
                        fullWidth
                        id="startDate"
                        name="startDate"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={error.startDate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="date"
                        onChange={changeDueDate}
                        value={dueDate}
                        label="End Date"
                        variant="outlined"
                        required
                        fullWidth
                        id="endDate"
                        name="endDate"
                        helperText={error.dueDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        onChange={changePercent}
                        label="Progress"
                        variant="outlined"
                        fullWidth
                        id="Progress"
                        name="Progress"
                    />
                </Grid>
                <Grid item={8}/>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        onClick={() => {
                            createHandler();
                        }}
                    >
                        Create
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            toggle();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </>
        )
    }
    return isShowed
        ? ReactDOM.createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <Grid container xs={12} spacing={2} style={{padding: 10}} justifyContent="center" direction="row">
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{fontSize: 32, fontWeight: "bold"}}>
                                Create new task
                            </Typography>
                        </Grid>
                        {phases?.length? createForm() : emptyPhase()}
                    </Grid>
                </Paper>
            </div>, document.body
        ) : null
}
export default TaskCreateModal