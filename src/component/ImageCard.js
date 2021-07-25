import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {createPortal} from "react-dom";
import {AvatarService, UserService} from "../services/services";
import {useSnackbar} from "notistack";
import moment from "moment";
import {DeleteForever} from "@material-ui/icons";
import {useConfirm} from "material-ui-confirm";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: "50vh",
        left: "50%",
        width: "400px",
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 15,
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        opacity: 0.5,
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        "&.MuiCardMedia-img": {
            width: "100%",
            height: "100%",
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ImageCard({show, modalRef, toggle, image = {}}) {
    const classes = useStyles();
    const confirm = useConfirm()
    const {enqueueSnackbar} = useSnackbar();

    const [user, setUser] = useState({});
    const {name, avatarUrl, userName} = user;

    const handleDelete = () => {
        confirm({description: "Are you sure you want to delete this image? This action is permanent."})
            .then(() => {
                AvatarService.deleteAvatar(userName, image.id)
                    .then((r) => {
                        if (r.status === 200) {
                            enqueueSnackbar("Deleted", {variant: "success"});
                            toggle();
                        } else enqueueSnackbar(r.data.message, {variant: "warning"});
                    })
                    .catch((r) => enqueueSnackbar(r, {variant: "error"}))
            })
    }

    const handleSwitchAvatar = () => {
        if (!image.isMain)
            confirm({description: "Are you sure you want to switch this image to your main avatar? "})
                .then(() => {
                    AvatarService.switchMain(userName, image.id)
                        .then((r) => {
                            if (r.status === 200) {
                                enqueueSnackbar("Switched", {variant: "success"});
                                toggle();
                            } else enqueueSnackbar(r.data.message, {variant: "warning"});
                        })
                        .catch((r) => enqueueSnackbar(r, {variant: "error"}))
                })
        else enqueueSnackbar("This avatar is your main avatar. No need to switch.", {variant: "warning"});
    }

    useEffect(() => {
        UserService.getProfile(image.userId)
            .then((r) => {
                if (r.status === 200) {
                    setUser(r.data);
                }
            })
            .catch((reason) => enqueueSnackbar(reason, {variant: "error"}))
        const handleKeyPress = (event) => {
            if (event.key === "escape") {
                toggle();
                document.body.style.overflow = "auto";
            }
        }
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggle();
                document.body.style.overflow = "auto";
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [image]);


    show ? (document.body.style = "hidden") : (document.body.style = "overflow")
    return show ?
        createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Card className={classes.root} ref={modalRef}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label={"avatar"} className={classes.avatar} src={avatarUrl}/>
                        }
                        title={name}
                        subheader={moment(image.uploadTime).format("MMMM Do YYYY")}
                    />
                    <CardMedia
                        className={classes.media}
                        src={image.path}
                        component="img"
                        alt={image.id}
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={handleSwitchAvatar}>
                            <FavoriteIcon color={image.isMain ? "secondary" : "inherit"}/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteForever color={"secondary"}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
            , document.body
        ) : null;
}
