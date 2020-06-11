import { configureStore } from "@reduxjs/toolkit";
import workReducer from "./workSlice";
import cursorsReducer from "./cursorsSlice";
import consoleReducer from "./consoleSlice";
import linterReducer from "./linterSlice";

const store = configureStore({
  reducer: {
    render: workReducer,
    cursors: cursorsReducer,
    console: consoleReducer,
    linter: linterReducer
  }
});

export default store;
