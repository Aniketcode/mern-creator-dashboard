import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useGetAllUsersQuery,
  useGetFeedActivitiesQuery,
  useUpdateUserCreditsMutation,
} from "../redux/adminSlice";
import {
  useGetCreditsQuery,
  useGetUserProfileQuery,
} from "../redux/creditSlice";
import { toast } from "react-hot-toast";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
const Dashboard =()=> {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: users,
    isLoading,
    error,
  } = useGetAllUsersQuery(undefined, { skip: userInfo?.role !== "admin" });
  const { data: feedActivities = [], isLoading: activitiesLoading } =
    useGetFeedActivitiesQuery(undefined, { skip: userInfo?.role !== "admin" });
  const [editCredits, setEditCredits] = useState({});
  const [updateUserCredits] =
    useUpdateUserCreditsMutation();
  const { data: creditsData, isLoading: creditsLoading } = useGetCreditsQuery(
    undefined,
    { skip: userInfo?.role !== "user" }
  );
  const { data: profileData, isLoading: profileLoading } =
    useGetUserProfileQuery(undefined, { skip: userInfo?.role !== "user" });
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  if (isLoading || activitiesLoading || creditsLoading || profileLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loader />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  if (error)
    return <div>Error: {error.message || "Failed to fetch users"}</div>;

  const handleUpdateCredits = async (userId) => {
    if (!editCredits[userId]) return toast("Enter credits value");
    try {
      await updateUserCredits({ userId, credits: Number(editCredits[userId]) });
      toast("Credits updated!");
    } catch (error) {
      console.error(error);
      toast("Failed to update credits.");
    }
  };

  if (userInfo?.role === "user") {
    return (
      <UserDashboard
        creditsData={creditsData}
        profileData={profileData}
      />
    );
  } else if (userInfo?.role === "admin") {
    return (
      <AdminDashboard
        users={users}
        editCredits={editCredits}
        setEditCredits={setEditCredits}
        handleUpdateCredits={handleUpdateCredits}
        feedActivities={feedActivities}
      />
    );
  } else {
    return null;
  }
}

export default Dashboard;
