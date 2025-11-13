import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const BASE_URL = 'http://localhost:8000/';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

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
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                        // Initialize like state from post data if available
                        setIsLiked(response.data.post.is_liked || false);
                        setLikeCount(response.data.post.like_count || 0);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    };

    const toggleLike = async () => {
        if (!token) {
            window.location.href = "/login-register";
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}community/toggle_like/${id}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setIsLiked(!isLiked);
                setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return (
        <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 ${darkMode ? 'border-emerald-500' : 'border-orange-500'}`}></div>
        </div>
    );
    
    if (!post) return (
        <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            <p>Post not found.</p>
        </div>
    );

    return (
        <>
            {/* Smoke and Wave Background */}
            <div className={`fixed inset-0 -z-10 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ib3BhY2l0eSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-20 ${darkMode ? 'bg-emerald-900/20' : 'bg-orange-500/20'}`} 
                     style={{backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDEyMCI+PHBhdGggZD0iTTAgNDVjMTIwIDAgMjQwLTMwIDM2MC0zMHMyNDAgMzAgMzYwIDMwIDI0MC0zMCAzNjAtMzAgMjQwIDMwIDM2MCAzMHYzMEgwVjQ1eiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==")'}}></div>
            </div>

            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
            
            <main className={`flex-grow px-10 py-6 max-w-6xl mx-auto min-h-screen transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <button 
                    onClick={() => navigate("/community")}
                    className={`mb-4 flex items-center ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-blue-500 hover:text-blue-700'}`}
                >
                    <ArrowUturnLeftIcon className="w-5 h-5 mr-1" />
                    Back to posts
                </button>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg mb-6`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-gray-900'}`}>{post.post.title}</h1>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Created at: {new Date(post.post.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-orange-200 text-orange-800'}`}>
                                Post Detail
                            </span>
                            <button
                                onClick={toggleLike}
                                className={`p-2 rounded-full transition-colors ${
                                    darkMode 
                                        ? isLiked 
                                            ? 'bg-emerald-600 hover:bg-emerald-700' 
                                            : 'bg-gray-700 hover:bg-gray-600'
                                        : isLiked 
                                            ? 'bg-orange-500 hover:bg-orange-600' 
                                            : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {isLiked ? (
                                        <HeartSolidIcon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-white'}`} />
                                    ) : (
                                        <HeartIcon className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                                    )}
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {likeCount}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <hr className={`my-4 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />

                    <div className="mt-4 pb-4">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-emerald-300' : 'text-gray-800'}`}>Post</h2>
                        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.post.content}</p>
                    </div>

                    {post.post.image && (
                        <div className="mt-4 pb-4">
                            <h2 className={`text-lg font-semibold ${darkMode ? 'text-emerald-300' : 'text-gray-800'}`}>Related Image</h2>
                            <img 
                                src={`${BASE_URL}${post.post.image}`} 
                                alt="Post" 
                                className="w-64 h-64 object-cover rounded-lg mt-2 border-2 border-gray-300 dark:border-gray-600" 
                            />
                        </div>
                    )}

                    {post.post.user && (
                        <div className="mt-4">
                            <h2 className={`text-lg font-semibold ${darkMode ? 'text-emerald-300' : 'text-gray-800'}`}>Author</h2>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{post.post.user}</p>
                        </div>
                    )}
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-emerald-400' : 'text-gray-900'}`}>Comments</h2>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Drop your suggestions or advice to start discussions.</p>

                    {/* Comment Input */}
                    <textarea
                        className={`w-full p-3 rounded mt-4 focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500' : 'border border-gray-300 focus:ring-2 focus:ring-orange-500'}`}
                        rows="3"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className={`mt-3 px-5 py-2 rounded font-medium transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                    >
                        Comment
                    </button>

                    {/* Comments Section */}
                    <div className="mt-5">
                        {post.comments.length > 0 ? (
                            post.comments.map((c) => (
                                <div 
                                    key={c.id} 
                                    className={`flex flex-col py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition-transform hover:scale-[1.005]`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=${darkMode ? '%232ecc71' : '%230D8ABC'}&color=white`}
                                                alt={c.user}
                                                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                            />
                                            <div className="ml-3">
                                                <p className={`font-medium ${darkMode ? 'text-emerald-300' : 'text-gray-800'}`}>{c.user}</p>
                                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{c.content}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleReplyInput(c.id)}
                                            className={`flex items-center ml-2 ${darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-blue-500'}`}
                                        >
                                            <ArrowUturnLeftIcon className="w-5 h-5" />
                                            <span className="ml-1 text-sm">Reply</span>
                                        </button>
                                    </div>

                                    {/* Animated Reply Input */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showReplyInput[c.id] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="mt-3 pl-12">
                                            <div className={`border-l-2 pl-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                                <textarea
                                                    className={`w-full p-2 rounded focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500' : 'border border-gray-300 focus:ring-2 focus:ring-orange-500'}`}
                                                    rows="2"
                                                    placeholder="Write a reply..."
                                                    value={reply[c.id] || ""}
                                                    onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => handleReplySubmit(c.id)}
                                                        className={`px-4 py-1 rounded font-medium ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                                    >
                                                        Post
                                                    </button>
                                                    <button
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className={`px-4 py-1 rounded border ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-800'}`}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies List */}
                                    {c.replies?.length > 0 && (
                                        <div className="mt-2 pl-12">
                                            <div className={`border-l-2 pl-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                                {c.replies.map((reply) => (
                                                    <div key={reply.id} className="py-2 flex items-center">
                                                        <img
                                                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=${darkMode ? '%232ecc71' : '%230D8ABC'}&color=white`}
                                                            alt={reply.user}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                                        />
                                                        <div className="ml-3">
                                                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                                                <span className={`font-medium ${darkMode ? 'text-emerald-300' : 'text-gray-900'}`}>{reply.user}</span>: {reply.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className={`py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No comments yet.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer darkMode={darkMode} />
        </>
    );
};

export default PostDetail;