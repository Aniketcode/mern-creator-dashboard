import { apiSlice } from './apiSlice';
const DEPLOYED_URL = import.meta.env.VITE_BACKEND_URL;
// const DEPLO YED_URL = 'https://mern-creator-dashboard-puce.vercel.app';


export const feedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAggregatedFeed: builder.query({
      query: () => ({
        url: `${DEPLOYED_URL}/api/feed/aggregate`,
        method: 'GET',
      }),
    }),
    getFeedHistory: builder.query({
      query: () => `${DEPLOYED_URL}/api/feed/feed-activities`, 
    }),
    savePost: builder.mutation({
      query: (data) => ({
        url: `${DEPLOYED_URL}/api/feed/save`,
        method: 'POST',
        body: data,
      }),
    }),
    reportPost: builder.mutation({
      query: (data) => ({
        url: `${DEPLOYED_URL}/api/feed/report`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAggregatedFeedQuery, useGetFeedHistoryQuery,useSavePostMutation, useReportPostMutation } = feedApiSlice;
