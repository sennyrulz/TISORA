import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for signup
export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5001/user/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "SignUp failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


// Async thunk for login
export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending login request with:", credentials);
      const res = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      console.log("🌐 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json(); 
        return rejectWithValue(errorData.message || "Login failed");
      }

      const data = await res.json();
      console.log("✅ Login successful, response:", data);
      return data;
    } catch (err) {
      console.error("🔥 Thunk login error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;