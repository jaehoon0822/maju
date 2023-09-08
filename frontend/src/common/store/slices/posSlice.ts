import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  pos: number;
}

const initialState: InitialState = {
  pos: 0,
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setPos: (_state, action) => {
      return { pos: action.payload };
    },
    getPos: (state) => {
      return { pos: state.pos };
    },
  },
});

export const { setPos, getPos } = posSlice.actions;
export const posReducer = posSlice.reducer;
