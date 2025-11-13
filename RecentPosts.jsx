import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <section className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Background pattern */}
      <div className={`fixed inset-0 -z-10 opacity-10 ${darkMode ? 'bg-emerald-900' : 'bg-emerald-100'}`} 
           style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Theme toggle */}
        <div className="flex justify-end mb-2">
          <button 
            onClick={toggleTheme}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-gray-900'}`}>Recent Posts</h2>
          <Link to="/community/new-post">
            <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
              New Post
            </button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500' : 'border border-gray-300 focus:ring-2 focus:ring-orange-500'}`}
          />
          <span className={`absolute right-4 top-3 ${darkMode ? 'text-emerald-400' : 'text-gray-500'}`}>🔍</span>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 ${darkMode ? 'border-emerald-500' : 'border-orange-500'}`}></div>
          </div>
        ) : posts.length === 0 ? (
          <div className={`text-center py-10 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to={`/community/posts/${post.id}`}>
              <div className={`p-6 rounded-lg shadow mb-6 flex transition-transform hover:scale-[1.01] ${darkMode ? 'bg-gray-800 hover:bg-gray-750 border-l-4 border-emerald-500' : 'bg-white hover:bg-gray-50 border-l-4 border-orange-500'}`}>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.content.length > 200 ? (
                      <span>
                        {post.content.slice(0, 200)}...
                        <span className={`ml-1 ${darkMode ? 'text-emerald-400 hover:underline' : 'text-blue-500 hover:underline'}`}>
                          Read more
                        </span>
                      </span>
                    ) : (
                      post.content
                    )}
                  </p>

                  {/* Author & Date */}
                  <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p><strong>Author:</strong> {post.user}</p>
                    <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                {/* Image */}
                {post.image && (
                  <img
                    src={`${BASE_URL}${post.image}`}
                    alt="Post Image"
                    className="w-56 h-56 object-cover rounded-lg ml-4 border-2 border-gray-300 dark:border-gray-600"
                  />
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}