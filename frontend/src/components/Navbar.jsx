import React, { useState } from "react";
import { Menu, X, CheckCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/usersApiSlice";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out");
      navigate("/");
    } catch (error) {
      toast.error("Oops logout failed..");
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Creator
        </Link>

        <div
          className="md:hidden text-3xl text-gray-800  dark:text-white cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </div>

        <ul className="hidden md:flex gap-6 items-center">
          {userInfo && <Link to="/" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500">
            Home
          </Link>}

          {userInfo?.role === "user" && (
            <>
              <Link to="/profile" className="text-gray-800 dark:text-gray-300 hover:text-gray-500">
                Profile
              </Link>
              <Link to="/feed" className="text-gray-800 dark:text-gray-300 hover:text-gray-500">
                Feeds
              </Link>
            </>
          )}

          {userInfo && (
            <>
              <div className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300">
                <Link to="/profile">{userInfo?.username}</Link>
                {userInfo?.profileCompleted && (
                  <CheckCircle size={18} className="text-green-500" title="Profile Completed" />
                )}
              </div>
              <button className="bg-gray-800 p-2 rounded-md cursor-pointer dark:bg-gray-700" onClick={logoutHandler}>
                <LogOut color="white" />
              </button>
            </>
          )}

          {!userInfo && (
            <>
              <Link to="/login" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500">
                LOGIN
              </Link>
              <Link to="/signup" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500">
                SIGNUP
              </Link>
            </>
          )}
        </ul>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 w-full py-4 px-6 flex flex-col gap-4 transition-all duration-300">
          <Link to="/" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500" onClick={() => setOpen(false)}>
            Home
          </Link>

          {userInfo?.role === "user" && (
            <>
              <Link to="/profile" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500" onClick={() => setOpen(false)}>
                Profile
              </Link>
              <Link to="/feed" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500" onClick={() => setOpen(false)}>
                Feeds
              </Link>
            </>
          )}

          {userInfo && (
            <>
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
                <Link to="/profile" onClick={() => setOpen(false)}>
                  {userInfo?.username}
                </Link>
                {userInfo?.profileCompleted && (
                  <CheckCircle size={18} className="text-green-500" title="Profile Completed" />
                )}
              </div>
              <button className="w-max rounded-md bg-gray-800 p-2 dark:bg-gray-700" onClick={logoutHandler}>
                <LogOut color="white"/>
              </button>
            </>
          )}

          {!userInfo && (
            <>
              <Link to="/login" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500" onClick={() => setOpen(false)}>
                LOGIN
              </Link>
              <Link to="/signup" className="text-gray-800 dark:text-gray-300 hover:text-indigo-500" onClick={() => setOpen(false)}>
                SIGNUP
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
