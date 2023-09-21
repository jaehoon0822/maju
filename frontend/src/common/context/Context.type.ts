import { Reducer } from "react";

export interface ContextProviderProps<
  T extends Record<string, any>,
  A extends { type: string; payload: any },
> {
  children: React.ReactNode;
  reducer: Reducer<T, A>;
  initialState: T;
}
