import "./styles/DepCreate.css"
import React, {Component, useState} from 'react';

import {GroupService} from "../../../services/services";
import useStyles from "./styles/modalStyles";
import {useHistory} from "react-router-dom";
import {useLoading} from "../../../component/hooks/hooks";
import * as ReactDOM from "react-dom";


const DepCreateModal = ({
    isShowing,
    modalRef,
    toggleModal
}) => {
    const classes = useStyles();
    const history = useHistory();
    const {loading, onLoading, offLoading} = useLoading();

    isShowing && (document.body.style.overflow = "hidden");

    const [depName, setDepName] = useState("");
    const [description, setDescription] = useState("");

    const loadDepName = (value) => {
        setDepName(value);
    }

    const loadDescription = (value) => {
        setDescription(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleModal();
        onLoading();
        await GroupService.postDepartment(depName, description, "")
            .then(r => {
                if (r.status === 200){
                    console.log("Create Success");
                }
                else console.log(r.data);
            });
        offLoading();
        document.body.style.overflow = "auto";
    }
    return isShowing
        ? ReactDOM.createPortal(
            <div className="newDep">
            <h1 className="newDepTitle">New Dep</h1>
            <from className="newDepFrom">
                <div className="newDepItem">
                    <label>Department Name</label>
                    <input type="text" onChange={loadDepName}/>
                </div>

                <div className="newDepItem">
                    <label>Description</label>
                    <input type="text"  onChange={loadDescription}/>
                </div>
                <button className="newDepButton" onClick={(event) => handleSubmit(event)}>Create</button>
                <button
                    className={classes.option}
                    style={{borderRadius: 0, margin: 10}}
                    onClick={() => {
                        toggleModal();
                        document.body.style.overflow = "auto";
                    }}
                >
                    Cancel
                </button>
            </from>
        </div>
            , document.body): null;
}
export default DepCreateModal;