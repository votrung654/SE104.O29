import React, {useState} from "react";
import {Button, Input} from "antd";
import DatabaseWrapper from "../Database/style";
import SystemWrapper from "./style";

export default function (props) {
    const [error, setError] = useState(0);
    const [schoolName, setSchoolName] = useState();
    const [port, setPort] = useState();

    const onSubmit = () => {
        if (!schoolName || !port) {
            setError(1);
            return;
        }

        props.onNext(props.step + 1);
    }

    return (
        <DatabaseWrapper>
            <SystemWrapper className="page-container">
                <label>
                    Please provide the following information. Don't worry, you can always change these settings later.
                </label>
                <div className="st-form">
                    <table>
                        <tbody>
                            <tr>
                                <th className="st-label">
                                    School name
                                </th>
                                <th className="st-input-info">
                                    <Input value={schoolName} onChange={(evt) => setSchoolName(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    Your school name.
                                </th>
                            </tr>
                            <tr>
                                <th className="st-label">
                                    System port
                                </th>
                                <th className="st-input-info">
                                    <Input value={port} onChange={(evt) => setPort(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    This port will be used to access to your app.
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="st-controller">
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </SystemWrapper>
        </DatabaseWrapper>
    )
}
