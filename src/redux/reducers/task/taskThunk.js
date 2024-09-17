import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';

export const taskApi = createApi({
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
  tagTypes: ['Tasks'],
  reducerPath: 'taskApi',
  endpoints: build => ({
    // Fetch all tasks
    getAllTasks: build.query({
      query: () => '/task/getAll',
      providesTags: ['Tasks'],
    }),

    // Fetch a task by ID
    getTaskById: build.query({
      query: id => `/task/getById/${id}`,
      providesTags: ['Tasks'],
    }),

    // Add a new task
    addTask: build.mutation({
      query: task => ({
        url: '/task/add',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Update an existing task
    updateTask: build.mutation({
      query: task => ({
        url: `/task/update/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Delete a task
    deleteTask: build.mutation({
      query: id => ({
        url: `/task/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Search tasks
    searchTasks: build.query({
      query: query => ({
        url: `/task/search`,
        params: query,
      }),
      providesTags: ['Tasks'],
    }),

    // Get tasks by date range
    getTasksByDateRange: build.query({
      query: ({ startDate, endDate }) => ({
        url: `/task/dateRange`,
        params: { startDate, endDate },
      }),
      providesTags: ['Tasks'],
    }),

    // Add an attachment to a task
    addAttachmentToTask: build.mutation({
      query: ({ taskId, attachment }) => ({
        url: `/task/${taskId}/attachments`,
        method: 'POST',
        body: attachment,
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Remove an attachment from a task
    removeAttachmentFromTask: build.mutation({
      query: ({ taskId, attachmentId }) => ({
        url: `/task/${taskId}/attachments`,
        method: 'DELETE',
        body: { attachmentId },
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Assign an employee to a task
    assignEmployeeToTask: build.mutation({
      query: ({ taskId, employeeId }) => ({
        url: `/task/${taskId}/assign`,
        method: 'POST',
        body: { employeeId },
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Unassign an employee from a task
    unassignEmployeeFromTask: build.mutation({
      query: ({ taskId, employeeId }) => ({
        url: `/task/${taskId}/unassign`,
        method: 'POST',
        body: { employeeId },
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSearchTasksQuery,
  useGetTasksByDateRangeQuery,
  useAddAttachmentToTaskMutation,
  useRemoveAttachmentFromTaskMutation,
  useAssignEmployeeToTaskMutation,
  useUnassignEmployeeFromTaskMutation,
} = taskApi;
