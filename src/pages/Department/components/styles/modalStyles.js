import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default makeStyles(() => ({
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
    root: {
        position: "fixed",
        top: "50vh",
        left: "50%",
        width: "inherit",
        padding: "10px",
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    option: {
        borderTop: "1px solid #d9d9d9",
        width: "100%",
        textAlign: "center",
        padding: "15px 0",
        fontSize: 14,
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        flex: "1.1 0 0px",
    },
    icon: {
        marginRight: 10,
    },
    checkIcon: {
        fontSize: 14,
        marginLeft: 5,
        color: green[500],
    },
    userList: {
        width: "600px",
        height: "400px",
        margin: "5px",
    },
    createDep: {
        width: "500px",
        height: "fit-content",
        padding: "0 0 20px 20px",
        margin: "5px",
    }
}));
