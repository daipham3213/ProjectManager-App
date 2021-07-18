import React, {useContext} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import "./AppBar.css"
//--------------------
import clsx from 'clsx';
import "./SilderBar/StyleSlideBar.css"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Link, useHistory} from 'react-router-dom';
import {Employee} from "./pages/Employee";
import {Group} from './pages/Group';
import {Report} from './pages/Report';
import {Request} from './pages/Request';
import {Task} from './pages/Task';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SmsIcon from '@material-ui/icons/Sms';
import {AuthService} from "./services/services";
import ContextProvider from "./component/ContextProvider";
//-----------demo ---------------
const useStylesDemo = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
//------------end demo-----------

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let history = useHistory();

    const moveDepartment = () => {
        switchToListDep()
    }
    const moveProject = () => {
        switchToListPro()
    }
    const moveGroup = () => {
        history.push("/Group");

    }
    const moveRequest = () => {
        history.push("/Request");

    }
    const moveReport = () => {
        switchToListRp();
    }
    const moveTask = () => {
        history.push("/Task");

    }
    const moveEmployee = () => {
        history.push("/Employee");
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        AuthService.logout();
        window.location.reload(false);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const {
        switchToListDep,
        switchToListPro,
        switchToListRp
    } = useContext(ContextProvider)

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={"/myprofile/"}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <Link to={"/myaccount/"}>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    //---------------demo-----------------------------------------------------

    const classesDemo = useStylesDemo();
    const [state, setState] = React.useState({

        left: false,

    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };


    const list = (anchor) => (

        <div
            className={clsx(classesDemo.list, {
                [classesDemo.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem onClick={moveDepartment}>
                    <Button>
                        <ListItemIcon>{"Department" % 2 === 0 ? <MeetingRoomSharpIcon/> :
                            <MeetingRoomIcon/>}</ListItemIcon>
                        <ListItemText primary={"Department"}/>
                    </Button>
                </ListItem>

                <ListItem onClick={moveProject}>
                    <Button>
                        <ListItemIcon>{"Employee" % 2 === 0 ? <SupervisedUserCircleIcon/> :
                            <AccountBoxIcon/>}</ListItemIcon>
                        <ListItemText primary={"Project"}/>
                    </Button>
                </ListItem>


                <ListItem onClick={moveGroup}>
                    <Button>
                        <ListItemIcon>{"Group" % 2 === 0 ? <MeetingRoomSharpIcon/> :
                            <SupervisedUserCircleIcon/>}</ListItemIcon>
                        <ListItemText primary={"Group"}/>
                    </Button>
                </ListItem>


                <ListItem onClick={moveTask}>
                    <Button>
                        <ListItemIcon>{"Task" % 2 === 0 ? <MeetingRoomSharpIcon/> :
                            <ImportContactsIcon/>}</ListItemIcon>
                        <ListItemText primary={"Task"}/>
                    </Button>
                </ListItem>


                <ListItem onClick={moveRequest}>
                    <Button>
                        <ListItemIcon>{"Request" % 2 === 0 ? <MeetingRoomSharpIcon/> : < SmsIcon/>}</ListItemIcon>
                        <ListItemText primary={"Request"}/>
                    </Button>
                </ListItem>

                <ListItem onClick={moveReport}>
                    <Button>
                        <ListItemIcon>{"Report" % 2 === 0 ? <MeetingRoomSharpIcon/> : <ErrorIcon/>}</ListItemIcon>
                        <ListItemText primary={"Report"}/>
                    </Button>
                </ListItem>

                {/* -----------------Demo  */}SmsIcon
            </List>
            <Divider/>
            <List>
                {['HELP'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <ContactSupportIcon/> : <AccountBoxIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    /*const demo = () => {
      console.log("ok");
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    }*/
    return (
        <>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            // edge="start"
                            // className={classes.menuButton}
                            // color="inherit"
                            // aria-label="open drawer"
                        >
                            {/* <MenuIcon /> bỏ này hoặc lấy dưới. */}
                            {["III",].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                    >
                                        {list(anchor)}
                                    </SwipeableDrawer>
                                </React.Fragment>))}
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Project Manager
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        </>
    );

}
