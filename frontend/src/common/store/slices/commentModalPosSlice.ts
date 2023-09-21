import { createSlice } from "@reduxjs/toolkit";
import { MutableRefObject } from "react";

interface InitialState {
  commentModalRef: HTMLDivElement | null;
  commentModalPos: number;
}

const initialState: InitialState = {
  commentModalRef: null,
  commentModalPos: 0,
};

const commentModalPosSlice = createSlice({
  name: "commentModalPos",
  initialState,
  reducers: {
    setCommentModalPos: (state, action) => {
      state.commentModalPos = action.payload;
      return state;
    },
    setCommentModalRef: (state, action) => {
      state.commentModalRef = action.payload;
      return state;
    },
    setCommentModal: (_state, action) => {
      return {
        ...action.payload,
      };
    },
    getCommentModalPos: (state) => {
      return state;
    },
  },
});

export const { setCommentModalPos, setCommentModalRef, getCommentModalPos } =
  commentModalPosSlice.actions;
export const commentModalReducer = commentModalPosSlice.reducer;
