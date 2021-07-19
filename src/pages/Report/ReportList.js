import React, {useContext, useEffect, useRef, useState} from "react";
import {useLoading} from "../../component/hooks/hooks";
import {GroupService, ProjectService, ReportService} from "../../services/services";
import {Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import useStyles from "./styles/ReportListStyle";
import FullscreenLoading from "../../component/FullScreenLoading";
import ReportCreateModal from "./ReportCreateModal";
import {DataGrid} from "@material-ui/data-grid";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import moment from "moment";
import BackButton from "../../component/BackButton";
import ContextProvider from "../../component/ContextProvider";
import AddIcon from "@material-ui/icons/Add";
import TaskCreateModal from "../Task/TaskCreateModal";

const ReportList = () => {
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const [projects, setProjects] = useState([]);
    const [fData, setFData] = useState([]);
    const [groupName, setGroupName] = useState("All");
    const [prjName, setPrjName] = useState("All");

    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);
    const [isShowCreate, setIsShowCreate] = useState(false);
    const modelRef = useRef();
    const classes = useStyles();

    const loadReports = (value) => setReports(value);
    const loadGroups = (value) => setGroups(value);
    const loadProjects = (value) => setProjects(value);
    const loadFData = (value) => setFData(value);
    const loadGroup = (value) => {
        setGroupName(value.target.value);
        filterData(value.target.value, prjName);
    }
    const loadPrjName = (value) => {
        setPrjName(value.target.value);
        filterData(groupName, value.target.value);
    }

    const toggleMount = () => setMounted(!mounted);
    const toggleCreate = () => setIsShowCreate(!isShowCreate);

    const filterData = (gName, pName) => {
        let filtered;
        if (gName === "All" && pName === "All") {
            filtered = reports;
        }
        if (gName !== "All" && pName === "All") {
            filtered = reports.filter(f => f.groupName === gName);
        }
        if (gName === "All" && pName !== "All") {
            filtered = reports.filter(f => f.projectName === pName);
        }
        if (gName !== "All" && pName !== "All") {
            filtered = reports.filter(f => f.projectName === pName && f.groupName === gName);
        }
        loadFData(filtered);
    }

    const fetchGroups = async () => {
        await GroupService.getList("")
            .then((r) => {
                if (r.status === 200) {
                    loadGroups(r.data);
                } else console.log(r.data.message);
            })
            .catch(() => {
                console.log("Internal server error");
            })
    }

    const fetchReports = async () => {
        await ReportService.getList("")
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    loadReports(r.data);
                    loadFData(r.data);
                } else console.log(r.data.message);
            }).catch(() => {
                console.log("Internal Server Error.");
            })
    }

    const fetchProjects = async () => {
        await ProjectService.getList()
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    loadProjects(r.data);
                } else console.log(r.data.message);
            }).catch(() => {
                console.log("Internal Server Error.");
            })
    }

    useEffect(() => {
        onLoading();
        fetchReports();
        fetchGroups();
        fetchProjects();
        offLoading();
    }, [mounted, setMounted]);

    useEffect(() => {
        filterData(groupName, prjName);
    }, [groupName, prjName]);

    const {switchToEditRp} = useContext(ContextProvider);

    const columns = [
        {field: "name", headerName: "Report name", width: 200},
        {field: "remark", headerName: "Description", width: 200},
        {field: "groupName", headerName: "Group", width: 200},
        {field: "projectName", headerName: "Project", width: 200},
        {field: "progress", headerName: "Progress", width: 150},
        {
            field: "startDate", headerName: "Start", width: 120,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {
            field: "dueDate", headerName: "End", width: 120,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {
            field: "actions", headerName: "Actions", width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => switchToEditRp(params.row.id)}>
                            <EditIcon color="primary"/>
                        </Button>
                        <Button onClick={() => switchToEditRp(params.row.id)}>
                            <DeleteOutlinedIcon color="primary"/>
                        </Button>
                    </>
                );
            }
        },
    ];

    return (
        <Paper className={classes.root}>
            {loading ? <FullscreenLoading/> : null}
            <ReportCreateModal
                toggleMount={toggleMount}
                toggle={toggleCreate}
                showPrjList={true}
                projectId={""}
                modalRef={modelRef}
                isShowed={isShowCreate}
            />
            <Grid container justify="center" spacing={3}>
                <Grid item xs={1}>
                    <Typography variant="h6" align="center">REPORTS</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}
                  classes={classes.container}
                  direction="column"
                  justify="center"
                  alignItems="stretch">
                <Grid container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={3}
                >
                    <Grid item xs={2}>
                        <BackButton children="Back to Home"/>
                    </Grid>
                    <Grid item xs={2} onClick={toggleCreate}>
                        <Button>
                            <AddIcon/> Create new report
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="overline" display="block" gutterBottom align="right">
                            Filters
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl} fullWidth variant="outlined">
                            <InputLabel>Groups</InputLabel>
                            <Select
                                labelId="group-label"
                                id="group-select"
                                value={groupName}
                                variant="outlined"
                                onChange={loadGroup}
                                label="Group"
                                fullWidth
                            >
                                <MenuItem value={"All"}>All</MenuItem>
                                {groups.map(({id, name}) =>
                                    <MenuItem key={id} value={name}>
                                        {name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl} fullWidth variant="outlined">
                            <InputLabel>Projects</InputLabel>
                            <Select
                                labelId="group-label"
                                id="group-select"
                                value={prjName}
                                variant="outlined"
                                onChange={loadPrjName}
                                label="Group"
                                fullWidth
                                autoWidth={true}
                            >
                                <MenuItem value={"All"}>All</MenuItem>
                                {projects.map(({id, name}) =>
                                    <MenuItem key={id} value={name}>
                                        {name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        columns={columns}
                        rows={fData}
                        pageSize={10}
                        className={classes.reportList}
                        disableSelectionOnClick
                        disableColumnFilter
                        autoHeight={true}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
export default ReportList;