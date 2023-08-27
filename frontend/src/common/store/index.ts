import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import { verifyReducer } from "./slices/verifySlice";

// reducer 를 사용하여 store 생성
export const store = configureStore({
  reducer: {
    verify: verifyReducer,
  },
});

// RootState 타입
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입
type AppDispatch = typeof store.dispatch;

// useDispatch 생성
export const useDispatch = () => useDispatchBase<AppDispatch>();

// useSelector 생성
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
