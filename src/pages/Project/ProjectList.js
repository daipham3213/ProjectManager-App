import React, {useContext, useEffect, useRef, useState} from "react";
import {ProjectService} from "../../services/services";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import {DataGrid} from "@material-ui/data-grid";
import {Grid, Paper, Typography} from "@material-ui/core";
import useStyles from "./styles/listStyle";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined'
import AddIcon from '@material-ui/icons/Add';
import DialogModal from "../../component/DialogModal";
import ProjectCreateModal from "./ProjectCreateModal";
import moment from "moment";
import ContextProvider from "../../component/ContextProvider";
import BackButton from "../../component/BackButton";
import Button from "@material-ui/core/Button";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isShowing, setIsShowing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const {loading, onLoading, offLoading} = useLoading();
    const [id, setId] = useState("");
    const modalRef = useRef(null);
    const classes = useStyles();
    const [mounted, setMounted] = useState(true);

    const loadProjects = (e) => {
        setProjects(e);
    }

    const toggleDelete = () => {
        setIsShowing(!isShowing);
    }

    const toggleCreate = () => {
        setIsCreate(!isCreate);
    }

    const loadId = (e) => {
        debugger;
        setId(e)
        handleOnYes(e);
    }
    const toggleMount = () => setMounted(!mounted);

    const fetchProject = async () => {
        await ProjectService.getList()
            .then((r) => {
                if (r.status === 200) {
                    loadProjects(r.data);
                    console.log(r.data);
                } else loadProjects([]);
            }).catch((r) => {
            console.log(r);
        });
    }

    const handleOnYes = async(id) => {
        onLoading();
        await ProjectService.deleteProject(id)
            .then((r) => {
                if (r.status === 200) {
                    let index = projects.indexOf(id);
                    projects.splice(index, 1);
                    console.log("remove " + id);
                } else console.log(r);
            }, null)
        offLoading();
    }
    useEffect(() => {
        onLoading();
        fetchProject();
        offLoading();
        }, [mounted,setMounted]);

    const {switchToEditPro} = useContext(ContextProvider);

    const columns = [
        {field: 'name', headerName: 'Project Name', width: 200},
        {field: 'remark', headerName: 'Descriptions', width: 300},
        {
            field: 'startDate', headerName: 'Start Date', width: 200,
            valueFormatter: (params) => {
                const valueFormatted = moment(params.value).format("Do MMM YYYY");
                return valueFormatted;
            }
        },
        {field: 'dueDate', headerName: 'End Date', width: 200,
            valueFormatter: (params) => {
                const valueFormatted = moment(params.value).format("Do MMM YYYY");
                return valueFormatted;
            }},
        {
            field: 'action', headerName: 'Actions', width: 200,
            renderCell: (p) => {
                return (
                    <div>
                        <DialogModal
                            isOpened={isShowing}
                            toggle={toggleDelete}
                            contents={"Are you sure that you want to delete this?"}
                            heading={"Delete confirmation"}
                            onYes={() => {
                                loadId(p.row.id);
                            }}
                        />
                        <div className={classes.button}>
                            <EditOutlinedIcon
                                className={classes.icon}
                                onClick={() => {
                                    switchToEditPro(p.row.id);
                                    console.log(p.row.id);
                                }}
                            />
                            <DeleteSweepOutlinedIcon
                                className={classes.icon}
                                onClick={toggleDelete}
                            />
                        </div>
                    </div>
                )
            }
        },
    ];

    return (
        <div>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <ProjectCreateModal
                    modalRef={modalRef}
                    toggleModal={toggleCreate}
                    isShowing={isCreate}
                    onReload={fetchProject}
                    toggleMount={toggleMount}
                />
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={1}>
                        <Typography variant="h6" align="center">PROJECTS</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" >
                    <Grid item xs={3} spacing={2}>
                        <BackButton children="Back to home"/>
                    </Grid>
                    <Grid item xs={7}/>
                    <Grid item xs={2}>
                        <Button onClick={toggleCreate} >
                            <AddIcon/> Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid container style={{padding:10}}>
                    <Grid item xs={12} >
                        <DataGrid
                            className={classes.projectList}
                            rows={projects}
                            columns={columns}
                            pageSize={5}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
export default ProjectList