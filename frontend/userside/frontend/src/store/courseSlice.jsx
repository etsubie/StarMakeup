// src/redux/slices/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true;
    },
    fetchCoursesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } = courseSlice.actions;
export default courseSlice.reducer;
