import React, {useContext, useEffect, useRef, useState} from "react";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import {ProjectService, ReportService} from "../../services/services";
import useStyles from "./styles/editStyles";
import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import moment from "moment";
import {DataGrid, getIdFromRowElem} from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ReportCreateModal from "../Report/ReportCreateModal";
import {GridCellParams} from "@material-ui/data-grid";
import {useHistory} from "react-router-dom";
import ContextProvider from "../../component/ContextProvider";
import BackButton from "../../component/BackButton";



const ProjectEdit = (projectId) => {
    const [isShowing, setIsShowing] = useState(false);
    const modalRef = useRef(null);
    const {loading, onLoading, offLoading} = useLoading();
    const classes = useStyles();
    const history = useHistory();

    const [project, setProject] = useState({});
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState({});
    const [mounted, setMounted] = useState(true);

    const {switchToListPro, switchToEditRp} = useContext(ContextProvider);

    const toggleCreateRp = () => {
        setIsShowing(!isShowing);
    }
    const toggleMount = () => setMounted(!mounted);
    const loadProject = (val) => {
        setProject(val);
    }

    const loadReport = (val) => {
        setReports(val);
    }

    const loadName = (val) => {
        setName(val);
    }

    const loadRemark = (val) => {
        setRemark(val);
    }
    const loadStartDate = (val) => {
        setStartDate(val);
    }
    const loadEndDate = (val) => {
        setEndDate(val);
    }

    const validate = () => {
        let isError = false;
        if (name === "") {
            setError((prevError) => ({
                ...prevError,
                name: "Project name is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                name: "",
            }));
        }

        if (!moment(startDate, 'DD/MM/YYYY', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                startDate: "This is not a valid date.",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                startDate: "",
            }));
        }
        if (startDate === "") {
            setError((prevError) => ({
                ...prevError,
                startDate: "Start date is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                startDate: "",
            }));
        }
        if (!moment(endDate, 'DD/MM/YYYY', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                endDate: "This is not a valid date.",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                endDate: "",
            }));
        }
        if (endDate === "") {
            setError((prevError) => ({
                ...prevError,
                endDate: "End date is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                endDate: "",
            }));
        }
        return isError;
    }

    const fetchProject = async () => {

        await ProjectService.getDetails(projectId.value)
            .then((r) => {
                if (r.status === 200) {
                    loadProject(r.data);
                    loadName(r.data.name);
                    loadRemark(r.data.remark);
                    loadStartDate(moment(r.data.startDate).format("yyyy-MM-DD"));
                    loadEndDate(moment(r.data.endDate).format("yyyy-MM-DD"));
                } else console.log(r.data.message);
            })
            .catch(() => {
                alert("Internal Server Error.");
            })

    }
    async function fetchReports () {
        await ReportService.getList(projectId.value)
            .then((r) => {
                if (r.status === 200 || r.status ===204){
                    loadReport(r.data);
                    console.log(r.data);
                }else console.log(r.data.message);
            }).catch(() => {
                alert("Internal Server Error.");
            },)
    }

    useEffect(() => {
        onLoading();
        fetchProject();
        fetchReports();
        offLoading();
    },[mounted, setMounted]);

    const columns = [
        {field:"name", headerName:"Report Name", width: 200},
        {field:"remark", headerName:"Description", width: 200},
        {field:"groupName", headerName:"Group Name", width: 200},
        {field:"startDate", headerName:"Start Date", width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");}
        },
        {field:"dueDate", headerName:"End Date", width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");}
        },
        {field:"progress", headerName:"Progress", width: 200},
    ];

    function handleReportClick(idFromRowElem) {
        return function (p1: GridCellParams, p2: React.MouseEvent) {
            history.push("/reports")
        };
    }

    return (
        <>
        {loading ? <FullscreenLoading/> : null}
        <Paper className={classes.root}>
            <ReportCreateModal
                isShowed={isShowing}
                toggle={toggleCreateRp}
                modalRef={modalRef}
                projectId={projectId}
                toggleMount={toggleMount}
            />
            <Grid container className={classes.topPaper}>
                <Grid item xs={3}>
                    <BackButton children="Back" switchTo={() => switchToListPro()}/>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.button} onClick={toggleCreateRp}>
                        <AddIcon className={classes.create} />
                        <Typography className={classes.createText}>Create</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid className={classes.grid} container>
                <Grid container xs={3} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            value={name}
                            label="Name"
                            variant="outlined"
                            id="name"
                            required
                            helperText={error.name}
                            onChange={(e) => loadName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="Description"
                            label="Description"
                            multiline
                            variant="outlined"
                            value={remark}
                            onChange={(e) => loadRemark(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="startDate"
                            label="Start Date"
                            required
                            type="date"
                            defaultValue={startDate}
                            variant="outlined"
                            helperText={error.startDate}
                            value={startDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => loadStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="endDate"
                            label="End Date"
                            required
                            type="date"
                            variant="outlined"
                            defaultValue={endDate}
                            helperText={error.endDate}
                            value={endDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => loadEndDate(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={9}>
                    <Grid item xs={12}>
                        <DataGrid
                            columns={columns}
                            rows={reports}
                            pageSize={10}
                            onCellDoubleClick={(e) => {switchToEditRp(e.id);}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
</>
)
}
export default ProjectEdit