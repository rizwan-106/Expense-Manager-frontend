import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUserById } from "../../redux/slices/UserSlice";
import toast from "react-hot-toast";

const UserList = ({ user }) => {
  const dispatch = useDispatch();
  const { id, username, email } = user;

  function deleteUser(id) {
    let cnfrm = confirm(`Do you want to delete ${username} account?`);
    if (cnfrm) {
      dispatch(deleteUserById(id));
      toast.success("User deleted");
    }
  }
  return (
    <div className="bg-yellow-100 border-2 m-5 rounded flex justify-around items-center">
      <div>
        <h1 className="text-2xl pt-2 mx-10 font-semibold">{username}</h1>
        <h2 className="text-xl pb-2 mx-10">{email}</h2>
      </div>
      <div className="mx-10 py-2 w-40 flex flex-col space-y-2">
        <Link
          to={`/userWalletForAdmin/${id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded shadow w-full"
        >
          View Wallets
        </Link>

        <button
          onClick={() => deleteUser(id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow w-full"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserList;
