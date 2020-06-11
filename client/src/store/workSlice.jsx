import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
  name: "work",
  initialState: {
    render: "",
    css: "",
    js: "",
    packages: [],
    externalCss: []
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
    },
    addPackage: (state, action) => {
      const value = action.payload;
      state.packages.push(value);
    },
    removePackage: (state, action) => {
      const value = action.payload;
      state.packages = state.packages.filter(pckg => pckg != value);
    },
    addExternalCss: (state, action) => {
      const value = action.payload;
      state.externalCss.push(value);
    },
    removeExternalCss: (state, action) => {
      const value = action.payload;
      state.externalCss = state.externalCss.filter(css => css != value);
    },
  }
});

const { actions, reducer } = workSlice;

export const {
  updateCss,
  updateJs,
  updateRender,
  addPackage,
  removePackage,
  addExternalCss,
  removeExternalCss
} = actions;
export default reducer;
