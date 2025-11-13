import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${BASE_URL}community/list_posts_by_user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error retrieving posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}community/delete_post/${postToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPosts(posts.filter(post => post.id !== postToDelete));
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error deleting post.');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}community/edit_post/${editingPost.id}/`,
        {
          title: editingPost.title,
          content: editingPost.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setPosts(posts.map(post => post.id === editingPost.id ? response.data.post : post));
        setEditingPost(null);
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error updating post.');
    }
  };

  if (loading) return <div className="text-emerald-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  // Bubble component
  const Bubble = ({ size, left, top, delay }) => (
    <div 
      className="absolute rounded-full bg-emerald-400/10 border border-emerald-400/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animation: `float ${6 + Math.random() * 10}s ease-in-out infinite ${delay}s`,
      }}
    />
  );

  return (
    <div className="space-y-6 relative overflow-hidden min-h-[60vh]">
      {/* Floating bubbles background */}
      {[...Array(8)].map((_, i) => (
        <Bubble 
          key={i}
          size={20 + Math.random() * 60}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 5}
        />
      ))}

      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/10 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent relative z-10">
        My Community Posts
      </h2>
      
      <AnimatePresence>
        {editingPost ? (
          <motion.div
            key="editForm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-black/50 p-6 rounded-lg border border-emerald-400/30 shadow-lg shadow-emerald-500/20 backdrop-blur-sm relative z-10"
          >
            <h3 className="text-lg font-bold text-white mb-4">Edit Post</h3>
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-emerald-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full p-2 rounded border border-emerald-400/30 bg-black/40 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-300 mb-1">Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full p-2 rounded border border-emerald-400/30 bg-black/40 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 text-white transition-colors"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-4 py-2 rounded hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="postsList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 relative z-10"
          >
            {posts.length === 0 && (
              <motion.div
                className="bg-black/50 p-6 rounded-lg border border-emerald-400/30 shadow-lg shadow-emerald-500/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-bold text-white">
                  Nothing Posted by you.
                </h3>
                <p className="mt-2 mb-4 text-emerald-300">
                  Create a new post to get started!
                </p>
                <Link to="/community/new-post">
                  <motion.button
                    className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-4 py-2 rounded hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-500/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create a New Post
                  </motion.button>
                </Link>
              </motion.div>
            )}
            {posts.map(post => (
              <motion.div 
                key={post.id} 
                className="bg-black/50 p-4 rounded-lg border border-emerald-400/30 shadow-lg shadow-emerald-500/10 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-white font-medium">{post.title}</h3>
                <p className="text-emerald-300 text-sm mt-1">{post.content}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-emerald-400 text-xs">{post.created_at}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 text-xs transition-colors"
                      onClick={() => handleDeleteConfirmation(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/80 p-6 rounded-lg border border-emerald-400/30 shadow-xl shadow-emerald-500/20 backdrop-blur-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
              <p className="mt-2 text-emerald-300">Are you sure you want to delete this post?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 text-white transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />

      {/* Add this to your global CSS or style tag */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-100px) translateX(20px) rotate(180deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(360deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityPosts;