import React from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as maintenanceAnimation from "./Assets/lotties/12366-under-construction";

const maintenanceConfig = {
  loop: true,
  autoplay: true,
  animationData: maintenanceAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <FadeIn>
              <div className="align-items-center row">
                <Lottie options={maintenanceConfig} height={400} width={400} />
              </div>
              <h1>Website is under construction</h1>
            </FadeIn>
          </div>
      );
    }

    return this.props.children;
  }
}
