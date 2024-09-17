import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const UserSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    handleTasks: (state, action) => {
      state.currentLoginUser = action.payload
    },
  },

});

// Action creators are generated for each case reducer function
export const { handleTasks, } = UserSlice.actions;

export default UserSlice.reducer;
