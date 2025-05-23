import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null, // Stores user details (null when logged out)
    isAuthenticated: false, // Tracks login state
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user data (e.g., name, email)
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null; // Clear user data
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { login, logout } = adminSlice.actions;

// Export reducer
export default adminSlice.reducer;
