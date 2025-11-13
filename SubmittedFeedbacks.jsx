import { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:8000";

const SubmittedFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case true:
        return <Check className="w-4 h-4 text-green-400" />;
      case false:
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <X className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case true:
        return 'bg-green-400/10 text-green-400';
      case false:
        return 'bg-yellow-400/10 text-yellow-400';
      default:
        return 'bg-red-400/10 text-red-400';
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing');
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/job_analysis/get_feedbacks/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch feedbacks');
        }
        
        setFeedbacks(response.data.feedbacks || []);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError(err.response?.data?.message || 'Failed to fetch feedbacks');
        toast.error('Failed to fetch feedbacks. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalFeedbacks = feedbacks.length;
  const publishedCount = feedbacks.filter(f => f.publish).length;
  const unpublishedCount = feedbacks.filter(f => !f.publish).length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-100">Submitted Feedbacks</h2>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-100 font-medium">Feedback #{feedback.id}</h3>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${getStatusColor(feedback.publish)}`}>
                {getStatusIcon(feedback.publish)}
                <span>{feedback.publish ? 'Published' : 'Unpublished'}</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-2">{feedback.comment}</p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-slate-500 text-xs">{new Date(feedback.created_at).toLocaleDateString()}</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">Rating: {feedback.rating}⭐</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Total Feedbacks</p>
          <p className="text-2xl font-bold text-slate-100">{totalFeedbacks}</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Published</p>
          <p className="text-2xl font-bold text-green-400">{publishedCount}</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Unpublished</p>
          <p className="text-2xl font-bold text-yellow-400">{unpublishedCount}</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Average Rating</p>
          <p className="text-2xl font-bold text-cyan-400">{(feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks).toFixed(2)}⭐</p>
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;
