import { Reducer } from "react";

export interface InitialState {
  active: boolean;
}

export const enabledAction = () => ({
  type: "ENABLED",
  payload: true,
});

export const disabledAction = () => ({
  type: "DISABLED",
  payload: false,
});

export const initialState: InitialState = {
  active: false,
};

export const reducer: Reducer<InitialState, { type: string; payload: any }> = (
  state: InitialState,
  action
) => {
  switch (action.type) {
    case "ENABLED":
      return {
        active: action.payload,
      };
    case "DISABLED":
      return {
        active: action.payload,
      };
    default:
      return state;
  }
};
