import { createSlice } from "@reduxjs/toolkit";

const linterSlice = createSlice({
  name: "linter",
  initialState: {
    js: {
      bitwise: true,
      camelcase: false,
      curly: true,
      eqeqeq: true,
      forin: true,
      freeze: true,
      immed: false,
      latedef: false,
      newcap: false,
      noarg: true,
      noempty: true,
      nonbsp: true,
      nonew: false,
      plusplus: false,
      quotmark: [false, true, "single", "double"],
      undef: true,
      unused: [true, "vars", "strict"],
      strict: true,
      maxparams: false,
      maxdepth: false,
      maxstatements: false,
      maxcomplexity: false,
      maxlen: false,
      varstmt: false,
      asi: false,
      boss: false,
      debug: false,
      eqnull: false,
      esversion: 5,
      moz: false,
      evil: false,
      expr: false,
      funcscope: false,
      globalstrict: false,
      iterator: false,
      lastsemic: false,
      laxbreak: false,
      laxcomma: false,
      loopfunc: false,
      multistr: false,
      noyield: false,
      notypeof: false,
      proto: false,
      scripturl: false,
      shadow: false,
      sub: false,
      supernew: false,
      validthis: false,
      browser: true,
      browserify: false,
      couch: false,
      devel: true,
      dojo: false,
      jasmine: false,
      jquery: false,
      mocha: true,
      mootools: false,
      node: false,
      nonstandard: false,
      phantom: false,
      prototypejs: false,
      qunit: false,
      rhino: false,
      shelljs: false,
      typed: false,
      worker: false,
      wsh: false,
      yui: false
    }
  },
  reducers: {
    changeOption: (state, action) => {
      const { name, collection } = action.payload;
      state[collection][name] = !state[collection][name];
    }
  }
});

const { actions, reducer } = linterSlice;

export const { changeOption } = actions;
export default reducer;
