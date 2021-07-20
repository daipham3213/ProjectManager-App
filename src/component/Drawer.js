import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import DomainIcon from '@material-ui/icons/Domain';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TimelineIcon from '@material-ui/icons/Timeline';
import BugReportIcon from '@material-ui/icons/BugReport';
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationBar from "./NavigationBar";
import {useTheme } from '@material-ui/core/styles';
import useStyles from './styles/drawerStyles';
import {useContext, useState} from "react";
import ContextProvider from "./ContextProvider";

const MiniDrawer = ({contents}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const {switchToListDep, switchToListPro, switchToListRp} = useContext(ContextProvider);

    const moveDepartment = () => {
        switchToListDep()
    }
    const moveProject = () => {
        switchToListPro()
    }
    const moveReport = () => {
        switchToListRp();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavigationBar
                position="fixed"
                className={clsx(classes.appBar, {[classes.appBarShift]: open,})}
                toggleDrawer={handleDrawerOpen}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </NavigationBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} onClick={handleDrawerClose}>
                    <Typography variant="overline" noWrap>
                        Navigation
                    </Typography>
                    <IconButton >
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="Department" onClick={switchToListDep}>
                        <ListItemIcon><DomainIcon/></ListItemIcon>
                        <ListItemText primary="Department" />
                    </ListItem>
                    <ListItem button key="Group">
                        <ListItemIcon><PeopleOutlineIcon/></ListItemIcon>
                        <ListItemText primary="Group" />
                    </ListItem>
                    <ListItem button key="Project" onClick={switchToListPro}>
                        <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                        <ListItemText primary="Project" />
                    </ListItem>
                    <ListItem button key="Report" onClick={switchToListRp}>
                        <ListItemIcon><AssessmentIcon/></ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                    <ListItem button key="Phase">
                        <ListItemIcon><TimelineIcon/></ListItemIcon>
                        <ListItemText primary="Phase" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Report Bug">
                        <ListItemIcon><BugReportIcon/></ListItemIcon>
                        <ListItemText primary="Report Bug" />
                    </ListItem>
                    {open? <>
                        <ListItem>
                            <Typography variant="overline">
                                By Nhóm 12
                            </Typography>
                        </ListItem>
                    </>:null
                    }
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {contents()}
            </main>
        </div>
    );
}

export default MiniDrawer;