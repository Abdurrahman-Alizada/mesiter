// 


// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './reducers/user/userThunk';
// Import additional APIs and reducers as needed
// import { settingApi } from './reducers/settings/settingsThunk';
// import { jobApi } from './reducers/jobs/jobThunk';
// import { businessApi } from './reducers/businesses/businessThunk';
// import { projectApi } from './reducers/projects/projectThunk';
// import { applyApi } from './reducers/apply/applyThunk';

import userReducer from './reducers/user/userReducer';
// Import additional reducers as needed
// import settingReducer from './reducers/settings/settingsReducers';
// import jobReducer from './reducers/jobs/jobReducer';
// import businessReducer from './reducers/businesses/businessReducer';
// import projectReducer from './reducers/projects/projectReducer';
// import applyReducer from './reducers/apply/applyReducer';

export const store = configureStore({
  reducer: {
    // Include all reducers here
    user: userReducer,
    // settings: settingReducer,
    // jobs: jobReducer,
    // businesses: businessReducer,
    // project: projectReducer,
    // apply: applyReducer,

    [userApi.reducerPath]: userApi.reducer,
    // Uncomment and add other API reducers here
    // [settingApi.reducerPath]: settingApi.reducer,
    // [jobApi.reducerPath]: jobApi.reducer,
    // [businessApi.reducerPath]: businessApi.reducer,
    // [projectApi.reducerPath]: projectApi.reducer,
    // [applyApi.reducerPath]: applyApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      // Uncomment and add other API middlewares here
      // settingApi.middleware,
      // jobApi.middleware,
      // businessApi.middleware,
      // projectApi.middleware,
      // applyApi.middleware
    ]),
});
