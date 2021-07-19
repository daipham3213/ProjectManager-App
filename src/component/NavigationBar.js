import React, {useRef} from 'react';
import {useStyles} from './styles/navibarStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {ClickAwayListener, Grow, MenuList, Paper, Popper} from "@material-ui/core";
import {AppBarProps} from "@material-ui/core/AppBar/AppBar";

export default function NavigationBar(props: AppBarProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openNotify, setOpenNotify] = React.useState(false);
    const anchorRef = useRef(null);
    const anchorRefN = useRef(null);
    const AppName = () =>{
        return process.env.app_name;
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggleN = () => {
        setOpenNotify((prevOpen) => !prevOpen);
    };

    const handleCloseN = (event) => {
        if (anchorRefN.current && anchorRefN.current.contains(event.target)) {
            return;
        }
        setOpenNotify(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const prevOpenN = React.useRef(openNotify);
    React.useEffect(() => {
        if (prevOpenN.current === true && openNotify === false) {
            anchorRefN.current.focus();
        }
        prevOpen.current = openNotify;
    }, [openNotify]);

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const renderMenu = (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    const renderRequest = (
        <Popper open={openNotify} anchorEl={anchorRefN.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
                >
                    <Paper >
                        <ClickAwayListener onClickAway={handleCloseN}>
                            <MenuList autoFocusItem={open} id="menu-notify-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )

    return (
        <div className={classes.grow}>
            <AppBar position={props.position} className={props.className}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {AppName}
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications"
                                    color="inherit"
                                    ref={anchorRefN}
                                    aria-controls={openNotify ? 'menu-notify-grow' : undefined}
                                    onClick={handleToggleN}
                                    style={{marginRight:30}}
                        >
                            <Badge badgeContent={17}  color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            ref={anchorRef}
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderRequest}
        </div>
    );
}
