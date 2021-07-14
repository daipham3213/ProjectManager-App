import {makeStyles} from "@material-ui/core";

export default makeStyles((themes) =>({
    root: {
        height: "100%"
    },
    background: {
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
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