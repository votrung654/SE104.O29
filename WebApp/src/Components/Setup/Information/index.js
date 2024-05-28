import React, {useState} from "react";
import {Button, Input} from "antd";
import DatabaseWrapper from "../Database/style";
import InformationWrapper from "./style";
import FadeIn from "react-fade-in";

export default function (props) {
    const [error, setError] = useState(0);
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const onSubmit = () => {
        if (!name || !username || !password || !email) {
            setError(1);
            return;
        }

        props.onNext(props.step + 1);
    }

    return (
        <DatabaseWrapper>
            <FadeIn>
                <InformationWrapper className="page-container">
                    <label>
                        Please provide the following information. Don't worry, you can always change these settings later.
                    </label>
                    <div className="st-form">
                        <table>
                            <tbody>
                            <tr>
                                <th className="st-label">
                                    Your name
                                </th>
                                <th className="st-input-info">
                                    <Input value={name} onChange={(evt) => setName(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    Your full name.
                                </th>
                            </tr>
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
                                    <b>Important:</b> You will need this password to login. Please store it in the secure location.
                                </th>
                            </tr>
                            <tr>
                                <th className="st-label">
                                    Your email
                                </th>
                                <th className="st-input-info">
                                    <Input value={email} onChange={(evt) => setEmail(evt.target.value)} />
                                </th>
                                <th className="st-description">
                                    Please check your email address before continuing.
                                </th>
                            </tr>
                            </tbody>
                        </table>
                        <div className="st-controller">
                            <Button onClick={onSubmit}>Submit</Button>
                        </div>
                    </div>
                </InformationWrapper>
            </FadeIn>
        </DatabaseWrapper>
    )
}
