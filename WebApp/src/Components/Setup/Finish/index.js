import React, {useState} from "react";
import {Button, Input} from "antd";
import DatabaseWrapper from "../Database/style";
import FinishWrapper from "./style";
import FadeIn from "react-fade-in";

export default function (props) {
    const [error, setError] = useState(0);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onSubmit = () => {

    }

    return (
        <DatabaseWrapper>
            <FadeIn>
                <FinishWrapper className="page-container">
                    <label>
                        This is small tool to check your login information. Just enter your username and password to the form then click Check button.
                    </label>
                    <div className="st-form">
                        <table>
                            <tbody>
                            <tr>
                                <th className="st-label">
                                    Username
                                </th>
                                <th className="st-input-info">
                                    <Input value={username} onChange={(evt) => setUsername(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    Your login username.
                                </th>
                            </tr>
                            <tr>
                                <th className="st-label">
                                    Password
                                </th>
                                <th className="st-input-info">
                                    <Input.Password value={password} onChange={(evt) => setPassword(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    The password which you've entered in the previous step.
                                </th>
                            </tr>
                            </tbody>
                        </table>
                        <div className="st-controller-finish">
                            <Button onClick={onSubmit}>Check</Button>
                            <Button onClick={onSubmit}>Submit</Button>
                        </div>
                    </div>
                </FinishWrapper>
            </FadeIn>
        </DatabaseWrapper>
    )
}
