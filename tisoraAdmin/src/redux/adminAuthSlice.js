import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for signup
export const signUp = createAsyncThunk(
  "admin/signUp",
  async (adminData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/signup`, {
           method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
        credentials: "include",
      });
    const data = await res.json();
          
    if (!res.ok) {
      return rejectWithValue(data.message || "Signup failed");
    }  
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);
// Async thunk for login
export const login = createAsyncThunk(
  "admin/login",
  async (adminData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
        credentials: "include",
      });


      const text = await res.text(); // read as text first
      let data;

      try {
        data = JSON.parse(text); // try to parse as JSON
      } catch (e) {
        return rejectWithValue(text); // fallback to plain text error
      }

      if (!res.ok) {
        return rejectWithValue(data.message || data || "Login failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const storedAdmin = localStorage.getItem("admin");

const initialState = {
  admin: storedAdmin ? JSON.parse(storedAdmin) : null,
  isAuthenticated: !!storedAdmin,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
   reducers: {
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("admin");
       localStorage.removeItem("token");
    },
    setAdmin: (state, action) => {
    state.admin = action.payload;
    state.isAuthenticated = true;
    
    localStorage.setItem("admin", JSON.stringify(action.payload)); // ✅ Persist to localStorage
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
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
        state.admin = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("admin", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
