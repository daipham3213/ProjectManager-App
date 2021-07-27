import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext";
import {Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import {UserService} from "../../../services/services";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        alignItem: "center",
        textAlign: "center",
        opacity: 0.9,
        padding: 20,
    }
}))

const AccountActivation = ({username}) => {
    const classes = useStyles();
    const [timer, setTimer] = useState(0);

    const sendEmail = () => {
        if(timer === 0)
            UserService.sendActivationEmail(username)
                .then((r) => {
                    if (r.status === 200)
                        alert("Email sent.")
                    else alert("Some thing went wrong.");
                },)
                .catch((r) => console.log(r));
    }

    const handleClick = () => {
        sendEmail();
        setTimer(30);
    }

    useEffect(() => {
        let timeInterval = setInterval(() => {
            if (timer>0)
                setTimer(timer-1);
        },1000);
        return ()=> {
            clearInterval(timeInterval);
        };
    })

    const {switchToSignin} = useContext(AuthContext);
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={
                        <Typography component="h1" variant="h5" color={"primary"}>
                            Account Created Successfully
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography component="p" variant="body2" gutterBottom style={{fontWeight:"bold"}}>
                        Please check your email INBOX or SPAM to activate your account before login.
                    </Typography>
                    <Typography component="p" variant="body2" gutterBottom style={{fontWeight:"bold", marginTop:30}}>
                        Haven't received "Activation Email"?
                    </Typography>
                    <Button variant={"outlined"} color={"secondary"} onClick={handleClick}>
                        {timer===0 ? "Resend Email" : timer}
                    </Button>
                </CardContent>
                <CardActions>
                    <Button onClick={() =>switchToSignin()}>
                            Click here to switch to login page.
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
export default AccountActivation;