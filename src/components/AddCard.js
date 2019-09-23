import React, { Component } from "react";
import { AppData } from "../data";

class AddCard extends Component {
  render() {
    return (
      <AppData.Consumer>
        {state => (
          <div>
            <h1>Add a Card</h1>
            <p>{state.payload.cardNumber}</p>
          </div>
        )}
      </AppData.Consumer>
    );
  }
}

export default AddCard;
