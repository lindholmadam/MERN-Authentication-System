// Slices - A way to organise the states. 
// A collection of reducers and actions that are related to each other. 
// Each slice can have it's own state.


// Since we are working with a backend api - this is our root/base api slice.
// We will then extend whis with the usersApiSlice.js.

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'; // fetchBaseQuery is the function that will allow us to make rquests to our backend API
import { BASE_URL } from '../constants';

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL }); // Setting the baseQuery to be our base url which is /api/users
import { logout } from './authSlice'; // Import the logout action


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});


async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}



export const apiSlice = createApi({
  // baseQuery,
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery
  tagTypes: ['User'], // Type of data that we will be fetching from our api
  endpoints: (builder) => ({}), // We don't have to manually fetch our data. This is made all through this builder
});