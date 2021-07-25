import {useSnackbar} from "notistack";
import React, {useState} from "react";
import {UserService} from "../../../services/services";
import {createPortal} from "react-dom";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import useStyles from "./styles/avatarModalStyles";
import PasswordInput from "../../../component/PasswordInput";

const ChangePasswordModal = ({
                                 isShowing,
                                 modalRef,
                                 toggleModal,
                                 onLoading,
                                 offLoading,
                                 username,
                             }) => {
    const {enqueueSnackbar} = useSnackbar();
    const [error, setError] = useState({});
    const {newPass, confirmPass, currPass} = error;
    const classes = useStyles();

    const [current, setCurrent] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, serConfirmPassword] = useState("");

    const changeCurrentPass = (e) => setCurrent(e.target.value);
    const changeNewPassword = (e) => setNewPassword(e.target.value);
    const changeConfirmPassword = (e) => serConfirmPassword(e.target.value);

    const changePassword = () => {
        if (validate()) {
            onLoading()
            UserService.changePassword(username, current, newPassword, confirmPassword)
                .then((r) => {
                    if (r.status === 200) {
                        enqueueSnackbar("Password updated.", {variant: "success"});
                        toggleModal();
                    } else enqueueSnackbar(r.data.message, {variant: "warning"});
                    offLoading();
                })
                .catch((r) => enqueueSnackbar(r, {variant: "success"}))
        }
    }

    const validate = () => {
        let isValid = true;
        if (current === ""){
            setError((r) => ({...r, currPass: "This field is required"}));
            isValid = false;
        } else
        if (newPassword !== confirmPassword) {
            setError((r) => ({...r, confirmPass: "Password do not match"}));
            isValid = false;
        } else if (
            !RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(newPassword)
        ) {
            setError((r) => ({
                ...r,
                newPass: "Password must be six characters and contain at least lowercase character, uppercase character, numeric character."
            }));
            isValid = false;
        } else {
            setError("");
        }

        return isValid;
    };

    isShowing
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");

    return isShowing
        ? createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} style={{padding: 20}} ref={modalRef}>
                    <Grid container spacing={3} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"body2"}  style={{fontWeight:"bold", textAlign:"center"}}>CHANGE PASSWORD</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                id={"password"}
                                value={current}
                                title={"Current Password"}
                                fullWidth={true}
                                required={true}
                                helperText={currPass}
                                handleChange={changeCurrentPass}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                id={"password-new"}
                                value={newPassword}
                                title={"New Password"}
                                fullWidth={true}
                                required={true}
                                handleChange={changeNewPassword}
                                helperText={newPass}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                id={"password-confirm"}
                                value={confirmPassword}
                                title={"Confirm Password"}
                                fullWidth={true}
                                required={true}
                                helperText={confirmPass}
                                handleChange={changeConfirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12} container justifyContent={"space-evenly"} >
                            <Button variant={"outlined"} color={"primary"} onClick={changePassword}>
                                Update
                            </Button>
                            <Button variant={"outlined"} color={"secondary"} onClick={toggleModal}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>, document.body
        ) : null
}
export default ChangePasswordModal;