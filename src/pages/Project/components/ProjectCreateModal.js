import React, {useState} from 'react';

import {ProjectService} from "../../../services/services";
import useStyles from "../../../component/styles/modalStyles";
import {useHistory} from "react-router-dom";
import {useLoading} from "../../../component/hooks/hooks";
import * as ReactDOM from "react-dom";
import {Paper, TextField, Typography} from "@material-ui/core";
import FullscreenLoading from "../../../component/FullScreenLoading";
import moment from "moment";


const ProjectCreateModal = ({
                            isShowing,
                            modalRef,
                            toggleModal
                        }) => {
    const classes = useStyles();
    const history = useHistory();
    const {loading, onLoading, offLoading} = useLoading();

    isShowing && (document.body.style.overflow = "hidden");

    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [startDate, setStartDate] = useState(moment.now);
    const [dueDate, setDueDate] = useState(moment.now);
    const [error, setError] = useState({});

    const loadName = (value) => {
        setName(value.target.value);
    }
    const loadRemark = (value) => {
        setRemark(value.target.value);
    }
    const loadDueDate = (value) => {
        setDueDate(value.target.value);
    }
    const loadStartDate = (value) => {
        setStartDate(value.target.value);
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

        if(!moment(startDate, 'DD/MM/YYYY',true).isValid())
        {
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
        if(!moment(dueDate, 'DD/MM/YYYY',true).isValid())
        {
            setError((prevError) => ({
                ...prevError,
                dueDate: "This is not a valid date.",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                dueDate: "",
            }));
        }
        if (dueDate === "") {
            setError((prevError) => ({
                ...prevError,
                dueDate: "End date is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                dueDate: "",
            }));
        }
        return isError;
    }

    const handleSubmit = async () => {
        if (!validate()){
            onLoading();
            await ProjectService.postProject(name, remark, dueDate, startDate)
                .then((r) => {
                    if (r.status === 200)
                        toggleModal();
                    else
                        alert(r.message);
                }, null).catch((r) =>{
                    console.log(r);
                });
        }
        document.body.style.overflow = "auto";
        offLoading();
    }
    return isShowing
        ? ReactDOM.createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    {loading? <FullscreenLoading/>:null}
                    <div className={classes.createDep}>
                        <div className="newDep">
                            <Typography component="h1" variant="h5" className="newDepTitle">
                                Create New Department
                            </Typography>
                            <from className="newDepFrom">
                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadName}
                                        label="Project Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        helperText={error.name}
                                    />
                                </div>

                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadRemark}
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        id="description"
                                        name="description"
                                    />
                                </div>

                                <div className="newDepItem">
                                    <TextField
                                        type="date"
                                        onChange={loadStartDate}
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
                                </div>
                                <div className="newDepItem">
                                    <TextField
                                        type="date"
                                        onChange={loadDueDate}
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
                                </div>
                            </from>
                        </div>
                    </div>
                    <div className={classes.option}
                         style={{borderRadius: 0}}
                         onClick={() => handleSubmit()}
                    >Create
                    </div>
                    <div
                        className={classes.option}
                        style={{borderRadius: 0, margin: 10}}
                        onClick={() => {
                            toggleModal();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </div>
                </Paper>
            </div>
            , document.body
        ) :
        null;
}
export default ProjectCreateModal;