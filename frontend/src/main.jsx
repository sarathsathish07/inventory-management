import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/adminComponents/AdminPrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import AdminHomeScreen from "./screens/adminScreens/AdminHomeScreen.jsx";
import AdminLoginScreen from "./screens/adminScreens/AdminLoginScreen.jsx";
import AddItem from "./screens/adminScreens/AddItemScreen.jsx";
import SalesBill from "./screens/adminScreens/SalesBillScreen.jsx";
import Cart from "./screens/CartScreen.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import NotFoundScreen from "./screens/NotFoundScreen.jsx"; // Import NotFoundScreen

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index path="/" element={<HomeScreen></HomeScreen>}></Route>
      <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* **************admin*************************** */}

      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route index element={<AdminHomeScreen />} />
        <Route path="add-item" element={<AddItem />} />
        <Route path="sales-bill" element={<SalesBill />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
