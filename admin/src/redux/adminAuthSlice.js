import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk for signup
export const adminSignUp = createAsyncThunk("admin/signUp",
  async (adminData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5001/admin/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      return data; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for login
export const adminLogin = createAsyncThunk("admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5001/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null, // Stores admin details (null when logged out)
    isAuthenticated: false, // Tracks login state
  },
  reducers: {
    adminSignUp: (state, action) => {
      state.admin = action.payload; // Get admin data (e.g., name, email)
      state.isAuthenticated = true;
    },
    adminLogin: (state, action) => {
      state.admin = action.payload; // Set admin data (e.g., name, email)
      state.isAuthenticated = true;
    },
    adminLogout: (state) => {
      state.admin = null; // Clear admin data
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { adminLogout } = adminAuthSlice.actions;

// Export reducer
export default adminAuthSlice.reducer;
