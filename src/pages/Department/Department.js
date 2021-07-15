import DepContext from "./depContext";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/DepartmentStyle"
import DepList from "./components/DepList";
import DepEdit from "./components/DepEdit";
const {useState} = require("react");

const Department = () => {
    const classes = useStyles();
    const [active, setActive] = useState("list");


    const [depId, setDepId] = useState("");
    const loadDepId = (value) => {
        setDepId(value);
    }

    const switchToList = () => {
        setTimeout(() => {
            setActive("list");
        }, 600);
    };

    const switchToEdit = (val) => {
        loadDepId(val)
        setTimeout(() => {
            setActive("edit");
        }, 600);
    };

    const contextValue = {switchToEdit, switchToList}

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
                        {active === "edit" && <DepEdit value={depId}/>}
                    </Grid>
                </Grid>
            </div>
        </DepContext.Provider>
    )
}

export default Department;