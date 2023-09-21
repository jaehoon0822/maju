import { Context, useContext } from "react";

export const useContextFactory = <
  T extends Record<string, any> | Record<string, never>,
>(
  context: Context<T>
) => {
  const ctx = useContext(context);
  // return ctx;
};
