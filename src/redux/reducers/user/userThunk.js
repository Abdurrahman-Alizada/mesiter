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
  tagTypes: ['User', 'CurrentLoginUser'],
  reducerPath: 'userApi',
  endpoints: build => ({
    addUserByAdmin: build.mutation({
      query: user => ({
        url: `/user/add`,
        method: 'POST',
        body: {
          email: user.email,
          addressLine1: user.addressLine1,
          addressLine2: user.addressLine2,
          addressLine3: user.addressLine3,
          postCode: user.postCode,
          city: user.city,
          firstName: user.firstName,
          surName: user.surName,
        },
      }),
      invalidatesTags: ['User'],
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
      invalidatesTags: ['User'],
    }),

    getCurrentLoginUser: build.query({
      query: () => `/user/currentLoginUser`,
      providesTags: ['CurrentLoginUser'],
    }),
  
    updateUser: build.mutation({
      query: user => ({
        url: `/user/freeflexer/updateFreeflexer/${user.id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User'],
    }),
   
    // delete user by itself
    deleteUserByItself: build.mutation({
      query: id => ({
        url: `/api/account/users/${id}/deleleUserByItSelf`,
        method: 'DELETE',
        body: {
          reson: 'Reason will be here',
        },
      }),
      invalidatesTags: ['User'],
    }),
   
  }),
});

export const {
  useLoginUserMutation,
  useGetCurrentLoginUserQuery,
  useAddUserByAdminMutation,
  useDeleteUserByItselfMutation,
  useUpdateUserMutation,
} = userApi;
