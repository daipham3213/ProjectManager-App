import {makeStyles} from "@material-ui/core";

export default makeStyles ((themes) => ({
    root: {
        padding: "10px 20px 20px 20px"
    },
    container: {
        height:"inherit",
    },
    formControl: {
        margin: themes.spacing(2),
        minWidth: 120,
        marginTop: 20,
    },
    reportList: {
        minHeight:500,
    },
}))