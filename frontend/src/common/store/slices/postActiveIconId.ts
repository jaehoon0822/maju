import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  id: string | null;
}

const initialState: InitialState = {
  id: null,
};

const postActiveIconIdSlice = createSlice({
  name: "postActiveIconId",
  initialState,
  reducers: {
    setPostActiveIconId: (_state, action) => {
      return { id: action.payload };
    },
    getPostActiveIconId: (state) => {
      return { id: state.id };
    },
  },
});

export const { setPostActiveIconId, getPostActiveIconId } =
  postActiveIconIdSlice.actions;
export const postActiveIconIdReducer = postActiveIconIdSlice.reducer;
