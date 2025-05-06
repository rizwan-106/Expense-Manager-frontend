import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchOneTransaction,
  updateTransactionById,
} from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";

const UpdateTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walletId, id } = useParams();
  //todo: id= transactionId
  const [form, setForm] = useState({
    ammount: "",
    description: "",
    type: "2",
    transactionDate: "",
  });

  useEffect(() => {
    const getTransaction = async (walletId, id) => {
      try {
        const trans = await dispatch(
          fetchOneTransaction({ walletId, id })
        ).unwrap();
        setForm(trans);
        // console.log(trans);
      } catch (err) {
        console.error("Failed to fetch transaction", err);
      }
    };
    getTransaction(walletId, id);
  }, [dispatch, walletId, id]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    if (!form.description || !form.ammount || !form.transactionDate) {
      toast.error("Please fill all required fields");
      return;
    }
    dispatch(updateTransactionById({ walletId, id, transaction: form }))
      .unwrap()
      .then(() => {
        toast.success("Transaction Updated Successfully");
        navigate(`/userTransaction/${walletId}`);
      })
      .catch(() => {
        toast.error("Tranasaction Not Updated");
      });
  };
  return (
    <div className="container mx-auto px-4 mt-15">
      <div className="max-w-2xl mx-auto shadow-xl p-10 bg-violet-100">
        <h4 className="text-3xl font-bold text-center mb-5">
          Update Transaction
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              min="1"
              name="ammount"
              value={form.ammount}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
              placeholder="Amount"
            />
          </div>

          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
              placeholder="Description"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">
              Transaction Type:
            </label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="1"
                  checked={form.type == "1"}
                  onChange={changeHandler}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Cash In (+)</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="2"
                  checked={form.type == "2"}
                  onChange={changeHandler}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Cash Out (-)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              name="transactionDate"
              value={form.transactionDate?.slice(0, 10)}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Update"
              className="w-full bg-blue-600 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
