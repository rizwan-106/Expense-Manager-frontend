// redux/slices/WalletSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearErrors, getErrors } from "./ErrorSlice";

//! Create
export const createWalletForUser = createAsyncThunk(
  "createWallet/user",
  async ({ userId, walletData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `http://localhost:1011/wallet/addWalletUser/${userId}`,
        walletData
      );
      dispatch(clearErrors({}));
      return response.data;
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "Something went wrong",
      };
      dispatch(getErrors(errorPayload));
      return rejectWithValue(errorPayload);
    }
  }
);

//! Read Action

export const fetchOneWallet = createAsyncThunk(
  "wallet/fetchOne",
  async (walletId) => {
    const response = await axios.get(
      `http://localhost:1011/wallet/getById/${walletId}`
    );

    return response.data;
  }
);

// export const fetchAllWallets = createAsyncThunk(
//   "wallet/fetchWallets",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:1011/wallet/getAll"); // update API if needed
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Error fetching wallets");
//     }
//   }
// );

export const fetchWalletsByUser = createAsyncThunk(
  "getUserwallets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1011/wallet/getWalletsByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching wallets");
    }
  }
);
//! Update wallet
export const updateWallet = createAsyncThunk(
  "wallet/update",
  async (walletData) => {
    const response = await axios.put(
      `http://localhost:1011/wallet/update/${walletData.id}`,
      walletData
    );
    return response.data;
  }
);
//! Delete Action
export const deleteWalletById = createAsyncThunk(
  "wallet/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:1011/wallet/deleteById/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

const initialState = {
  wallets: [],
  wallet: "",
  loading: false,
  error: null,
};

export const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWalletForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWalletForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets.push(action.payload);
      })
      .addCase(createWalletForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchAllWallets.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchAllWallets.fulfilled, (state, action) => {
      //   state.wallets = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchAllWallets.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(deleteWalletById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWalletById.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = state.wallets.filter(
          (wallet) => wallet.id !== action.payload
        );
      })
      .addCase(deleteWalletById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOneWallet.fulfilled, (state, action) => {
        state.wallets = action.payload;
      })
      .addCase(updateWallet.fulfilled, (state) => {
        state.status = "updated";
      })
      .addCase(fetchWalletsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletsByUser.fulfilled, (state, action) => {
        state.wallets = action.payload;
        state.loading = false;
      })
      .addCase(fetchWalletsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { getWallets, getWallet, deleteWallet } = WalletSlice.actions;
export default WalletSlice.reducer;
