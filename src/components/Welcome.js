import React, { Component } from "react";
import { AppData } from "../data";

class Welcome extends Component {
  buttonHandler() {
    this.props.transitionState({ type: "SUBMIT" });
  }

  render() {
    return (
      <AppData.Consumer>
        {state => (
          <div>
            <h1>Welcome</h1>
            <p>{state.payload.userId}</p>
            <button type="button" onClick={this.buttonHandler.bind(this)}>
              Continue
            </button>
          </div>
        )}
      </AppData.Consumer>
    );
  }
}
export default Welcome;
