import React from "react";

export const AppData = React.createContext({
  state: "CONFIRM_USER_DETAILS",
  nextState: "",
  payload: {},
  getNextState: () => {}
});
