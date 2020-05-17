import { createSlice } from "@reduxjs/toolkit";
import tinycolor from "tinycolor2";

const cursorsSlice = createSlice({
  name: "cursors",
  initialState: {
    cursors: [],
  },
  reducers: {
    addCursor: (state, action) => {
      // cursor {id, collection, name, color, range}
      const {collection, cursor} = action.payload;
      const existingCursor = state.cursors.find(curs => curs.id == cursor.id);
      if (!existingCursor) {
        const color = tinycolor.random().toHexString();
        state.cursors.push({id: cursor.id, collection: collection, color: color, name: cursor.name})
      } else {
        existingCursor.collection = collection;
        existingCursor.name = cursor.name;
        existingCursor.range = cursor.range;
      };
    },
    updateCursor: (state, action) => {
      const { collection, id, range } = action.payload;
      const existingCursor = state.cursors.find(curs => curs.id == id)

      existingCursor.range = range;
      existingCursor.collection = collection;
    },
    deleteCursor: (state, action) => {
      const {id} = action.payload;
      state.cursors.splice(state.cursors.findIndex(cursor => cursor.id == id), 1);
    }
  }
});

const { actions, reducer } = cursorsSlice;

export const { addCursor, updateCursor, deleteCursor } = actions;
export default reducer;
