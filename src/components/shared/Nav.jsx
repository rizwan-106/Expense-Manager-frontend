import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStatus } from "../../redux/slices/UserSlice";
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(loginStatus(false));
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/login");
    }, 0);
  }
  const { isLogin } = useSelector((state) => state.user);
  return (
    <>
      <nav className="bg-blue-600 text-white shadow-md h-13 flex items-center">
        <div className="mx-30 px-4 flex justify-between items-center w-full hover:text-gray-200 transition">
          <Link to="/" className="text-2xl">
            Expense Manager
          </Link>
          <div className="md:flex space-x-6 items-center text-white">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className=" hover:text-gray-300 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="hover:text-gray-300  transition"
                >
                  Signup
                </Link>
                <Link to="/login" className="hover:text-gray-200 transition">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
