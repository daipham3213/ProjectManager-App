import React, {useState} from "react";
import {GroupService, RequestService} from "../services/services";
import {Grid, Grow, List, ListItem, ListItemIcon, ListItemText, Paper, Popper} from "@material-ui/core";
import {CheckOutlined, HighlightOffOutlined} from "@material-ui/icons";
import moment from "moment";
import {useSnackbar} from "notistack";



const Notification = ({setOpen, open, anchorRef, setCount}) => {
    const [request, setRequest] = useState([]);
    const [mount, setMount] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const loadRequest = (r) => setRequest(r);
    const toggleMount = () => setMount(!mount);

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleClickOutside = (event) => {
        if (anchorRef.current && !anchorRef.current.contains(event.target)) {
            setOpen(false);
            document.body.style.overflow = "auto";
        }
    };
    const prevOpen = React.useRef(open);

    // const fetchGroup = (id) => {
    //     GroupService.getDetail(id)
    //         .then((r) => {
    //             if (r.status === 200)
    //                 setGroup(r.data);
    //             else enqueueSnackbar(r.data.message, {variant:"warning"});
    //         })
    //         .catch(r => enqueueSnackbar(r, {variant:"error"}))
    //     return group;
    // }
    React.useEffect(() => {
        RequestService.getRequests()
            .then((r) => {
                if (r.status === 200) {
                    loadRequest(r.data);
                    setCount(r.data.length);
                }
            })
            .catch((r) => {
                console.log(r)
            });

        document.addEventListener("keydown", handleListKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        return () => {
            document.removeEventListener("keydown", handleListKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [open, mount, setMount]);


    function handleRequest(id, choice) {
        RequestService.activeGroup(id, choice)
            .then((r) => {
                if (r.status === 200) {
                    enqueueSnackbar(r.data.message, {variant: "success"});
                    toggleMount();
                }
                else enqueueSnackbar(r.data.message, {variant:"warning"})
            })
            .catch((r) =>enqueueSnackbar(r, {variant:"error"}))
        toggleMount();
    }

    return (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 1}}>
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom'}}
                >
                    <Paper style={{width: 400, height: "fit-content", margin: "20px 60px 0 0", zIndex: 1}}>
                        <Grid item container xs={12} justifyContent={"flex-start"}>
                            <List style={{width: "100%"}}>
                                {request.length === 0 ? <ListItem><ListItemText primary={"No request"}/></ListItem> : null}
                                {request.map((rq) => {
                                    const {id, name , remark, isAccepted, isDenied, dateCreated} = rq;
                                    return (
                                        <ListItem key={id}>
                                            <ListItemText primary={name} secondary={remark +" - "+ moment(dateCreated).format("DD/MM/YYYY")}/>
                                            {isAccepted && isDenied? null :
                                                <>
                                                    <ListItemIcon
                                                        children={<CheckOutlined color={"primary"}/>}
                                                        onClick= {() => handleRequest(id,true)}
                                                    />
                                                    <ListItemIcon
                                                        children={<HighlightOffOutlined color={"secondary"}/>}
                                                        onClick= {() => handleRequest(id,false)}
                                                    />
                                                </>
                                            }

                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default Notification;