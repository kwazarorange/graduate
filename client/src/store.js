import { configureStore } from '@reduxjs/toolkit';
import workReducer from './components/workSlice';

const store = configureStore({
  reducer: workReducer
})

export default store
