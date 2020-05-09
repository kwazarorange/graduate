import { configureStore } from '@reduxjs/toolkit';
import workReducer from './workSlice';
import cursorsReducer from './cursorsSlice';




const store = configureStore({
  reducer: {render: workReducer, cursors: cursorsReducer}
})

export default store
