// Redux Store:
// The state of your application is kept in a store, and each component can access any state that it needs from this store. All while remaining independent of the components.
// The only way the state can change is through actions dispatched to the store.


import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';


// Here in this object is where we add all Reducers an Slices
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;