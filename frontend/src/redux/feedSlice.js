import { apiSlice } from './apiSlice';
const ADMIN_URL = import.meta.env.VITE_BACKEND_URL;
// const DEPLOYED_URL = 'https://user-auth-backend-68nw.onrender.com';


export const feedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAggregatedFeed: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/api/feed/aggregate`,
        method: 'GET',
      }),
    }),
    getFeedHistory: builder.query({
      query: () => `${ADMIN_URL}/api/feed/feed-activities`, 
    }),
    savePost: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/api/feed/save`,
        method: 'POST',
        body: data,
      }),
    }),
    reportPost: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/api/feed/report`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAggregatedFeedQuery, useGetFeedHistoryQuery,useSavePostMutation, useReportPostMutation } = feedApiSlice;
