import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserTransList = ({ walletId, data }) => {
  //Todo: data = each Transaction
  const dispatch = useDispatch();
  const handledeleteTransaction = (walId, trans_id) => {
    // console.log("Deleted");
    console.log(walId, trans_id);
    let result = confirm("Are you sure!");
    if (result) {
      dispatch(deleteTransaction({ walletId: walId, transId: trans_id }));
      toast.success("Transaction Deleted");
    }
  };
  let ans = localStorage.getItem("role");
  const isIncome = data.type == "1";
  const rowClass = isIncome ? "bg-green-100" : "bg-red-100";
  const amountClass = isIncome ? "text-green-700" : "text-red-800";
  const sign = isIncome ? "+" : "-";
  return (
    <tbody>
      <tr className={rowClass}>
        <td className="px-4 py-2">{data.transactionDate}</td>
        <td className="px-4 py-2 break-words max-w-xs text-justify">
          {data.description}
        </td>
        <td></td>
        <td></td>
        <td className={`${amountClass} px-4 py-2`}>
          {sign}
          {data.ammount}
        </td>
        <td className="px-4 py-2 flex space-x-4">
          {ans === "admin" ? (
            <div>
              <span className="text-gray-400 cursor-not-allowed mx-3">
                <i className="fas fa-edit text-xl"></i>
              </span>
              <span className="text-gray-400 cursor-not-allowed">
                <i className="fas fa-trash text-xl"></i>
              </span>
            </div>
          ) : (
            <div className="flex justify-around">
              <Link
                className="text-blue-500 hover:text-blue-700 mx-3"
                to={`/updateTransaction/${walletId}/${data.id}`}
              >
                <i className="fas fa-edit text-xl"></i>
              </Link>
              <Link
                onClick={() => handledeleteTransaction(walletId, data.id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash text-xl"></i>
              </Link>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default UserTransList;
