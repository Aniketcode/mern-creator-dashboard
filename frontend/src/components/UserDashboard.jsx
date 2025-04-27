import { formatISTDate } from "../utils/formatDate";

const UserDashboard = ({ creditsData, profileData }) => {
  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 mt-14">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-800 dark:text-gray-100">
        User Dashboard
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Your Credit Balance
        </h2>
        <p className="text-2xl text-green-600 font-bold">
          {creditsData?.credits || 0} Points
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Saved Posts
        </h2>
        {profileData?.savedPosts?.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {profileData?.savedPosts?.map((post, idx) => (
              <li
                key={idx}
                className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded-md list-none"
              >
                Post Id : {post?.postId}{" "} ,  {" "} Source Id: ({post?.source})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No saved posts yet.
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Recent Activities
        </h2>
        {profileData?.recentActivities?.length > 0 ? (
          <ul className="space-y-3">
            {profileData?.recentActivities?.map((activity, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                      activity?.type === "report"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {activity?.type}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                {
                  formatISTDate(activity?.timestamp)
                }
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No recent activity.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
