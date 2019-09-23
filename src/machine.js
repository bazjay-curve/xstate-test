import { Machine } from "xstate";

const addWater = Object.assign({
  payload: (context, event) => event.state.payload
});

export const stateMachine = Machine({
  initial: "LOADING",
  context: {
    payload: {},
    errors: []
  },
  states: {
    LOADING: {},
    CONFIRM_USER_DETAILS: {
      on: {
        SUBMIT: "LOADING"
      }
    },
    ADD_FUNDING_CARD: {
      on: {
        SUBMIT: "THREE_DS_VERIFICATION_PENDING",
        FAIL: "USER_NOT_ELIGIBLE"
      }
    },
    THREE_DS_VERIFICATION_PENDING: {
      type: "final"
    },
    USER_NOT_ELIGIBLE: {
      onEntry: ["error"],
      type: "final"
    }
  },
  on: {
    CONFIRM_USER_DETAILS: ".CONFIRM_USER_DETAILS",
    ADD_FUNDING_CARD: ".ADD_FUNDING_CARD",
    THREE_DS_VERIFICATION_PENDING: ".THREE_DS_VERIFICATION_PENDING",
    USER_NOT_ELIGIBLE: ".USER_NOT_ELIGIBLE"
  },
  actions: { addWater }
});
