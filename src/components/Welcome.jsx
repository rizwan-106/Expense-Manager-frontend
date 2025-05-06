import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="landing min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className=" bg-opacity-80 w-full py-16 px-4 text-gray-900">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-slate-600 text-5xl mb-5">
                Personal Expense Manager
              </h1>
              <p className="text-lg sm:text-xl mb-6 max-w-2xl">
                Create your account to manage your daily expenses and hisab
                kitab
              </p>
              <hr className="w-60 border-gray-400 mb-6" />
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 text-lg rounded"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 text-white bg-gray-600 hover:bg-gray-700 text-lg rounded"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
