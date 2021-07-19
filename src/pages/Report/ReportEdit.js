import React, {useContext, useEffect, useRef, useState} from "react";
import {ReportService} from "../../services/services";
import {Paper, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GanttChart from "../../component/Gantt";
import useStyles from "./styles/ReportEditStyle"
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import BackButton from "../../component/BackButton";
import ContextProvider from "../../component/ContextProvider";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import PhaseCreateModal from "../Phase/PhaseCreateModal";
import TaskCreateModal from "../Task/TaskCreateModal";
import TaskServices from "../../services/task.service";
import moment from "moment";


const ReportEdit = (reportId) => {
    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);
    const modalRef = useRef(null);
    const [showTask, setShowTask] = useState(false);
    const [showPhase, setShowPhase] = useState(false);

    const [report, setReport] = useState({});
    const [phases, setPhases] = useState([]);

    const loadReport = (value) => setReport(value);
    const loadPhases = (value) => setPhases(value);

    const toggleMount = () => setMounted(!mounted);
    const toggleTask = () => setShowTask(!showTask);
    const togglePhase = () => setShowPhase(!showPhase);

    const {switchToListRp} = useContext(ContextProvider);

    const fetchReport = async () => {
        await ReportService.getDetails(reportId.value)
            .then((r) => {
                if (r.status === 200) loadReport(r.data);
                else
                    console.log()
            })
            .catch(() => {
                console.log("Internal server error.")
            })
    }

    const fetchTaskInReport = async (reportId) => {
        await TaskServices.getList(reportId)
            .then((r) => {
                if (r.status === 200) {
                    loadPhases(r.data.phases);
                    console.log(r.data.phases);
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal server error.")
            })
    }

    useEffect(() => {
        onLoading();
        fetchReport();
        fetchTaskInReport(reportId.value);
        offLoading();
    }, [mounted, setMounted]);

    const Chart = (data) => {
        let start = moment(data.start).format("MMM Do YYYY")
        let end = moment(data.end).format("MMM Do YYYY")
        if (data !== null && data.tasks.length > 0)
            return (
                <>
                    <Grid item xs={12}><Typography variant="overline">Phase: {data.name} ({start} - {end})</Typography></Grid>
                    <Grid item xs={12}>
                        <GanttChart data={data.tasks}/>
                    </Grid>
                </>
            )
        else return (<>
                <Grid item xs={12}><Typography variant="overline">Phase: {data.name} ({start} - {end})</Typography></Grid>
                <Grid item xs={12} justifyContent="center"><Typography variant="body2" align="center">No value</Typography></Grid>
            </>
        )
    }

    return (
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <PhaseCreateModal
                    modalRef={modalRef}
                    toggleMount={toggleMount}
                    toggle={togglePhase}
                    isShowing={showPhase}
                    isOnReport={true}
                    reportId={reportId}
                />
                <TaskCreateModal
                    reportId={reportId.value}
                    isOnReport={true}
                    toggle={toggleTask}
                    toggleMount={toggleMount}
                    modalRef={modalRef}
                    isShowed={showTask}
                    groupUrl={report.groupUrl}
                    offLoading={offLoading}
                    onLoading={onLoading}
                />
                <Grid container className={classes.container}>
                    <Grid container xs={6} spacing={1}>
                        <Grid item xs={3}>
                            <BackButton switchTo={switchToListRp} children="Back to list"/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={toggleTask}>
                                <AddIcon/>
                                Create task
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={togglePhase}>
                                <AddIcon/>
                                Create phase
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={6} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="button" display="block" gutterBottom align="right" color="primary">
                                Report Editor
                            </Typography>
                            <Typography variant="body2" display="block" gutterBottom align="right" color="secondary">
                                {report.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} xs={12}>
                        {phases.map(opt => {
                            return (
                                <Chart tasks={opt.tasks} name={opt.name} start={opt.startDate} end={opt.dueDate}/>
                            )
                        })}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
export default ReportEdit;