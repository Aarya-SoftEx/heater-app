import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit";
import { authReducer, loadingReducer } from "./slices";

export const resetState = createAction("resetState");

const appReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,

});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: AppState | undefined,
  action: ReturnType<typeof resetState> | Parameters<typeof appReducer>[1]
): AppState => {
  if (action.type === resetState.type) {
    state = undefined; 
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
