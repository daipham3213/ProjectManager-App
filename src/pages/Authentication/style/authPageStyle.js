import {makeStyles} from "@material-ui/core";
import url from "url";

export default makeStyles((themes) =>({
    root: {
        height: "100%"
    },
    background: {
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "images/background.jpg",
        backgroundColor:"#fff"
    },
    container: {
        alignItems: "flex-end",
        minHeight: "100vh",
        paddingRight: "150px",
        [themes.breakpoints.down("md")]: {
            alignItems: "center",
            paddingRight: 0,
        },
        "&[active='signup']": {
            alignItems: "center",
            paddingRight: "0px",
        },
    },
}))