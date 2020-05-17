import { createSlice } from "@reduxjs/toolkit";

const consoleSlice = createSlice({
  name: "console",
  initialState: {
    messages: []
  },
  reducers: {
    addMessage: (state, action) => {
      const { type, message } = action.payload;
      if (!state.messages.find(msg => JSON.stringify(msg.message) == JSON.stringify(message))) {
        state.messages.push({ type, message });
      }
    },
    deleteMessages: state => {
      state.messages = [];
    }
  }
});

const { actions, reducer } = consoleSlice;

export const { addMessage, deleteMessages } = actions;
export default reducer;
