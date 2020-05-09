import { createSlice } from "@reduxjs/toolkit";
import tinycolor from "tinycolor2";

const cursorsSlice = createSlice({
  name: "cursors",
  initialState: {
    cursors: {
      html: [],
      css: [],
      js: []
    },
    users: []
  },
  reducers: {
    addCursor: (state, action) => {
      // cursor {id, name, color, range}
      const {collection, cursor} = action.payload;
      if (!state.cursors[collection].find(curs => curs.id == cursor.id)) {
        const colorInfo = state.users.find(curs => curs.id == cursor.id);
        if (!colorInfo) {
          const color = tinycolor.random().toHexString();
          state.users.push({id: cursor.id, color: color, name: cursor.name})
          cursor.color = color;
        } else {
          cursor.color = colorInfo.color;
        };
        state.cursors[collection].push(cursor)
      };
    },
    updateCursor: (state, action) => {
      const { collection, id, range } = action.payload;
      state.cursors[collection].find(cursor => cursor.id == id).range = range;
    },
    deleteCursor: (state, action) => {
      const {collection, id} = action.payload;
      state.cursors[collection].splice(state.cursors[collection].findIndex(cursor => cursor.id == id), 1);
      state.users.splice(state.users.findIndex(user => user.id == id), 1);
    }
  }
});

const { actions, reducer } = cursorsSlice;

export const { addCursor, updateCursor, deleteCursor } = actions;
export default reducer;
