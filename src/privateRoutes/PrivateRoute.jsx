import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // console.log(children);
  
  let role = localStorage.getItem("role");
  // console.log(role);
  
  
  if (role === "admin" || role === "user") {
    return <div>{children}</div>;
  }
  return <Navigate to={"/"}/>
};

export default PrivateRoute;
