import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
// register new user

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'CurrentLoginUser'],
  reducerPath: 'userApi',
  endpoints: build => ({
    addUserByAdmin: build.mutation({
      query: user => ({
        url: `/user/add`,
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
          fullName: user.fullName,
          address: user.address,
          role: user.role,
          status: user.role,
          phoneNumber: user.phoneNumber,
        },
      }),
      invalidatesTags: ['Users','CurrentLoginUser'],
    }),

    loginUser: build.mutation({
      query: user => ({
        url: `/user/login`,
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['Users','CurrentLoginUser'],
    }),

    getCurrentLoginUser: build.query({
      query: () => `/user/currentLoginUser`,
      providesTags: ['CurrentLoginUser'],
    }),

    getAllUsers: build.query({
      query: () => `/user/getAll`,
      providesTags: ['Users','CurrentLoginUser'],
    }),
  
    updateUser: build.mutation({
      query: user => ({
        url: `/user/update/${user.id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['Users','CurrentLoginUser'],
    }),
   
    // delete user by itself
    deleteUserByAdmin: build.mutation({
      query: id => ({
        url: `/user/delete/${id}`,
        method: 'DELETE',
        body: {
          reson: 'Reason will be here',
        },
      }),
      invalidatesTags: ['Users','CurrentLoginUser'],
    }),
   
  }),
});

export const {
  useLoginUserMutation,
  useGetCurrentLoginUserQuery,
  useGetAllUsersQuery,
  useAddUserByAdminMutation,
  useDeleteUserByAdminMutation,
  useUpdateUserMutation,
} = userApi;
