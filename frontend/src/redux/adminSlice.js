import { apiSlice } from './apiSlice';
const ADMIN_URL = import.meta.env.VITE_BACKEND_URL;
const DEPLOYED_URL = 'https://mern-creator-dashboard.vercel.app';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
          getAllUsers: builder.query({
            query: () => ({
              url: `${DEPLOYED_URL}/api/admin/users`,
              method: 'GET',
            }),
          }),
          updateUserCredits: builder.mutation({
            query: (data) => ({
              url: `${DEPLOYED_URL}/api/admin/update-credits`, 
              method: 'POST',
              body: data,
            }),
          }),
          getFeedActivities: builder.query({
            query: () => ({
              url: `${DEPLOYED_URL}/api/admin/activities`,
              method: 'GET',
            }),
          }),
        }),
})

export const {useGetAllUsersQuery,useUpdateUserCreditsMutation,useGetFeedActivitiesQuery} = adminApiSlice