
// This slice is where all the actual calls to the backend will take place
// We're not adding this to the store since this is basically a child of the apiSlice.js

import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';




export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

// ---------------------------------------- LOGIN / AUTH
    login: builder.mutation({      // Here we call the login at this mutation. It will send the request to the backend and set the cookie
      query: (data) => ({          // We are sending the data..
        url: `${USERS_URL}/auth`,  // ..to this endpoint
        method: 'POST',            // Here we specifying that it is a post request
        body: data,                // Here we specifying that the body is the data that gets pased in
      }),
    }),



// ---------------------------------------- REGISTER
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),



// ---------------------------------------- LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),















// ---------------------------------------- PROFILE
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

// ---------------------------------------- GET USERS
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),


// ---------------------------------------- DELETE USER
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),


// ---------------------------------------- GET USER DETAILS
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),


// ---------------------------------------- UPDATE USER
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;