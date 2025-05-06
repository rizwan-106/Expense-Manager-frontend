import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWalletById } from "../../redux/slices/WalletSlice";
import toast from "react-hot-toast";
import { fetchAllTransaction } from "../../redux/slices/TransactionSlice";
import { Link } from "react-router-dom";

const UserDashboardItem = ({ data }) => {
  //todo data = wallet details
  const dispatch = useDispatch();
  const deleteWallet = (id) => {
    //todo id= walletId
    let result = confirm("Are you sure!");
    if (result) {
      dispatch(deleteWalletById(id));
      toast.success("Wallet Deleted");
    }
  };

  const [totalBal, setTotalbal] = useState(0);
  
  useEffect(() => {
    if (data?.id && typeof data.id === "number" && !isNaN(data.id)) {
      const a = dispatch(fetchAllTransaction(data.id));
      a.then((data) => {
        let result = 0;
        let income = 0;
        let expense = 0;
        data.payload?.map((ele) => {
          // console.log(ele);
          if (ele.type == 1) {
            income += ele.ammount;
          } else {
            expense += ele.ammount;
          }
        });
        result = income - expense;
        setTotalbal(result);
      });
    }
  }, [dispatch, data?.id]);

  return (
    <div className="mx-auto px-4 mb-4">
      <div className="bg-violet-100 p-6 shadow rounded mx-30">
        <div className="flex flex-wrap justify-between mx-10">
          <div className="w-1/3 min-w-[250px]">
            <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
            <p className="text-gray-600">
              Account Number: {data.accountNumber}
            </p>
            <p className="text-gray-600">Description: {data.description}</p>
          </div>

          {/* Net Balance */}
          <div className="w-1/3 min-w-[250px] text-center">
            <h3 className="text-xl font-semibold  text-gray-800">
              Net Balance
            </h3>
            <h1
              className={`text-2xl font-bold ${
                totalBal >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Rs. {totalBal}
            </h1>
          </div>

          <div className="w-1/3 min-w-[250px]">
            <ul className="space-y-2 mt-4 lg:mt-0">
              <li>
                <Link
                  to={`/userTransaction/${data.id}`}
                  className="block bg-white px-25 py-2 border border-green-500 rounded text-green-600 hover:bg-green-50 transition"
                >
                  <i className="fa fa-flag-checkered mr-2"></i>View Transactions
                </Link>
              </li>
              <li>
                <Link
                  to={`/userUpdateWallet/${data.id}`}
                  className="block w-full bg-white px-25 py-2 border border-blue-500 rounded text-blue-600 hover:bg-blue-50 transition"
                >
                  <i className="fa fa-edit mr-2"></i>Update Wallet Info
                </Link>
              </li>
              <li>
                <button
                  onClick={() => deleteWallet(data.id)}
                  className="block w-full bg-white py-2  border border-red-500 rounded text-red-600 hover:bg-red-50 transition"
                >
                  <i className="fa fa-minus-circle mr-2"></i>Delete Wallet
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    // <div className="mx-auto px-4 mb-4">
    //   <div className="bg-violet-100 p-6 shadow rounded">
    //     {/* ✅ Changed from 'flex flex-wrap justify-between' to responsive layout */}
    //     <div className="flex flex-col md:flex-row md:justify-between gap-6">
    //       {/* Wallet Info */}
    //       <div className="md:w-1/3 min-w-[250px]">
    //         <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
    //         <p className="text-gray-600">
    //           Account Number: {data.accountNumber}
    //         </p>
    //         <p className="text-gray-600">Description: {data.description}</p>
    //       </div>

    //       {/* Net Balance */}
    //       <div className="md:w-1/3 min-w-[250px] text-center">
    //         <h3 className="text-xl font-semibold text-gray-800">Net Balance</h3>
    //         <h1
    //           className={`text-2xl font-bold ${
    //             totalBal >= 0 ? "text-green-600" : "text-red-600"
    //           }`}
    //         >
    //           Rs. {totalBal}
    //         </h1>
    //       </div>

    //       {/* ✅ Moved this to last and added responsive width */}
    //       <div className="md:w-1/3 min-w-[250px]">
    //         <ul className="space-y-2 mt-4 md:mt-0">
    //           <li>
    //             <Link
    //               to={`/userTransaction/${data.id}`}
    //               className="block bg-white px-4 py-2 border border-green-500 rounded text-green-600 hover:bg-green-50 transition"
    //             >
    //               <i className="fa fa-flag-checkered mr-2"></i>View Transactions
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to={`/userUpdateWallet/${data.id}`}
    //               className="block bg-white px-4 py-2 border border-blue-500 rounded text-blue-600 hover:bg-blue-50 transition"
    //             >
    //               <i className="fa fa-edit mr-2"></i>Update Wallet Info
    //             </Link>
    //           </li>
    //           <li>
    //             <button
    //               onClick={() => deleteWallet(data.id)}
    //               className="block w-full bg-white py-2 border border-red-500 rounded text-red-600 hover:bg-red-50 transition"
    //             >
    //               <i className="fa fa-minus-circle mr-2"></i>Delete Wallet
    //             </button>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserDashboardItem;
