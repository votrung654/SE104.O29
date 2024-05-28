import React, {useEffect, useState} from "react";
import {Input, InputNumber} from "antd";

export default function (props) {
    const [db, setDB] = useState();
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState(1433);
    const [prefix, setPrefix] = useState("qlhs_");

    useEffect(() => {
        if (props.onChange) {
            props.onChange({
                db_server: "MSSQL",
                db_name: db,
                username: user,
                password: pass,
                hostname: host,
                port: port,
                tb_prefix: prefix
            });
        }
    }, [db, user, pass, host, port, prefix, props])

    return (
        <>
            <tr>
                <th className="st-label">
                    Database
                </th>
                <th className="st-input">
                    <Input onChange={(evt) => setDB(evt.target.value)} value={db}/>
                </th>
                <th className="st-description">
                    The name of the database you want to use with QLHS.
                </th>
            </tr>
            <tr>
                <th className="st-label">
                    Username
                </th>
                <th className="st-input">
                    <Input onChange={(evt) => setUser(evt.target.value)} value={user}/>
                </th>
                <th className="st-description">
                    Your database username.
                </th>
            </tr>
            <tr>
                <th className="st-label">
                    Password
                </th>
                <th className="st-input">
                    <Input.Password onChange={(evt) => setPass(evt.target.value)} value={pass}/>
                </th>
                <th className="st-description">
                    Your database password.
                </th>
            </tr>
            <tr>
                <th className="st-label">
                    Hostname
                </th>
                <th className="st-input">
                    <Input onChange={(evt) => setHost(evt.target.value)} value={host}/>
                </th>
                <th className="st-description">
                    You should be able to get this info from your system administrator, if localhost doesn't work.
                </th>
            </tr>
            <tr>
                <th className="st-label">
                    Port
                </th>
                <th className="st-input">
                    <InputNumber onChange={(value) => setPort(value)} defaultValue={port}/>
                </th>
                <th className="st-description">
                    If you want to use custom port for your SQL Server, change this.
                </th>
            </tr>
            <tr>
                <th className="st-label">
                    Table prefix
                </th>
                <th className="st-input">
                    <Input onChange={(evt) => setPrefix(evt.target.value)} value={prefix}/>
                </th>
                <th className="st-description">
                    If you want to run multiple QLHS installation in a single database, change this.
                </th>
            </tr>
        </>
    )
}