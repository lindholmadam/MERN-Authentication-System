
// This slice is to set the users credentials to local storage and remove them
// In this slice we are not dealing wih any endpoints or api stuff... thats going into usersApiSlice.js

import { createSlice } from '@reduxjs/toolkit';



// Checking if there alredy is user-info in local storage. 
// If there is we will parse it from a JSON string to a javascript object 
const initialState = {
  userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null, // Else set it to null
};





const authSlice = createSlice({ // Here we creating the slice ( reducer function + )
  name: 'auth',
  initialState,
  // This reducer makes it so that our Redux-state will allways match what we have in local storage
  reducers: { // The reducer takes the current state of an application, perform an action, and return a new state.
    setCredentials: (state, action) => { 
      state.userInfo = action.payload; // We set the userInfo-state to the payload. Dvs.. once we hit the backend through our backend apiSlice.js we will get the user info and send it here as the payload in the action.
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Then we set the userInfo to local storage by making it a string and pass it in.

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions; // We export the setCredentials-function as an action so that we can call it

export default authSlice.reducer; // We export the authSlice-reducer and bring it into the store