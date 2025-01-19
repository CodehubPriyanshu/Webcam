import { createSlice } from '@reduxjs/toolkit';

import {
  deleteUser,
  detailsUser,
  getUserById,
  listUsers,
  login,
  register,
  updateProfile,
  updateProfileByAdmin,
} from '../thunks/userThunks';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  userDetails: localStorage.getItem('userDetails')
    ? JSON.parse(localStorage.getItem('userDetails'))
    : null,
  users: [],
  loginError: null,
  registerError: null,
  updateProfileError: null,
  detailsUserError: null,
  listUsersError: null,
  updateProfileByAdminError: null,
  deleteUserError: null,
  getUserByIdError: null,
  loginSuccess: false,
  registerSuccess: false,
  updateProfileSuccess: false,
  detailsUserSuccess: false,
  listUsersSuccess: false,
  updateProfileByAdminSuccess: false,
  deleteUserSuccess: false,
  getUserByIdSuccess: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userDetails');
      state.userInfo = null;
      state.userDetails = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginError = null;
        state.loginSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = true;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = true;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.updateProfileError = null;
        state.updateProfileSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProfileSuccess = true;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.updateProfileError = action.payload;
      })
      .addCase(detailsUser.pending, (state) => {
        state.loading = true;
        state.detailsUserError = null;
        state.detailsUserSuccess = false;
      })
      .addCase(detailsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.detailsUserSuccess = true;
        state.userDetails = action.payload;
        localStorage.setItem('userDetails', JSON.stringify(action.payload));
      })
      .addCase(detailsUser.rejected, (state, action) => {
        state.loading = false;
        state.detailsUserError = action.payload;
      })
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.listUsersError = null;
        state.listUsersSuccess = false;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.listUsersSuccess = true;
        state.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.listUsersError = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.getUserByIdError = null;
        state.getUserByIdSuccess = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.getUserByIdSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.getUserByIdError = action.payload;
      })
      .addCase(updateProfileByAdmin.pending, (state) => {
        state.loading = true;
        state.updateProfileByAdminError = null;
        state.updateProfileByAdminSuccess = false;
      })
      .addCase(updateProfileByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProfileByAdminSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(updateProfileByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.updateProfileByAdminError = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.deleteUserError = null;
        state.deleteUserSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.deleteUserSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteUserError = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
