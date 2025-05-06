import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWalletsByUser } from "../../redux/slices/WalletSlice";
import UserDashboardItem from "../user/UserDashboardItem";

const UserWalletForAdmin = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchWalletsByUser(id));
  }, [dispatch, id]);
  const { wallets } = useSelector((state) => state.wallet);
  // console.log(wallets);

  return (
    <div className="my-9">
      {Array.isArray(wallets) && wallets.length > 0 ? (
        [...wallets]
          .reverse()
          .filter((wallet) => wallet && wallet.id !== undefined)
          .map((wallet) => <UserDashboardItem key={wallet.id} data={wallet} />)
      ) : (
        <h1 className="text-center text-gray-600 text-xl">No Wallet Details</h1>
      )}
    </div>
  );
};

export default UserWalletForAdmin;
