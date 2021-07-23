import React, {useEffect, useRef, useState} from "react";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import {ProjectService, ReportService} from "../../services/services";
import useStyles from "./styles/editStyles";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import moment from "moment";
import {DataGrid} from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import ReportCreateModal from "../Report/ReportCreateModal";
import {useHistory, useParams} from "react-router-dom";
import BackButton from "../../component/BackButton";
import DialogModal from "../../component/DialogModal";
import Linker from "../../component/Linker";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";


const ProjectEdit = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const modalRef = useRef(null);
    const {loading, onLoading, offLoading} = useLoading();
    const classes = useStyles();
    let {projectId} = useParams();

    const [project, setProject] = useState({});
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState({});
    const [mounted, setMounted] = useState(true);


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

    const fetchProject =  () => {
         ProjectService.getDetails(projectId)
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

     function fetchReports() {
         ReportService.getList(projectId.value)
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    loadReport(r.data);
                    console.log(r.data);
                } else console.log(r.data.message);
            }).catch(() => {
                alert("Internal Server Error.");
            },)
    }

    const toggleDelete = () => {
        setShowDialog(!showDialog);
    }
    const handleOnYes =  (id) => {
        onLoading();
         ProjectService.deleteProject(id)
            .then((r) => {
                if (r.status === 200) {
                    console.log("remove " + id);
                } else console.log(r);
            }, null)
        offLoading();
    }
    const loadId = (e) => {
        handleOnYes(e);
    }

    useEffect(() => {
        onLoading();
        fetchProject();
        fetchReports();
        offLoading();
        document.title = "Project Edit - " + project.name;
    }, [mounted, setMounted]);

    const columns = [
        {field: "name", headerName: "Report Name", width: 200},
        {field: "remark", headerName: "Description", width: 200},
        {field: "groupName", headerName: "Group Name", width: 200},
        {
            field: "startDate", headerName: "Start Date", width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {
            field: "dueDate", headerName: "End Date", width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {field: "progress", headerName: "Progress", width: 200},
        {
            field: "actions", headerName: "Action", width: 200,
            renderCell: (p) => {
                return (
                    <Linker to={"/report/"+p.row.id} content={<EditOutlinedIcon/>}/>
                )
            }
        }
    ];


    return (
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <DialogModal
                    isOpened={showDialog}
                    toggle={toggleDelete}
                    contents={"Are you sure that you want to delete this?"}
                    heading={"Delete confirmation"}
                    onYes={() => {
                        loadId(projectId.value);
                    }}
                    isYesNo={true}
                />
                <ReportCreateModal
                    isShowed={isShowing}
                    toggle={toggleCreateRp}
                    modalRef={modalRef}
                    projectId={projectId}
                    toggleMount={toggleMount}
                />
                <Grid container className={classes.topPaper}>
                    <Grid item xs={3}>
                        <BackButton children="Back" switchTo={"project"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.button} onClick={toggleCreateRp}>
                            <AddIcon className={classes.create}/>
                            <Typography className={classes.createText}>Create</Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={6} justify="flex-end">
                        <Grid item xs={3}>
                            <Typography variant="body1" color="primary" align="right">PROJECT EDITOR</Typography>
                            <Typography variant="body2" color="secondary" align="right">{name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.grid} container>
                    <Grid container item xs={3} style={{padding:10}} justify={"flex-start"} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>PROJECT INFORMATION</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={name}
                                label="Name"
                                variant="outlined"
                                id="name"
                                required
                                helperText={error.name}
                                fullWidth
                                onChange={(e) => loadName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="Description"
                                label="Description"
                                multiline
                                variant="outlined"
                                fullWidth
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
                                variant="outlined"
                                helperText={error.startDate}
                                value={startDate}
                                fullWidth
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
                                helperText={error.endDate}
                                value={endDate}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => loadEndDate(e.target.value)}
                            />
                        </Grid>

                        <Grid container justify="flex-start" style={{padding: "10px 0 0 12px"}}>
                            <Grid item xs={4}>
                                <Button variant="outlined" color="primary">
                                    Update
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" color="secondary" onClick={toggleDelete}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}/>
                        <Grid item xs={12}/>
                        <Grid item xs={12}/>
                        <Grid item xs={12}/>
                    </Grid>
                    <Grid container item xs={9}>
                        <Grid item xs={12}>
                            <DataGrid
                                className={classes.projectList}
                                columns={columns}
                                rows={reports}
                                pageSize={10}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
export default ProjectEdit