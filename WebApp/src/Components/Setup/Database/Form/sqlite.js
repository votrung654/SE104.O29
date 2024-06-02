import React, {useEffect, useState} from "react";
import {Input} from "antd";

export default function (props) {
    const [db, setDB] = useState();
    const [pass, setPass] = useState();
    const [prefix, setPrefix] = useState("qlhs_");

    useEffect(() => {
        if (props.onChange) {
            props.onChange({
                db_server: "SQLITE",
                db_name: db,
                password: pass,
                tb_prefix: prefix
            });
        }
    }, [db, pass, prefix, props])

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