import React from 'react'
import {Button as MuiButton, makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme =>({
    root:{
        margin: theme.spacing(0.5)
    },
    label:{
        TextTransfrom:'none'
    }
}))
export default function Buttons (props){
    const {text,size, color, variant , onClick, ...other}= props
    const classes= useStyles();
    return (
        <MuiButton 
            variant={variant || "contained"}
            size={size || "large"}
            onclick={onClick}
            {...other}
            classes={{ root: classes.root, label:classes.label}}>
                {text}

        </MuiButton>

    );
}