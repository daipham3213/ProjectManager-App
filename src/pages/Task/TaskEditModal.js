import React, {useEffect, useState} from "react";
import TaskServices from "../../services/task.service";
import {createPortal} from "react-dom";
import useStyles from "../../component/styles/modalStyles";
import {Button, Grid, InputLabel, Paper, TextField, Typography} from "@material-ui/core";
import SliderCustom from "../../component/PrettoSlider";
import moment from "moment";

const TaskEditModal = ({toggle, modalRef, isShow, taskId ,toggleMount}) => {
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [percent, setPercent] = useState(0);
    const [parent_n, setParent_n] = useState("");
    const [memberId, setMemberId] = useState("");
    const [phaseId, setPhaseId] = useState("");

    isShow && (document.body.style.overflow = "hidden");

    const classes = useStyles();

    const changeName = (e) => setName(e.target.value);
    const changeRemark = (e) => setRemark(e.target.value);
    const changeDueDate = (e) => setDueDate(e.target.value);
    const changeStartDate = (e) => setStartDate(e.target.value);
    const changePercent = (e, value) => setPercent(value);

    const loadName = (e) => setName(e);
    const loadRemark = (e) => setRemark(e);
    const loadDueDate = (e) => setDueDate(e);
    const loadStartDate = (e) => setStartDate(e);
    const loadPercent = (e) => setPercent(e);
    const loadParent = (e) => setParent_n(e);
    const loadMember = (e) => setMemberId(e);
    const loadPhase = (e) => setPhaseId(e);

    const putTask = () => {
        TaskServices.editTask(taskId, name, remark, dueDate, startDate, percent, phaseId, memberId, parent_n)
            .then((r) => {
                if (r.status === 200) {
                    console.log(r.data.message);
                    toggleMount();
                    toggle();
                    document.body.style.overflow = "auto";
                } else alert(r.data.message);
            })
            .catch((r) => {
                console.log(r);
            })
    }

    const deleteTask = () => {
        TaskServices.deleteTask(taskId)
            .then((r) => {
                console.log(r.data.message);
                if (r.status === 200)
                {
                    toggleMount();
                    toggle();
                    document.body.style.overflow = "auto";
                }
            })
            .catch((r) => {
                console.log(r);
            })
    }

    useEffect(() => {
        const fetchTask = () => {
            if (taskId !=="" && typeof taskId === 'string')
                TaskServices.getDetail(taskId)
                    .then((r) => {
                        if (r.status === 200) {
                            loadName(r.data.name);
                            loadRemark(r.data.remark);
                            loadDueDate(moment(r.data.dueDate).format("YYYY-MM-DD"));
                            loadStartDate(moment(r.data.startDate).format("YYYY-MM-DD"));
                            loadPercent(r.data.percent);
                            loadParent(r.data.parentNId);
                            loadMember(r.data.userId);
                            loadPhase(r.data.phaseId);
                        }
                        else {
                            if (taskId !==null)
                                alert(r.data.message);
                        }
                    })
                    .catch((r) => {
                        console.log(r);
                    })
        }
        fetchTask();
        return () => {
             loadName("");
             loadRemark ("");
             loadDueDate ("");
             loadStartDate ("");
             loadPercent(0);
             loadParent("");
             loadMember ("");
             loadPhase("");
        }
    }, [taskId, toggle, modalRef]);

    return isShow ? createPortal(
        <div>
            <div className={classes.modalOverlay}/>
            <Paper className={classes.root} ref={modalRef} style={{padding: 20}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            align={"center"}
                            style={{fontSize: 24}}>
                            Edit Task
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            onChange={changeName}
                            value={typeof name === "string" ? name : ""}
                            label="Task Name"
                            variant="outlined"
                            required
                            fullWidth
                            size={"small"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            value={typeof remark === "string" ? remark : ""}
                            onChange={changeRemark}
                            label="Description"
                            variant="outlined"
                            required
                            fullWidth
                            size={"small"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="date"
                            onChange={changeStartDate}
                            label="Start Date"
                            variant="outlined"
                            required
                            fullWidth
                            value={typeof startDate === "string" ? startDate : moment().format("yyyy-MM-DD")}
                            size={"small"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="date"
                            onChange={changeDueDate}
                            label="End Date"
                            variant="outlined"
                            required
                            fullWidth
                            value={typeof dueDate === "string" ? dueDate : moment().format("yyyy-MM-DD")}
                            size={"small"}
                        />
                    </Grid>
                    <Grid item xs={12} container justify={"flex-start"}>
                        <InputLabel style={{padding:"8px 20px 0 0"}}>Progress</InputLabel>
                        <SliderCustom
                            title={""}
                            onChange={changePercent}
                            value={percent}
                            width={400}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <Button variant={"text"} color={"secondary"} onClick={putTask}>
                            Update
                        </Button>
                        <Button variant={"text"} color={"secondary"} onClick={deleteTask}>
                            Delete
                        </Button>
                        <Button variant={"text"} color={"primary"} onClick={()=> {
                            toggle();
                            document.body.style.overflow = "auto";
                        }}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>, document.body
    ) : null
}
export default TaskEditModal;