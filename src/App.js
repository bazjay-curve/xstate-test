import React from "react";
import "./App.css";
import { stateMachine } from "./machine";
import { AppData } from "./data";
import axios from "axios";
import { interpret } from "xstate";

import Welcome from "./components/Welcome";
import AddCard from "./components/AddCard";
import ThreeDS from "./components/ThreeDS";
import Ineligible from "./components/Ineligible";

class App extends React.Component {
  stateService;

  constructor(props) {
    super(props);
    this.state = {
      nextState: stateMachine.initialState.value
    };

    // axios.get("http://localhost:3001/state/reset").then(response => {
    //   const state = response.data.state;
    //   this.setState({ ...state });
    //   console.log(this.state);
    // });

    this.stateService = interpret(stateMachine).onTransition(state => {
      console.log(state);
    });

    this.stateService.start();

    this.getNextState();
  }

  // transition(event, data) {
  //   const nextAppState = stateMachine.transition(
  //     this.state.nextState,
  //     event.type
  //   );

  //   const nextState = nextAppState.actions.reduce(
  //     (state, action) => this.command(action, event) || state,
  //     undefined
  //   );
  //   this.setState({
  //     nextState: nextAppState.value,
  //     ...nextState
  //   });
  // }

  getNextState() {
    axios.get("http://localhost:3001/state").then(response => {
      const state = response.data.state;
      // this.setState({ ...state });

      this.stateService.send({ type: state.nextState, state });
      this.setState({ ...state });
    });
  }
  render() {
    return (
      <AppData.Provider value={this.state}>
        <header>
          <h1>State Test App</h1>
        </header>

        {this.state.nextState === "INITIAL" ? <div>Loading</div> : null}

        {this.state.nextState === "CONFIRM_USER_DETAILS" ? (
          <Welcome transitionState={this.getNextState.bind(this)} />
        ) : null}

        {this.state.nextState === "ADD_FUNDING_CARD" ? (
          <AddCard transitionState={this.getNextState.bind(this)} />
        ) : null}

        {this.state.nextState === "THREE_DS_VERIFICATION_PENDING" ? (
          <ThreeDS transitionState={this.getNextState.bind(this)} />
        ) : null}

        {this.state.nextState === "USER_NOT_ELIGIBLE" ? (
          <Ineligible transitionState={this.getNextState.bind(this)} />
        ) : null}
      </AppData.Provider>
    );
  }
}

export default App;
