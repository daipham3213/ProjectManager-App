import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/ProjectStyles"
import ProjectContext from "./projectContext";
import ProjectEdit from "./components/ProjectEdit";
import ProjectList from "./components/ProjectList";
import {useState} from "react";

const Project = () => {
    const classes = useStyles();
    const [active, setActive] = useState("list");


    const [projectId, setProjectId] = useState("");
    const loadProjectId = (value) => {
        setProjectId(value);
    }

    const switchToList = () => {
        setTimeout(() => {
            setActive("list");
        }, 600);
    };

    const switchToEdit = (val) => {
        loadProjectId(val)
        setTimeout(() => {
            setActive("edit");
        }, 600);
    };

    const contextValue = {switchToEdit, switchToList}

    return (
        <ProjectContext.Provider value={contextValue}>
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
                        {active === "list" && <ProjectList />}
                        {active === "edit" && <ProjectEdit value={projectId}/>}
                    </Grid>
                </Grid>
            </div>
        </ProjectContext.Provider>
    )
}

export default Project;