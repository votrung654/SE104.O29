import React, {useEffect, useState} from "react";
import DatabaseWrapper from "./style";
import {Button, Select} from "antd";
import MsSQL from './Form/mssql'
import MySQL from './Form/mysql'
import Sqlite from './Form/sqlite'

const {Option} = Select;
const sqls = {
    MYSQL: MySQL,
    MSSQL: MsSQL,
    SQLITE: Sqlite
}

export default function (props) {
    const [sql, setSQL] = useState("MYSQL");
    const [/*error,*/, setError] = useState(0);
    const [data, setData] = useState();

    const SqlForm = sqls[sql];

    useEffect(() => {
        setData({});
    }, [sql])

    const onSubmit = () => {
        if (!data || !data.db_name || !data.password || (data.db_server !== 'SQLITE' && !data.username)) {
            setError(1);
            return;
        }

        props.onNext(props.step + 1);
    }


    return (
        <DatabaseWrapper>
            <div className="page-container">
                <label>
                    Below you should enter your connection details. If you're not sure about these, contact your system admin.
                </label>
                <div className="st-form">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label>Database server</label>
                                </th>
                                <th className="st-input">
                                    <Select className="db-selector" defaultValue="MYSQL" onChange={(value) => setSQL(value)}>
                                        <Option value="MYSQL">MySQL</Option>
                                        <Option value="MSSQL">SQL Server</Option>
                                        <Option value="SQLITE">Sqlite</Option>
                                    </Select>
                                </th>
                                <th>
                                </th>
                            </tr>
                            <SqlForm onChange={(value) => setData(value)}/>
                        </tbody>
                    </table>
                    <div className="st-controller">
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </DatabaseWrapper>
    )
}
