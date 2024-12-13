import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode'; // Correct default import

// Initial state
const initialState = {
  token: null,
  user: null, // Stores the decoded token details (id, role, email)
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (state.token) {
        // Decode token and extract user details
        const decoded = jwt_decode(state.token); // Use default import
        state.user = decoded;
        state.role = decoded.role; // Extract role
        state.isAuthenticated = true;
      }
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setToken, clearAuth } = authSlice.actions;

// Export selector to get role
export const selectRole = (state) => state.auth.role;

// Export the reducer
export default authSlice.reducer;
