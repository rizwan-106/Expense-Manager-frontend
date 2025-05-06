import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { insertUser } from "../../redux/slices/UserSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (user.password !== user.password2) {
      toast.error("Password didn't match");
      return;
    }
    if (user.password === user.password2) {
      const userData = {
        username: user.username,
        email: user.email,
        password: user.password,
      };
      try {
        const resultAction = await dispatch(insertUser(userData));
        if (insertUser.fulfilled.match(resultAction)) {
          toast.success("User Registered Successfully");
          navigate("/login");
        } else {
          toast.error(resultAction.payload?.message || "Registration Failed");
        }
      } catch (err) {
        console.log(err);
        toast.error("Unexpected Error");
      }
    }
  }
  return (
    <div className="p-5">
      <div className="flex justify-center m-10 ">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-5/12 p-4 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Create your Account
          </p>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={user.username}
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Name"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={user.email}
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={user.password}
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password2"
                value={user.password2}
                className="w-full p-3 border border-gray-300
                  bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              value="Register"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
            />
          </form>

          <p className="mt-4 text-center text-gray-600">
            If you already have an account {"    "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
