import Grid from "@material-ui/core/Grid";
import useStyles from "../component/styles/HomeStyle";
import DepList from "./Department/DepList";
import DepEdit from "./Department/DepEdit";
import ContextProvider from "../component/ContextProvider";
import ProjectList from "./Project/ProjectList";
import ProjectEdit from "./Project/ProjectEdit";
import AppBar from "../AppBar";
import React from "react";
import ReportList from "./Report/ReportList";
import ReportEdit from "./Report/ReportEdit";

const {useState} = require("react");

const Home = () => {
    const classes = useStyles();
    const [active, setActive] = useState("listDep");
    const [projectId, setProjectId] = useState("");
    const [depId, setDepId] = useState("");
    const [reportId, setReportId] = useState("");

    const loadProjectId = (value) => {
        setProjectId(value);
    }
    const loadReportId = (val) => {
        setReportId(val);
    }
    const loadDepId = (value) => {
        setDepId(value);
    }

    const switchToListDep = () => {
        setTimeout(() => {
            setActive("listDep");
        }, 600);
    };

    const switchToEditDep = (val) => {
        loadDepId(val)
        setTimeout(() => {
            setActive("editDep");
        }, 600);
    };

    const switchToListPro = () => {
        setTimeout(() => {
            setActive("listPrj");
        }, 600);
    };

    const switchToEditPro = (val) => {
        loadProjectId(val)
        setTimeout(() => {
            setActive("editPrj");
        }, 600);
    };

    const switchToListRp = () => {
        setTimeout(() => {
            setActive("listRp");
        }, 600);
    };

    const switchToEditRp = (val) => {
        loadReportId(val)
        setTimeout(() => {
            setActive("editRp");
        }, 600);
    };
    const contextValue = {
        switchToListDep,
        switchToEditDep,
        switchToEditPro,
        switchToListPro,
        switchToListRp,
        switchToEditRp
    }

    return (
        <ContextProvider.Provider value={contextValue}>
            <div><AppBar/></div>
            <div>
                <Grid
                    container
                    justify="center"
                    spacing={0}
                    direction="column"
                    className={classes.container}
                    active={active}
                >
                    <Grid>
                        {active === "listDep" && <DepList/>}
                        {active === "editDep" && <DepEdit value={depId}/>}
                        {active === "listPrj" && <ProjectList/>}
                        {active === "editPrj" && <ProjectEdit value={projectId}/>}
                        {active === "listRp" && <ReportList/>}
                        {active === "editRp" && <ReportEdit value={reportId}/>}
                    </Grid>
                </Grid>
            </div>
        </ContextProvider.Provider>
    )
}

export default Home;