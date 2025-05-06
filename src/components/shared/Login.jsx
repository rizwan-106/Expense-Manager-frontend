import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, loginStatus } from "../../redux/slices/UserSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function handleData(e) {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await dispatch(getUserByEmail(userLogin.email)).unwrap();
      if (response && response.password === userLogin.password) {
        dispatch(loginStatus(true));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        toast.success("Login Successfull");
        navigate(`/userDashboard/${response.id}`);
      } else if (
        userLogin &&
        userLogin.email === "admin@gmail.com" &&
        userLogin.password === "admin@123"
      ) {
        dispatch(loginStatus(true));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        toast.success("Admin Login Successfully");
        //! fetch all user and send to admin
        navigate(`/dashboard/${userLogin.email}`);
      } else {
        toast.error("Check Email or Password");
      }
    } catch (error) {
      console.log("User not found or some error:", error);
      toast.error("User not found!");
      alert("User not found!");
    }
  }

  return (
    <div className="container mt-40">
      <div className="flex justify-center m-15">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-5/12 p-5 shadow-xl ">
          <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                value={userLogin.email}
                onChange={handleData}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={userLogin.password}
                onChange={handleData}
                required
              />
            </div>

            <input
              type="submit"
              value="Log In"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
