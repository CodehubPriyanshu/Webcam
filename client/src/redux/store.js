import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice.js';
import captureRrducer from './slices/captureSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    capture: captureRrducer,
  },
  devTools: true,
});

export default store;
