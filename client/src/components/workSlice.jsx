import { createSlice } from "@reduxjs/toolkit";
//      editorState: {ops: [{ insert: "<h1>Heading</h1>\n<p>Hello world<p/>\n" }]},
const workSlice = createSlice({
  name: "work",
  initialState: {
    html: {
      editorState: "<p>&lt;h1&gt;Heading&lt;/h1&gt;</p><p>&lt;p&gt;Hello world&lt;p/&gt;</p>",
      renderState: "<h1>Heading</h1> <p>Hello world<p/>"
    },
    css: "h1 { background-color: gray; }",
    js: ""
  },
  reducers: {
    updateState: (state, action) => {
      const { type, text } = action.payload;
      state.type = text;
    },
    updateHtml: (state, action) => {
      const { editor, render } = action.payload;
      state.html = { editorState: editor, renderState: render };
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

export const { updateHtml, updateCss, updateJs } = actions;
export default reducer;
