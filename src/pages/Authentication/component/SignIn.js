import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from "./style/cardStyle";
import Container from '@material-ui/core/Container';
import {AuthService} from "../../../services/services";
import AuthContext from "../AuthContext";
import {Card} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn() {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [animate, setAnimate] = useState(0);
    const classes = useStyles();


//------hàm sự kiệm lấy dữ liệu------------------
    const changeUsername = (e) => {
        setusername(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };
    //------------------------

    //------hàm kiểm tra------------------

    const validate = () => {
        let isError = false;

        if (username === "") {
            setError((prevError) => ({
                ...prevError,
                username: "Username is required.",
            }));
            isError = true;
        }
        if (username !== "") {
            setError((prevError) => ({
                ...prevError,
                username: "",
            }));
        }
        if (password === "") {
            setError((prevError) => ({
                ...prevError,
                password: "Password is required.",
            }));
            isError = true;
        }
        if (password !== "") {
            setError((prevError) => ({
                ...prevError,
                password: "",
            }));
        }

        return isError;
    };
    //------------------------

//------hàm sự kiện đăng nhập------------------
    const login = () => {
        console.log("Logining");
        if (!validate()) {
            Login();
        }
    }
    const {switchToSignup} = useContext(AuthContext);

    async function Login() {
        console.log(username + "/" + password);
        await AuthService.login(username, password, true).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("roles", response.data.roleName);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("data", JSON.stringify(response.data));
                window.location = window.location.origin;
                console.log(response.data.role);

            } else {
                setError((prevError) => ({
                    ...prevError,
                    username: response.data.message,
                }));
                alert(response.data.message);
            }
        });
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            login();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Card className={classes.cardSignIn} animate={animate}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        autoComplete="email"
                        helperText={error.username}
                        className={classes.textField}
                        autoFocus
                        onChange={changeUsername}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        helperText={error.password}
                        autoComplete="current-password"
                        onChange={changePassword}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2"
                                  onClick={() => {
                                      switchToSignup();
                                      setAnimate(1);
                                  }}>
                                {"Don't have an account?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Card>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
