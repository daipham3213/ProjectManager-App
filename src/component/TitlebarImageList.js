import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import moment from "moment";
import ImageCard from "./ImageCard";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: "fit-content",
        minHeight: 250,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function TitlebarImageList({images = [], id = "title-bar-image-list", modalRef}) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({});

    const toggle = (value) => {
        if (value !== true && value!== false) setShow(!show)
        else setShow(value);
    };

    const handleImageClick = (item) => {
        setImage(item);
        toggle()
    }

    const imageList = () => {
        if (images.length>0)
            return (
                images.map((item) =>
                    <ImageListItem key={item.id} onClick={() => handleImageClick(item)}>
                        <img src={item.path} alt={item.userId}/>
                        <ImageListItemBar
                            subtitle={<span>Uploaded: {moment(item.uploadTime).format("DD/MM/YYYY")}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.id}`} className={classes.icon}>
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))
        return (
            <ImageListItem>
                <Typography  variant={"overline"}  style={{textAlign:"center"}} > No image </Typography>
            </ImageListItem>
        )
    }
    return (
        <div className={classes.root} id={id}>
            <ImageCard
                modalRef={modalRef}
                show={show}
                toggle={toggle}
                image={image}
            />
            <ImageList rowHeight={180} className={classes.imageList}>
                <ImageListItem key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader component="div">Avatars List</ListSubheader>
                </ImageListItem>
                {imageList()}
            </ImageList>
        </div>
    );
}
