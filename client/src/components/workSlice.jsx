import { createSlice } from "@reduxjs/toolkit";
const Delta = require("quill-delta");

const workSlice = createSlice({
  name: "work",
  initialState: {
    html: {
      editorState: "",
      renderState: ""
    },

    css: "h1 { background-color: gray; }",
    js: ""
  },
  reducers: {
    updateState: (state, action) => {
      const { type, text } = action.payload;
      state.type = text;
    },
    updateWithDelta: (state, action) => {
      const {delta} = action.payload;
      const newState = state.html.editorState.compose(delta);
      return { ...state, html: { ...state.html, editorState: newState } };
    },
    updateHtml: (state, action) => {
      const { editor } = action.payload;
      return { ...state, html: { ...state.html, editorState: editor } };
    },
    updateRender: (state, action) => {
      const { render } = action.payload;
      // return { ...state, html: { ...state.html, renderState: render } };
      state.render = render;
    },
    updateCss: (state, action) => {
      const text = action.payload;
      state.css = text;
    },
    updateJs: (state, action) => {
      const text = action.payload;
      state.js = text;
    }
  }
});

const { actions, reducer } = workSlice;

export const { updateHtml, updateWithDelta, updateCss, updateJs, updateRender } = actions;
export default reducer;
