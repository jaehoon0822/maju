import { Dispatch, createContext } from "react";
import { InitialState } from "./reducer";

export const StateContext = createContext<Record<string, any>>({
  active: false,
});

export const DispatchContext = createContext<Dispatch<any>>(null!);
