import {useState} from "react";
import {ReportService} from "../../services/services";
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const ReportEdit = (reportId) => {
    const [report, setReport] = useState({});

    const loadReport = (value) => setReport(value);

    const fetchReport = async () => {
        await ReportService.getDetails(reportId)
            .then((r) => {
                if (r.status === 200) loadReport(r.data);
                else
                    console.log()
            })
            .catch(() => {console.log("Internal server error.")})
    }

    return (
        <Paper>
            <Grid container>

            </Grid>
        </Paper>
    );
}
export default ReportEdit;