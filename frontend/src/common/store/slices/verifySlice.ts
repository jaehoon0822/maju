import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userId: string;
  code: string;
  certified: boolean;
}

const initialState: InitialState = {
  userId: "",
  code: "",
  certified: false,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload;
    },
    init: () => {
      return {
        userId: "",
        code: "",
        certified: false,
      };
    },
  },
});

export const { set, init } = verifySlice.actions;
export const verifyReducer = verifySlice.reducer;
