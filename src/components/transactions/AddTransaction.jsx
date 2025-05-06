import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTransaction } from "../../redux/slices/TransactionSlice";
import toast from "react-hot-toast";

const AddTransaction = () => {
  const { id } = useParams();
  //Todo: id= walletId
  const [form, setForm] = useState({
    ammount: "",
    description: "",
    type: "2",
    transactionDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTransaction({ walletId: id, transaction: form }))
      .unwrap()
      .then(() => {
        toast.success("Transaction Added");
        navigate(`/userTransaction/${id}`);
      })
      .catch(() => {
        toast.error("Transaction Not Added Successfully");
      });
  };

  return (
    <div className=" mx-auto px-4 m-10">
      <div className="max-w-2xl mx-auto bg-violet-50 p-10">
        <Link
          to={`/userTransaction/${id}`}
          className="inline-block mb-4 text-black hover:text-gray-900 underline"
        >
          Back to Wallet
        </Link>

        <h4 className="text-3xl font-bold text-center mb-2">
          Add New Transaction
        </h4>
        <p className="text-center text-gray-600 mb-4">{""}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              min="1"
              name="ammount"
              value={form.ammount}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
              placeholder="Amount"
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
              placeholder="Description"
              required
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
                  checked={form.type === "1"}
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
                  checked={form.type === "2"}
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
              value={form.transactionDate}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
