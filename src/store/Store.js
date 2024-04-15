// store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../reducers/tasksReducer';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // other reducers...
  },
});

export default store;
