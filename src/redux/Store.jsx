// redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import WalletReducer from "./slices/WalletSlice";
import ErrorReducer from "./slices/ErrorSlice";
import TransactionSlice from "./slices/TransactionSlice";
import UserSlice from "./slices/UserSlice";

const myStore = configureStore({
  reducer: {
    wallet: WalletReducer,
    errors: ErrorReducer,
    transaction: TransactionSlice,
    user: UserSlice,
  },
});

export default myStore;
