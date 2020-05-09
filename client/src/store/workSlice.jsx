import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
  name: "work",
  initialState: {
    render: "",
    css: "",
    js: ""
  },
  reducers: {
    updateCss: (state, action) => {
      const text = action.payload;
      state.css = text;
    },
    updateRender: (state, action) => {
      const render = action.payload;
      state.render = render;
    },
    updateJs: (state, action) => {
      const text = action.payload;
      state.js = text;
    }
  }
});

const { actions, reducer } = workSlice;

export const { updateCss, updateJs, updateRender } = actions;
export default reducer;
