import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Nav from "./components/shared/Nav";
import Welcome from "./components/Welcome";
import NotFound from "./components/shared/NotFound";
import { Provider } from "react-redux";
import myStore from "./redux/Store";
import { Toaster } from "react-hot-toast";
import AddTransaction from "./components/transactions/AddTransaction";
import UpdateTransaction from "./components/transactions/UpdateTransaction";
import Register from "./components/shared/Register";
import Login from "./components/shared/Login";
import UserDashboard from "./components/user/UserDashboard";
import UserCreateWallet from "./components/user/UserCreateWallet";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import UserTransaction from "./components/transactions/UserTransaction";
import UserUpdateWallet from "./components/user/UserUpdateWallet";
import UserWalletForAdmin from "./components/admin/UserWalletForAdmin";

function App() {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route
            path={`/dashboard/:email`}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/userDashboard/:id"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={`/userUpdateWallet/:id`}
            element={
              <PrivateRoute>
                <UserUpdateWallet />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="createWalletUser/:id"
            element={
              <PrivateRoute>
                <UserCreateWallet />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={`/userWalletForAdmin/:id`}
            element={
              <PrivateRoute>
                <UserWalletForAdmin />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/userTransaction/:id"
            element={
              <PrivateRoute>
                <UserTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/trns/add/:id"
            element={
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/updateTransaction/:walletId/:id"
            element={
              <PrivateRoute>
                <UpdateTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
