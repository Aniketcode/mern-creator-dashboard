import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";
import toast from "react-hot-toast";
import { MoveLeft } from "lucide-react";
import Heading from "./Heading";
import InputField from "./InputField"
const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
  });

  const navigate = useNavigate();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username,
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData((prev)=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const updateData = {
      username: formData.username,
      profileCompleted: true,
    };

    try {
      const updatedUser = await updateProfile(updateData).unwrap();
      dispatch(setCredentials(updatedUser));
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-32  rounded shadow">
      <Heading title="Update Profile" />
      {userInfo?.profileCompleted && (
        <p className="text-green-600 text-sm mb-4">
          ✅ Profile already completed
        </p>
      )}
      <form onSubmit={submitHandler} className="space-y-4">
      <div className="space-y-1">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john2025"
            />
          </div>
        <button
          type="submit"
          className="bg-gray-800 font-bold text-white rounded-md hover:bg-gray-700 cursor-pointer p-2 w-full"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>

        <Link to="/">
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 rounded cursor-pointer"
          >
            <MoveLeft />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ProfilePage;
