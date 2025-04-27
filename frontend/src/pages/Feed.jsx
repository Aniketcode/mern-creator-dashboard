import Loader from "../components/Loader";
import {
  useGetAggregatedFeedQuery,
  useSavePostMutation,
  useReportPostMutation,
} from "../redux/feedSlice";
import { toast } from "react-hot-toast";
import FeedCard from "../components/FeedCard";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { data: feedData, isLoading, error } = useGetAggregatedFeedQuery();
  const [savePost] = useSavePostMutation();
  const [reportPost] = useReportPostMutation();
  const navigate = useNavigate();

  const handleSave = async (postId, source) => {
    try {
      await savePost({ postId, source });
      toast.success("Post saved +2 credits.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to save post.");
    }
  };

  const handleReport = async (postId, source) => {
    try {
      await reportPost({ postId, source });
      toast.success("Post has been reported.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to report post.");
    }
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url || "https://linkedin.com");
    toast.success("Link copied to clipboard!");
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loader />
        <p className="mt-2 text-gray-600">Loading feed...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-red-500">Error loading feed</p>
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-100 mt-14">
      <Heading title="Feed Aggregator" />
      <div className="space-y-6">
        {feedData?.reddit?.map((post, idx) => (
          <FeedCard
            key={`reddit-${idx}`}
            post={post}
            platform="reddit"
            handleSave={handleSave}
            handleReport={handleReport}
            handleShare={handleShare}
          />
        ))}

        {feedData?.devto?.map((post, idx) => (
          <FeedCard
            key={`devto-${idx}`}
            post={post}
            platform="devto"
            handleSave={handleSave}
            handleReport={handleReport}
            handleShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
