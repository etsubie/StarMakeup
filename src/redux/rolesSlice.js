import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  loading: false,
  error: null,
  successMessage: ''
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesStart: (state) => {
      state.loading = true;
    },
    fetchRolesSuccess: (state, action) => {
      state.roles = action.payload;
      state.loading = false;
    },
    fetchRolesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createRoleStart: (state) => {
      state.loading = true;
    },
    createRoleSuccess: (state, action) => {
      state.roles.push(action.payload);
      state.successMessage = 'Role created successfully!';
      state.loading = false;
    },
    createRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateRoleStart: (state) => {
      state.loading = true;
    },
    updateRoleSuccess: (state, action) => {
      const index = state.roles.findIndex(role => role._id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
      state.successMessage = 'Role updated successfully!';
      state.loading = false;
    },
    updateRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteRoleStart: (state) => {
      state.loading = true;
    },
    deleteRoleSuccess: (state, action) => {
      state.roles = state.roles.filter(role => role._id !== action.payload);
      state.successMessage = 'Role deleted successfully!';
      state.loading = false;
    },
    deleteRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure
} = rolesSlice.actions;

export default rolesSlice.reducer;
