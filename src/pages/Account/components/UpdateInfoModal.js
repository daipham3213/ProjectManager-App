import useStyles from "../../../component/styles/modalStyles";
import {useSnackbar} from "notistack";
import {InputLabel, Paper, TextField, Typography} from "@material-ui/core";
import * as ReactDOM from "react-dom";
import {UserService} from "../../../services/services";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";

const UpdateInfoModal = ({
                             modalRef,
                             toggle,
                             profile = {},
                             isShow,
                             onLoading,
                             offLoading,
                             setProfile,
                             username,
                         }) => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const changeName = (value) => setProfile((prev) => ({...prev, name:value.target.value}))
    const changeEmail = (value) => setProfile((prev) => ({...prev, email:value.target.value}))
    const changeBio = (value) => setProfile((prev) => ({...prev, bio:value.target.value}))
    const changePhone = (value) => setProfile((prev) => ({...prev, phoneNumber:value.target.value}))

    const updateInfo = () => {
        onLoading()
        UserService.updateProfile(username, profile.name, profile.bio, profile.email, profile.phoneNumber)
            .then((r) => {
                if (r.status === 200) {
                    enqueueSnackbar("Updated successfully", {variant: "success"});
                    toggle();
                } else enqueueSnackbar(r.data.message, {variant: "warning"});
                offLoading();
            }).catch((r) => enqueueSnackbar(r, {variant: "error"}))
    }

    isShow? (document.body.style.overflow="hidden") : (document.body.style.overflow="auto")

    return isShow ? ReactDOM.createPortal(
        <div>
            <div className={classes.modalOverlay}/>
            <Paper className={classes.root} ref={modalRef} style={{padding:20}}>
                <Grid container={12} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h6" variant="overline" style={{fontSize:21}}>
                            Update personal information
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            onChange={changeName}
                            label="Name"
                            variant="outlined"
                            required
                            fullWidth
                            value={profile.name??""}
                            id="name"
                            name="name"
                            autoFocus
                            InputLabelProps={{
                                shrink: profile.name !== null || profile.name !== "",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel variant={"outlined"}  title={"Email"} />
                        <TextField
                            type="text"
                            onChange={changeBio}
                            label="Bio"
                            variant="outlined"
                            required
                            fullWidth
                            value={profile.bio??""}
                            id="bio"
                            name="bio"
                            autoFocus
                            InputLabelProps={{
                                shrink: profile.bio !== null || profile.bio !== "",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            onChange={changeEmail}
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                            value={profile.email??""}
                            id="email"
                            name="email"
                            autoFocus
                            InputLabelProps={{
                                shrink: profile.email !== null || profile.email !== "",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="tel"
                            onChange={changePhone}
                            label="Phone Number"
                            variant="outlined"
                            required
                            fullWidth
                            value={profile.phoneNumber??""}
                            id="phoneNumber"
                            name="phoneNumber"
                            autoFocus
                            InputLabelProps={{
                                shrink: profile.phoneNumber !== null || profile.phoneNumber !== "",
                            }}
                        />
                    </Grid>
                    <Grid item container xs={12} justifyContent={"center"} alignItems={"center"} spacing={3}>
                        <Button variant={"outlined"} color={"primary"} onClick={updateInfo}>
                            Update
                        </Button>
                        <Button variant={"outlined"} color={"secondary"} onClick={toggle}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>, document.body
    ) : null
}
export default UpdateInfoModal;