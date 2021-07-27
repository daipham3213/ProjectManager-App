import "./styles/DepCreate.css"
import React, {useEffect, useState} from 'react';

import {GroupService, UserService} from "../../services/services";
import useStyles from "../../component/styles/modalStyles";
import {useLoading} from "../../component/hooks/hooks";
import * as ReactDOM from "react-dom";
import {InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import FullscreenLoading from "../../component/FullScreenLoading";
import {useSnackbar} from "notistack";


const DepCreateModal = ({
                            isShowing,
                            modalRef,
                            toggleModal,
                            toggleMount,
                        }) => {
    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();
    const {...bar} = useSnackbar();
    isShowing && (document.body.style.overflow = "hidden");

    const [depName, setDepName] = useState("");
    const [description, setDescription] = useState("");
    const [leader, setLeader] = useState("");
    const [available, setAvailable] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    let role = localStorage.getItem("roles");

    const loadDepName = (value) => {
        setDepName(value.target.value);
    }

    const loadDescription = (value) => {
        setDescription(value.target.value);
    }

    const validate = () => {
        let isError = false;
        let username = localStorage.getItem("username");

        if (depName === "") {
            setError((prevError) => ({
                ...prevError,
                depName: "Name is required.",
            }));
            isError = true;
        }
        if (available.find(u => u.username === username) !== null && role !== "Admin") {
            setError((prevError) => ({
                ...prevError,
                depName: "You already has a group.",
            }));
            isError = true;
        }
        return isError;
    }

    const handleSubmit = async () => {

        if (!validate()) {
            onLoading();
            await GroupService.postDepartment(depName, description, leader)
                .then((r) => {
                    if (r.status === 200) {
                        toggleModal();
                        toggleMount();
                        bar.enqueueSnackbar("Success", {variant: "success"})
                    } else
                        bar.enqueueSnackbar(r.data.message, {variant: "warning"})
                    offLoading();
                }, null);
        }
        document.body.style.overflow = "auto";
    }

    useEffect(() => {
        UserService.getAvailable()
            .then((r) => {
                if (r.status === 200)
                    setAvailable(r.data);
            })
            .catch((r) => {
                bar.enqueueSnackbar(r, {variant: "error"})
            })
    }, [])
    return isShowing
        ? ReactDOM.createPortal(
            <div>
                {loading ? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <div className={classes.createDep}>
                        <div className="newDep">
                            <Typography component="h1" variant="h5" className="newDepTitle">
                                Create New Department
                            </Typography>
                            <from className="newDepFrom">
                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadDepName}
                                        label="Department Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        helperText={error != null ? error.depName : ""}
                                    />
                                </div>
                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadDescription}
                                        label="Description"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        name="description"
                                    />
                                </div>
                                {role === "Admin" ?
                                    <div className="newDepItem">
                                        <InputLabel id="leader-label">Leader</InputLabel>
                                        <Select
                                            labelId="leader-label"
                                            id="leader-select"
                                            value={leader}
                                            variant="outlined"
                                            required
                                            onChange={(e) => setLeader(e.target.value)}
                                            label="Group"
                                            fullWidth
                                        >
                                            <MenuItem value={null}>Select</MenuItem>
                                            {available.map(({id, name}, index) =>
                                                <MenuItem key={index} value={id}>
                                                    {name}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </div> : null
                                }
                            </from>
                        </div>
                    </div>
                    <div className={classes.option}
                         style={{borderRadius: 0}}
                         onClick={handleSubmit}
                    >Create</div>
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
export default DepCreateModal;