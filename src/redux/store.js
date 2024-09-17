import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userReducer';
import { userApi } from './reducers/user/userThunk';
import taskReducer from './reducers/task/taskReducer';
import { taskApi } from './reducers/task/taskThunk';

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      taskApi.middleware
    ]),
});
