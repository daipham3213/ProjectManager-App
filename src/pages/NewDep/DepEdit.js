import React, {Component, useState} from 'react';
import "./DepEdit.css"
import {Link} from "react-router-dom";
import {GroupService} from "../../services/services";

export default function DepLoad() {
    const [depName, setDepName] = useState({});
    const [depLeader, setDepLeader] = useState({});
    const [member, setMember] = useState([]);

    const loadDep = (e) => {
        setDepName(e)
    }
    // eslint-disable-next-line no-restricted-globals
    let myParam = window.location.pathname.split("/");

    const loadMem = (e) => {
        setMember(e)
    }
    React.useEffect(() => {
        async function fetchData() {
            const result = await GroupService.getDetail(myParam[2]);
            loadDep(result.data);
            loadMem(result.data?.users);
            console.log(result.data.users);
            debugger;
        }
        fetchData().then(r => {
            console.log(r);
        });
    }, {});
    return (
        <div className="DepContainer">
            <div className="DepUpDate">
                <span className="DepUpdateTitle">Edit Department</span>
                <from className="DepUpdateFrom">
                    <div className="DepUpdateLeft">
                        <div className="DepUpdateItem">
                            <label>Department Name</label>
                            <input
                                type="text"
                                placeholder="Phòng FontEnd"
                                className="DepUpdateInput"
                                value={depName}
                            />
                        </div>
                        <div className="DepUpdateItem">
                            <label>Leader Name</label>
                            <input
                                type="text"
                                placeholder="Đô Lâm"
                                className="DepUpdateInput"
                                //value={dep.leader.name}
                            />
                        </div>
                        <button className="DepUpdateButton">Update</button>
                    </div>
                    <div className="DepUpdateRight">
                        {/*<div className="memList"*/}
                        {/*     style={{height: 400, width: '100%'}}>*/}
                        {/*    <DataGrid*/}
                        {/*        rows={data}*/}
                        {/*        disableSelectionOnClick*/}
                        {/*        columns={columns}*/}
                        {/*        pageSize={5}*/}
                        {/*        checkboxSelection />*/}
                        {/*</div>*/}
                    </div>
                </from>
            </div>
        </div>
    );
}

export class DepEdit extends Component {
    render() {
        return (
            <div classname="DepEdit">
                <div className="DepTitleContainer">
                    <Link to="/newDep">
                        <button className="DepAddButton">Create</button>
                    </Link>
                </div>
                <div>
                    <DepLoad/>
                </div>
            </div>
        )
    }
}