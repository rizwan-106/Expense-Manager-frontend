import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/slices/UserSlice";
import UserList from "../user/UserList";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const { users } = useSelector((State) => State.user);
  // console.log(users);

  return (
    <div className="col-md-12">
      <br />
      <h1 className="display-4 text-center text-3xl font-bold">Admin Pannel</h1>
      <br />
      <br />
      <hr />
      <div className="mx-20 px-10">
        <h1 className="text-center text-3xl mt-5">Users List</h1>
        {Array.isArray(users) && users.length > 0
          ? [...users]
              .filter((user) => user && user.id !== undefined)
              .map((user) => <UserList key={user.id} user={user}></UserList>)
          : "No Users Found!"}
      </div>
    </div>
  );
};

export default Dashboard;
