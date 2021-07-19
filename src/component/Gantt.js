import {Chart} from 'react-google-charts';
import moment from "moment";
import FullscreenLoading from "./FullScreenLoading";

const columns = [
    {type: "string", label: "Task ID"},
    {type: "string", label: "Task Name"},
    {type: "string", label: "Description"},
    {type: "date", label: "Start Date"},
    {type: "date", label: "End Date"},
    {type: "number", label: "Duration"},
    {type: "number", label: "Percent Complete"},
    {type: "string", label: "Dependencies"}
];

const formatData = (data) => {
    let r = [];
    data.forEach(row => {
        let p_n = null;
        if (row.parentNId !== "00000000-0000-0000-0000-000000000000")
            p_n = row.parentNId;
        let start = convertToDateSTD(row.startDate);
        let end = convertToDateSTD(row.dueDate);

        //Adding new Records
        let temp = [row.id,row.name, row.remark === "" ? null : row.remark, start, end, daysToMilliseconds(row.duration), row.percent, p_n];
        r.push(temp);
    })
    return r;
}

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

function convertToDateSTD(string) {
    let year = moment(string).year();
    let month = moment(string).month();
    let day = moment(string).day();
    let hour = moment(string).hour();
    let min = moment(string).minute();
    let sec = moment(string).second();

    return new Date(year, month, day, hour, min, sec)
}



const GanttChart = ({data = []}) => {
    let records = formatData(data);
    let rowHeight = 45;

    let options = {
        height: ((data.length * rowHeight) + rowHeight),
        gantt: {
            chartArea: {
                width: '100%',
                height: '100%',
            },
            palette: [
                {
                    "color": "#3e77ca",
                    "dark": "#4cc9ac",
                    "light": "#3e77ca"
                }
            ],
            title: "Gantt Chart"
        }
    };
    return (
        <Chart
            loader={<div><FullscreenLoading/></div>}
            width={'100%'}
            height={'100%'}
            chartType="Gantt"
            data={[columns,...records]}
            options={options}
        />
    )
}
export default GanttChart;