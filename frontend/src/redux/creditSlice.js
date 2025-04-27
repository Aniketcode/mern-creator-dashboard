import { apiSlice } from './apiSlice';
const CREDIT_URL = import.meta.env.VITE_BACKEND_URL;
// const DEPLOYED_URL = 'https://user-auth-backend-68nw.onrender.com';


export const creditApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCredits: builder.query({
      query: () => ({
        url: `${CREDIT_URL}/api/credit/credits`,
        method: 'GET',
      }),
    }),
    completeProfile: builder.mutation({
      query: () => ({
        url: `${CREDIT_URL}/api/credit/profile`,
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${CREDIT_URL}/api/credit/profile-data`, 
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCreditsQuery, useCompleteProfileMutation,useGetUserProfileQuery } = creditApiSlice;
