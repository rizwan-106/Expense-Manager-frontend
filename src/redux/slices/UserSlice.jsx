import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const insertUser = createAsyncThunk(
  "user/insertUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:1011/user/add", user);
      return response.data;
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorPayload);
    }
  }
);

//!for login purpose
export const getUserByEmail = createAsyncThunk(
  "getUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:1011/user/${email}`);
      return response.data; //
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorPayload);
    }
  }
);

export const getUserByWalletId = createAsyncThunk(
  "getUserByWalletId",
  async (walletId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1011/wallet/getUserIdFromWallet/${walletId}`
      );
      return response.data; //
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorPayload);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "allUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:1011/user/getAll`);
      return response.data;
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorPayload);
    }
  }
);
export const deleteUserById = createAsyncThunk(
  "delete/user",
  async (userId) => {
    try {
      await axios.delete(`http://localhost:1011/user/${userId}`);
      return userId;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  userId: null,
  // isLogin: false,
  isLogin: localStorage.getItem("isLoggedIn") === "true",
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(insertUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserByWalletId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByWalletId.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload;
      })
      .addCase(getUserByWalletId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        if (Array.isArray(state.users)) {
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          );
        } else {
          state.users = [];
        }
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export let { loginStatus } = UserSlice.actions;
export default UserSlice.reducer;
