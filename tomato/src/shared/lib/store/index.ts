import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch as useRootDispatch} from "react-redux";

import {viewerModel} from "@entities/viewer";
import {volunteerModel} from "@entities/volunteer";

const rootReducer = combineReducers({
  viewer: viewerModel.store,
  volunteer: volunteerModel.store,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useDispatch = (): RootDispatch => useRootDispatch<RootDispatch>();
