import { configureStore } from "@reduxjs/toolkit";
import workReducer from "./workSlice";
import cursorsReducer from "./cursorsSlice";
import consoleReducer from "./consoleSlice";

const store = configureStore({
  reducer: {
    render: workReducer,
    cursors: cursorsReducer,
    console: consoleReducer
  }
});

export default store;
