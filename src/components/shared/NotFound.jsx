import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-100">
      <div className="text-center p-10 bg-white rounded shadow-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-2">404 - Not Found</h2>
        <p className="text-lg text-gray-700 mb-6">Only Admin can access it!</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
