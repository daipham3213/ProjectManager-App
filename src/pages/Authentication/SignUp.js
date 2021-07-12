import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import {AuthService} from "../../services/services";

export default function SignUp() {
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [phoneNumber,setphoneNumber]=useState("");
    const [error, setError] = useState({});


    //------hàm sự kiệm lấy dữ liệu------------------
    const changeEmail = (e) => {
        setemail(e.target.value);
    };

    const changeUsername = (e) => {
        setusername(e.target.value);
    };

    const changeName = (e) => {
        setname(e.target.value);
    };

    const changePhone = (e) => {
        setphoneNumber(e.target.value);
    };

    const changePassword = (e) => {
        setpassword(e.target.value);
    };
    //------------------------


    //------hàm kiểm tra SignUP------------------
    const validate = () => {
        let isError = false;
        if (!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
            setError((prevError) => ({ ...prevError, email: "Invalid email." }));
            isError = true;
        } else {
            setError((prevError) => ({ ...prevError, email: "" }));
        }

        if (email === "") {
            setError((prevError) => ({ ...prevError, email: "Email is required." }));
            isError = true;
        }

        if (username === "") {
            setError((prevError) => ({
                ...prevError,
                firstname: "Firstname is required.",
            }));
            isError = true;
        }
        if (username !== "") {
            setError((prevError) => ({
                ...prevError,
                firstname: "",
            }));
        }
        if (name === "") {
            setError((prevError) => ({
                ...prevError,
                lastname: "Lastname is required.",
            }));
            isError = true;
        }
        if (name !== "") {
            setError((prevError) => ({
                ...prevError,
                lastname: "",
            }));
        }
        if (username === "") {
            setError((prevError) => ({
                ...prevError,
                username: "Username is required.",
            }));
            isError = true;
        }

        if (username !== "") {
            if (username.length < 6) {
                setError((prevError) => ({
                    ...prevError,
                    username: "Username cant be less than 6 characters.",
                }));
                isError = true;
            } else
                setError((prevError) => ({
                    ...prevError,
                    username: "",
                }));
        }
        if (!RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(password)) {
            setError((prevError) => ({
                ...prevError,
                password:
                    "Password must be six charaters and contain at least lowercase character, uppercase character, numeric character.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                password: "",
            }));
        }
        if (password === "") {
            setError((prevError) => ({
                ...prevError,
                password: "Password is required.",
            }));
            isError = true;
        }

        return isError;
    };
    //----------------------------------


    //------hàm gọi Sự kiện SignUP------------------

    const signup = (e) => {
        e.preventDefault();
        if (!validate()) {
                AuthService.register(username, password, email, name, phoneNumber).then((response) => {
                if (response.status === 200) {
                    alert("Đăng ký thành công");
                } else {
                    setError((prevError) => ({
                        ...prevError,
                        email: response.data.emailError,
                        username: response.data.usernameError,
                    }));
                }
            });
        }
        ;
    }
    //----------------------------------

    }
    const classes = useStyles();
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


    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="UserName"
                                variant="outlined"
                                required
                                fullWidth
                                id="UserName"
                                label="UserName"
                                autoFocus
                                onChange={changeUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={changeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                onChange={changeName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="PhoneNumber"
                                autoComplete="Phone Number"
                                onChange={changePhone}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={signup}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}