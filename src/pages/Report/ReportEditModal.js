import useStyles from "../../component/styles/modalStyles";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {ReportService} from "../../services/services";
import {useSnackbar} from "notistack";
import {createPortal} from "react-dom";
import moment from "moment";
const ReportEditModal = ({modalRef, toggle, reportId, toggleMount , isShow}) => {
    const classes = useStyles();
    const [report, setReport] = useState({});
    const {name,remark,startDate,dueDate,progress, groupId, projectId} = report;

    const {enqueueSnackbar} = useSnackbar();

    const changeName = (value) => setReport(prevState => ({...prevState, name:value.target.value}))
    const changeRemark = (value) => setReport(prevState => ({...prevState, remark:value.target.value}))
    const changeStartDate = (value) => setReport(prevState => ({...prevState, startDate:value.target.value}))
    const changeDueDate = (value) => setReport(prevState => ({...prevState, dueDate:value.target.value}))

    const handleSubmit = () => {
        ReportService.putReport(reportId,name,remark,startDate,dueDate,progress,groupId,projectId)
            .then((r) => {
                if (r.status === 200)
                {
                    enqueueSnackbar("Update", {variant:"success"})
                    toggleMount();
                    toggle();
                } else enqueueSnackbar(r.data.message, {variant:"warning"})
            })
            .catch((r) => {enqueueSnackbar(r, {variant:"error"})})
    }

    useEffect(() => {
        ReportService.getDetails(reportId)
            .then((r) => {
                if (r.status === 200) {
                    setReport(r.data);
                }
            })
        .catch((r) => {enqueueSnackbar(r, {variant:"error"})})
    },[reportId, toggle, modalRef]);

    isShow ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto")

    return isShow ? createPortal (
        <div>
            <div className={classes.modalOverlay}/>
            <Paper className={classes.root} style={{width:400}} ref={modalRef}>
                <Grid spacing={3} container justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"}>EDIT REPORT</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Name"}
                            value={name??""}
                            onChange={changeName}
                            required
                            variant={"outlined"}
                            id={"name-input"}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Description"}
                            value={remark??""}
                            onChange={changeRemark}
                            required
                            variant={"outlined"}
                            id={"remark-input"}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Start Date"}
                            value={moment(startDate).format("YYYY-MM-DD")??""}
                            onChange={changeStartDate}
                            required
                            variant={"outlined"}
                            id={"name-input"}
                            fullWidth
                            type={"date"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Name"}
                            value={moment(dueDate).format("YYYY-MM-DD")??""}
                            onChange={changeDueDate}
                            required
                            variant={"outlined"}
                            id={"name-input"}
                            fullWidth
                            type={"date"}
                            />
                    </Grid>
                    <Grid item xs={12} container justifyContent={"space-evenly"}>
                        <Button
                            color="primary"
                            variant={"outlined"}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            variant={"outlined"}
                            onClick={() => {
                                toggle();
                                document.body.style.overflow = "auto";
                            }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>, document.body
    ) : null
}
export default ReportEditModal;