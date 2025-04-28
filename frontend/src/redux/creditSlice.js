import { apiSlice } from './apiSlice';
const DEPLOYED_URL = import.meta.env.VITE_BACKEND_URL;

export const creditApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCredits: builder.query({
      query: () => ({
        url: `${DEPLOYED_URL}/api/credit/credits`,
        method: 'GET',
      }),
    }),
    completeProfile: builder.mutation({
      query: () => ({
        url: `${DEPLOYED_URL}/api/credit/profile`,
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${DEPLOYED_URL}/api/credit/profile-data`, 
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCreditsQuery, useCompleteProfileMutation,useGetUserProfileQuery } = creditApiSlice;
