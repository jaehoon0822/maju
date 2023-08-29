import { useMemo, useReducer } from "react";
import { ContextProviderProps } from "./Context.type";
import { DispatchContext, StateContext } from "./Modal/context";

export const ContextProvider = <
  T extends Record<string, any>,
  A extends { type: string; payload: any },
>({
  children,
  initialState,
  reducer,
}: ContextProviderProps<T, A>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => state, [state]);

  return (
    <StateContext.Provider value={value as T}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
