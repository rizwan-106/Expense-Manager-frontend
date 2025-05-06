import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserById, loginStatus } from "../../redux/slices/UserSlice";
import { fetchWalletsByUser } from "../../redux/slices/WalletSlice";
import UserDashboardItem from "./UserDashboardItem";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchWalletsByUser(id));
    }
  }, [dispatch, id]);
  const { wallets } = useSelector((state) => state.wallet);

  function newWallet(id) {
    navigate(`/createWalletUser/${id}`);
  }
  function deleteAccount(userId) {
    const userCnfrm = confirm("Do you really want to delete your account!!");
    if (userCnfrm) {
      dispatch(loginStatus(false));
      dispatch(deleteUserById(userId));
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      setTimeout(() => {
        navigate("/register");
      }, 0);
    }
  }
  return (
    <div className="py-8">
      <div className="mx-auto px-4">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center  mb-6">My Wallets</h1>

          {/* Button Group */}
          <div className="flex justify-around gap-4 mb-6">
            <button
              type="button"
              className="bg-blue-500 text-white text-lg px-6 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => newWallet(id)}
            >
              Create New Wallet
            </button>
            <button
              type="button"
              className="bg-red-600 text-white text-lg px-6 py-2 rounded hover:bg-red-700 transition"
              onClick={() => deleteAccount(id)}
            >
              Delete Account
            </button>
          </div>

          <hr className="mb-6 border-gray-300" />

          {Array.isArray(wallets) && wallets.length > 0 ? (
            [...wallets]
              .reverse()
              .filter((wallet) => wallet && wallet.id !== undefined)
              .map((wallet) => (
                <UserDashboardItem key={wallet.id} data={wallet} />
              ))
          ) : (
            <h1 className="text-center text-gray-600 text-xl">
              No Wallet Details
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
