import React from 'react';
import LoaderWrapper from "./style";
import * as legoAnimation from "../../../Assets/lotties/410-lego-loader";
import * as doneAnimation from "../../../Assets/lotties/433-checked-done";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";


const legoConfig = {
    loop: true,
    autoplay: true,
    animationData: legoAnimation.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}
const successConfig = {
    loop: true,
    autoplay: true,
    animationData: doneAnimation.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

export default function (props) {
    return (
        <LoaderWrapper>
            <FadeIn>
                <Lottie options={props.done ? successConfig : legoConfig} height={400} width={400} />
            </FadeIn>
        </LoaderWrapper>
    )
}