import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneWallet, updateWallet } from "../../redux/slices/WalletSlice";
import { getUserByWalletId } from "../../redux/slices/UserSlice";
import toast from "react-hot-toast";

const UserUpdateWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [walletData, setWalletData] = useState({
    id: "",
    name: "",
    accountNumber: "",
    description: "",
    priority: "",
    user: "",
  });
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const getWalletAndUserId = async (walletId) => {
      try {
        const wallet = await dispatch(fetchOneWallet(walletId)).unwrap();
        // console.log("Line 31:", wallet);

        const user_id = await dispatch(getUserByWalletId(walletId)).unwrap();

        setWalletData({ ...wallet, user: user_id });
        setUserId(user_id);
      } catch (error) {
        console.error("Failed to fetch wallet", error);
      }
    };
    getWalletAndUserId(id);
  }, [dispatch, id]);

  const changeHandler = (e) => {
    setWalletData({ ...walletData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateWallet(walletData))
      .unwrap()
      .then(() => {
        toast.success("Wallet Updated Successfully");
        navigate(`/userDashboard/${userId}`);
      })
      .catch(() => {
        toast.error("Wallet Not Updated");
      });
  };
  let ans = localStorage.getItem("role");
  return (
    <div className="mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-violet-50 p-6 shadow-md rounded">
          <h5 className="text-3xl font-bold text-center mb-4">Update Wallet</h5>
          <hr className="mb-6" />
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={walletData.name}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
                placeholder="Payment Mode Name"
              />
            </div>

            <div>
              <input
                type="text"
                name="accountNumber"
                value={walletData.accountNumber}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
                placeholder="Account No"
              />
            </div>

            <div>
              <textarea
                name="description"
                value={walletData.description}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
                placeholder="Description"
                rows={4}
              ></textarea>
            </div>

            <div>
              <select
                value={walletData.priority}
                name="priority"
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
              >
                <option value="">Select Priority</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>
            </div>
            {ans === "admin" ? (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-1 rounded transition cursor-not-allowed"
                disabled
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-1 rounded transition"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateWallet;
