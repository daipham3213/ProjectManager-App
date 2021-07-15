import {useContext, useEffect, useRef, useState} from "react";
import {ProjectService} from "../../../services/services";
import {useLoading} from "../../../component/hooks/hooks";
import FullscreenLoading from "../../../component/FullScreenLoading";
import {DataGrid} from "@material-ui/data-grid";
import {Paper, Typography} from "@material-ui/core";
import useStyles from "./styles/listStyle";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined'
import AddIcon from '@material-ui/icons/Add';
import ProjectContext from "../projectContext";
import DialogModal from "../../../component/DialogModal";
import ProjectCreateModal from "./ProjectCreateModal";
import moment from "moment";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isShowing, setIsShowing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const {loading, onLoading, offLoading} = useLoading();
    const [id, setId] = useState("");
    const modalRef = useRef(null);
    const classes = useStyles();

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

    const fetchProject = () => {
        ProjectService.getList()
            .then((r) => {
                if (r.status === 200) {
                    loadProjects(r.data);
                    console.log(r.data);
                } else alert(r.error);
            }, []).catch((r) => {
            console.log(r);
        });

    }

    const handleOnYes = (id) => {
        onLoading();
        ProjectService.deleteProject(id)
            .then((r) => {
                if (r.status === 200) {
                    let index = projects.indexOf(id);
                    projects.splice(index, 1);
                    console.log("remove " + id);
                } else console.log(r);
            }, {})
        offLoading();
    }
    useEffect(() => {
        onLoading();
        fetchProject();
        offLoading();
    }, []);

    const {switchToEdit} = useContext(ProjectContext);

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
                                    switchToEdit(p.rows?.id);
                                    console.log(p.rows?.id);
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
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.button} onClick={toggleCreate} >
                        <AddIcon className={classes.create} />
                        <Typography className={classes.createText}>Create</Typography>
                    </div>
                    <ProjectCreateModal
                        modalRef={modalRef}
                        toggleModal={toggleCreate}
                        isShowing={isCreate}
                    />
                    <DataGrid
                        className={classes.projectList}
                        rows={projects}
                        columns={columns}
                        pageSize={5}
                    />
                </div>
            </Paper>
        </>
    )
}
export default ProjectList