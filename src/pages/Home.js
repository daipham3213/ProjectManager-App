import {
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import Linker from "../component/Linker";
import {AccountTree, Assessment, Domain, PeopleOutline} from "@material-ui/icons";
import Tooltips from "../component/ToolTips";
import Avatar from "@material-ui/core/Avatar";
import {useEffect, useState} from "react";
import {UserService} from "../services/services";
import TaskServices from "../services/task.service";
import GanttChart from "../component/Gantt";
import {useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        width: "100%",
        height: "100%",

    },
    container: {
        minHeight: 450,
    },
    topBtn: {
        margin: 15,
        padding: 10,
        "&:hover": {
            background: "#d4d6d5",
        },
    },

    listInfo: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin: "0 5px 5px 200px",
    }
}))

const defaultAvatar = "https://res.cloudinary.com/projectmngapi/image/upload/v1626178367/6542357_preview_jysfir.png";

const Home = () => {
    const classes = useStyles();

    const [mount, setMount] = useState(false);

    const [profile, setProfile] = useState({});
    const [tasks, setTask] = useState([]);

    const {avatarUrl, email, groupName, groupType, name, phoneNumber, username} = profile;
    const toggleMount = () => setMount(!mount);

    useEffect(() => {
        document.title = "Project Manager"
        UserService.getProfile(localStorage.getItem("username"))
            .then((r) => {
                if (r.status === 200)
                    setProfile(r.data);
                else console.log(r.data.message);
            })
            .catch((r) => console.log(r));
        TaskServices.getListByUser()
            .then((r) => {
                if (r.status === 200)
                    setTask(r.data);
                else console.log(r.data.message);
            })
            .catch((r) => console.log(r));
    }, [mount,setMount]);

    return (
        <div className={classes.root}>
            <Grid container spacing={4} justify={"flex-start"}>
                {/*Icons container*/}
                <Grid container item justify={"center"} spacing={3} xs={12} style={{marginBottom:20}}>
                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <Domain fontSize={"large"}/>
                            )} to={"/department"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to department list"}/>
                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <PeopleOutline fontSize={"large"}/>
                            )} to={"/group"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to your department/group"}/>

                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <AccountTree fontSize={"large"}/>
                            )} to={"/project"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to projects list"}/>

                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <Assessment fontSize={"large"}/>
                            )} to={"/report"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to reports list"}/>
                </Grid>
                {/*  End icon container  */}

                <Grid container spacing={2}>
                    {/*Info container*/}
                    <Grid container item xs={3}>
                        <Grid item xs={12}>
                            <Paper style={{padding: 10, width: "100%"}}>
                                <List className={classes.listInfo}
                                      subheader={
                                          <ListSubheader component="div" id="nested-list-subheader"
                                                         style={{alignItems: "flex-end"}}>
                                              <Avatar alt={username}
                                                      src={avatarUrl === null ? defaultAvatar : avatarUrl}
                                                      className={classes.avatar}/>
                                          </ListSubheader>
                                      }
                                >
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                R
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Name"
                                                      secondary={name === null ? "No information" : name}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                R
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Email"
                                                      secondary={email === null ? "No information" : email}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                R
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Phone"
                                                      secondary={phoneNumber === null ? "No information" : phoneNumber}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                R
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Group"
                                                      secondary={groupName === null ? "No information" : groupName}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                R
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Type"
                                                      secondary={groupType === null ? "No information" : groupType}/>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/*  Gantt  */}
                    <Grid container item xs={9} justify={"center"}>
                        <Paper style={{width: "100%"}}>
                            <Grid item xs={12}>
                                <Typography variant={"h6"} align={"center"} style={{padding:20}}>Upcoming tasks</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {tasks.length > 0 ? <GanttChart id={username} data={tasks} toggleMount={toggleMount}/> :
                                    <Typography children={"No value"} align={"center"}/>}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;