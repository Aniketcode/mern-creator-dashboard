import React from "react";
import { Pencil } from "lucide-react";
import Heading from "../components/Heading";
import { formatISTDate } from "../utils/formatDate";

const Th = ({ children }) => (
  <th className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide text-left">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
    {children}
  </td>
);
const UsersTable = ({
  users,
  editCredits,
  setEditCredits,
  handleUpdateCredits,
}) => (
  <div className="overflow-x-auto rounded-xl shadow-md">
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Credits</Th>
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 ? (
          users?.map((user, idx) => (
            <tr
              key={user?._id}
              className={` hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-900"
              }`}
            >
              <Td>{user?.username}</Td>
              <Td>{user?.email}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={editCredits[user._id] ?? user?.credits}
                    onChange={(e) =>
                      setEditCredits({
                        ...editCredits,
                        [user?._id]: e.target.value,
                      })
                    }
                    className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-24 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={() => handleUpdateCredits(user?._id)}
                    className="bg-gray-800 cursor-pointer hover:bg-gray-900 active:bg-gray-700 text-white p-2 rounded-full transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </Td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              className="text-center py-8 text-gray-400 dark:text-gray-500"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const FeedActivitiesTable = ({ activities }) => (
  <div className="overflow-x-auto rounded-xl shadow-md">
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <Th>Username</Th>
          <Th>Action</Th>
          <Th>Time</Th>
        </tr>
      </thead>
      <tbody>
        {activities?.length > 0 ? (
          activities?.map((activity, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-900"
              }`}
            >
              <Td>{activity?.username}</Td>
              <Td>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    activity?.type === "report"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {activity?.type}
                </span>
              </Td>
              <Td> {formatISTDate(activity?.timestamp)}</Td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              className="text-center py-8 text-gray-400 dark:text-gray-500"
            >
              No activity found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = ({
  users,
  editCredits,
  setEditCredits,
  handleUpdateCredits,
  feedActivities,
}) => {
  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 mt-14">
      <Heading title="Admin Dashboard" />

      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          All Users
        </h2>
        {users?.length > 0 ? (
          <UsersTable
            users={users}
            editCredits={editCredits}
            setEditCredits={setEditCredits}
            handleUpdateCredits={handleUpdateCredits}
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        )}
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Feed Activities
        </h2>
        {feedActivities?.length > 0 ? (
          <FeedActivitiesTable activities={feedActivities} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No feed activities found.
          </p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
