import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserByWalletId } from "../../redux/slices/UserSlice";
import {
  fetchAllTransaction,
  setTotalBallance,
} from "../../redux/slices/TransactionSlice";
import UserTransList from "./UserTransList";

const UserTransaction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //TODO: id= walletId

  // console.log("Wallet ID from Transaction", id);
  // const selected=useSelector((state)=>state.transaction.transaction);
  // console.log(selected);//!OR
  useEffect(() => {
    dispatch(fetchAllTransaction(id));
  }, [dispatch, id]);
  const { transaction } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getUserByWalletId(id));
  }, [dispatch, id]);
  const { userId } = useSelector((state) => state.user);

  const [totalBal, setTotalBal] = useState(0);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  useEffect(() => {
    if (transaction?.length > 0) {
      let totalIncome = 0;
      let totalExpense = 0;
      transaction.forEach((item) => {
        const amount = Number(item.ammount); // just in case it's a string
        if (item.type == "1") {
          totalIncome += amount;
        } else if (item.type == "2") {
          totalExpense += amount;
        }
        setCashIn(totalIncome);
        setCashOut(totalExpense);
      });

      const netBalance = totalIncome - totalExpense;
      setTotalBal(netBalance);
      dispatch(setTotalBallance({ walletId: id, balance: netBalance }));
    } else {
      setTotalBal(0);
    }
  }, [dispatch, transaction, id]);

  let ans = localStorage.getItem("role");
  return (
    <div className="mx-15 my-10">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5 px-5">
        {ans === "admin" ? (
          <Link
            // to={`/userDashboard/${userId}`}
            to={`/userWalletForAdmin/${userId}`}
            className="bg-gray-300 text-gray-800 text-lg px-4 py-2 rounded mb-3 md:mb-0 hover:bg-gray-400 transition"
          >
            Back
          </Link>
        ) : (
          <Link
            to={`/userDashboard/${userId}`}
            className="bg-gray-300 text-gray-800 text-lg px-4 py-2 rounded mb-3 md:mb-0 hover:bg-gray-400 transition"
          >
            Back
          </Link>
        )}
        {ans === "admin" ? (
          <span className="bg-blue-600 text-white text-lg px-4 py-2 rounded cursor-not-allowed">
            <i className="fas fa-plus-circle mr-2"></i> Add new Transaction
          </span>
        ) : (
          <Link
            to={`/trns/add/${id}`}
            className="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <i className="fas fa-plus-circle mr-2"></i> Add new Transaction
          </Link>
        )}
      </div>

      {/* Net Balance Card */}
      <div className="bg-green-600 text-white rounded shadow text-center py-4 px-4 mb-3">
        <h4 className="text-xl font-semibold">Net Balance</h4>
        <h1 className="text-3xl font-bold mt-1 mb-4">Rs. {totalBal}</h1>
        <div className="flex justify-around">
          <h4 className="text-lg font-medium">Total In (+): {cashIn}</h4>
          <h4 className="text-lg font-medium">Total Out (-): {cashOut}</h4>
        </div>
      </div>

      <hr className="mb-6" />
      <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        {/* Transaction List */}
        {Array.isArray(transaction) && transaction.length > 0 ? (
          transaction
            .slice()
            .reverse()
            .filter((ele) => ele && ele.id !== undefined)
            .map((ele) => (
              <UserTransList key={ele.id} walletId={id} data={ele} />
            ))
        ) : (
          <tfoot>
            <tr>
              <td colSpan="6" className="text-center text-gray-600 text-xl">
                No Any Transaction
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default UserTransaction;
