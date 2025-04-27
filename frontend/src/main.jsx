import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import PrivateRoutes from "./components/PrivateRoutes";
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Feed = lazy(() => import("./pages/Feed"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <SignUp />
          </Suspense>
        }
      />

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route
          path="/profile"
          element={
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route
          index
          path="/"
          element={
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <Dashboard />
            </Suspense>
          }
        />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route
          path="/feed"
          element={
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <Feed />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
