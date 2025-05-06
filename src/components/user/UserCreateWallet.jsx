import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createWalletForUser } from "../../redux/slices/WalletSlice";

const UserCreateWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [wallet, setWallet] = useState({
    name: "",
    accountNumber: "",
    description: "",
    priority: "",
  });

  const changeHandler = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const response = dispatch(
        createWalletForUser({ userId: id, walletData: wallet })
      );
      toast.success("Wallet Created Successfully");
      navigate(`/userDashboard/${id}`);
    } catch (error) {
      toast.error("Wallet Not Created");
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="mx-auto m-20">
      <div className="bg-violet-50 py-6 px-4 shadow-md rounded-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Create Wallet
        </h2>
        <hr className="my-4" />
        <form onSubmit={onSubmit} className="space-y-4 px-10">
          <div>
            <input
              type="text"
              name="name"
              value={wallet.name}
              onChange={changeHandler}
              placeholder="Enter Wallet Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
            />
          </div>

          <div>
            <input
              type="text"
              name="accountNumber"
              value={wallet.accountNumber}
              onChange={changeHandler}
              placeholder="Account No"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
            />
          </div>

          <div>
            <textarea
              name="description"
              value={wallet.description}
              onChange={changeHandler}
              placeholder="Description"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
            ></textarea>
          </div>

          <div>
            <select
              name="priority"
              value={wallet.priority}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
            >
              <option value="">Select Priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>

          <div>
            <input
              type="submit"
              value="Create"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateWallet;
