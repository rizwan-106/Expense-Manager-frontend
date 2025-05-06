import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearErrors, getErrors } from "./ErrorSlice";

//! Create
export const createTransaction = createAsyncThunk(
  "createTrans",
  async ({ walletId, transaction }, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.post(
        `http://localhost:1011/transaction/addTransaction/${walletId}`,
        transaction
      );
      dispatch(clearErrors({}));
      return result.data;
    } catch (error) {
      const errorPayload = error.response?.data || {
        message: "Something went wrong",
      };
      dispatch(getErrors(errorPayload));
      return rejectWithValue(errorPayload);
    }
  }
);

//! Read
export const fetchOneTransaction = createAsyncThunk(
  "oneTrans",
  async ({ walletId, id }) => {
    const response = await axios.get(
      `http://localhost:1011/transaction/getTransactionById/${walletId}/${id}`
    );
    return response.data;
  }
);
export const fetchAllTransaction = createAsyncThunk(
  "allTrans",
  async (walletId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1011/transaction/getAllTransaction/${walletId}`
      ); // update API if needed
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching transaction");
    }
  }
);
//! update
export const updateTransactionById = createAsyncThunk(
  "update",
  async ({walletId, id, transaction}) => {
    const response = await axios.put(
      `http://localhost:1011/transaction/updateTransaction/${walletId}/${id}`,
      transaction
    );
    return response.data;
  }
);
//! delete
export const deleteTransaction = createAsyncThunk(
  "delete",
  async ({ walletId, transId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:1011/transaction/deleteTransactionById/${walletId}/${transId}`
      );
      return transId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Transaction Not");
    }
  }
);
export const TransactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: [],
    loading: false,
    error: null,
    totalBal: {},
  },
  reducers: {
    setTotalBallance: (state, action) => {
      const { walletId, balance } = action.payload;
      state.totalBal[walletId] = balance;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOneTransaction.fulfilled, (state, action) => {
        state.wallets = action.payload;
      })
      .addCase(fetchAllTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted transaction from the array
        state.transaction = state.transaction.filter(
          (transaction) => transaction.id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTransactionById.fulfilled, (state) => {
        state.status = "updated";
      });
  },
});

export const { setTotalBallance } = TransactionSlice.actions;
export default TransactionSlice.reducer;
