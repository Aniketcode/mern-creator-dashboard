import React from "react";
import { Save, Bug, Share2 } from "lucide-react";
import Heading from "./Heading";

const FeedCard = ({
  post,
  platform,
  handleSave,
  handleReport,
  handleShare,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md transition-all hover:scale-105 cursor-pointer">
      <Heading title={post?.title} />

      <div className="flex space-x-4 justify-end mt-4">
        <button
          onClick={() => handleSave(post?.id, platform)}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Save <Save size={18} />
        </button>

        <button
          onClick={() => handleReport(post?.id, platform)}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Report <Bug size={18} />
        </button>

        <button
          onClick={() => handleShare(post?.url)}
          className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          Share <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
