import { apiSlice } from './apiSlice';
const USERS_URL =import.meta.env.VITE_BACKEND_URL;
const DEPLOYED_URL = 'https://mern-creator-dashboard.vercel.app';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       login:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/login`,
            method : 'POST',
            body : data
        }),
       }),
       logout:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/logout`,
            method : 'POST',
        }),
       }),
       register:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/register`,
            method : 'POST',
            body : data
        }),
       }),
       updateProfile:builder.mutation({
        query:(data)=>({
            url : `${DEPLOYED_URL}/api/user/profile`,
            method : 'PUT',
            body : data
        }),
       }),
    }),
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateProfileMutation} = userApiSlice