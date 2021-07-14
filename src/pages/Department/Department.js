import DepContext from "./depContext";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/DepartmentStyle"
import DepList from "./components/DepList";
import DepEdit from "./components/DepEdit";
import {DepCreateModal} from "./components/DepCreateModal";
import {AppBar} from "@material-ui/core";
const {useState} = require("react");


const Department = () => {
    const classes = useStyles();
    const [active, setActive] = useState("list");

    const switchToList = () => {
        setTimeout(() => {
            setActive("list");
        }, 600);
    };

    const switchToEdit = () => {
        setTimeout(() => {
            setActive("edit");
        }, 600);
    };

    const switchToCreate = () => {
        setTimeout(() => {
            setActive("create");
        }, 600);
    };

    const contextValue = {switchToEdit, switchToCreate, switchToList}

    return (
        <DepContext.Provider value={contextValue}>
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
                        {active === "list" && <DepList />}
                        {active === "edit" && <DepEdit />}
                        {active === "create" && <DepCreateModal />}
                    </Grid>
                </Grid>
            </div>
        </DepContext.Provider>
    )
}

export default Department;