import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rating } from "react-simple-star-rating";
import { motion } from "framer-motion";
import { FiSend, FiStar, FiUser, FiClock } from "react-icons/fi";

const BASE_URL = "http://localhost:8000";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({ rating: 5, comment: "" });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userFeedbacks, setUserFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    useEffect(() => {
        if (isAuthenticated) fetchUserFeedbacks();
    }, [isAuthenticated]);

    const fetchUserFeedbacks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/job_analysis/get_feedbacks/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setUserFeedbacks(response.data.feedbacks || []);
            }
        } catch (error) {
            console.error("Error fetching user feedbacks:", error);
            toast.error("Failed to fetch your feedbacks");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        if (!isAuthenticated) {
            setError("Authentication required. Please log in.");
            setIsSubmitting(false);
            navigate('/login');
            return;
        }

        if (!formData.comment || formData.comment.length < 10) {
            setError("Comment must be at least 10 characters");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/job_analysis/add_feedback/`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Feedback submitted successfully!");
                setFormData({ rating: 5, comment: "" });
                fetchUserFeedbacks();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error submitting feedback. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRating = (rate) => {
        setFormData({ ...formData, rating: rate }); // Directly use the 1-5 value
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                {/* Enhanced Background Elements - Smoke and Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Large smoke effects */}
                    <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-emerald-500/5 filter blur-[100px] animate-float1"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-400/8 filter blur-[90px] animate-float2"></div>
                    <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-teal-400/7 filter blur-[80px] animate-float3"></div>
                    
                    {/* Bubble effects */}
                    <div className="absolute top-1/5 right-1/6 w-24 h-24 rounded-full bg-emerald-400/20 filter blur-[20px] animate-bubble1"></div>
                    <div className="absolute bottom-1/4 left-1/6 w-32 h-32 rounded-full bg-teal-300/25 filter blur-[25px] animate-bubble2"></div>
                    <div className="absolute top-1/2 left-1/4 w-28 h-28 rounded-full bg-green-300/20 filter blur-[22px] animate-bubble3"></div>
                    <div className="absolute bottom-1/2 right-1/5 w-20 h-20 rounded-full bg-emerald-300/30 filter blur-[15px] animate-bubble4"></div>
                </div>

                {/* Background Animation CSS */}
                <style>
                    {`
                    @keyframes float1 {
                        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
                        50% { transform: translate(50px, 30px) scale(1.1); opacity: 0.08; }
                    }
                    @keyframes float2 {
                        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.08; }
                        50% { transform: translate(-40px, 20px) scale(1.05); opacity: 0.12; }
                    }
                    @keyframes float3 {
                        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.07; }
                        50% { transform: translate(30px, -30px) scale(1.08); opacity: 0.1; }
                    }
                    @keyframes bubble1 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(15px, 20px) scale(1.2); }
                    }
                    @keyframes bubble2 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(-20px, 15px) scale(1.15); }
                    }
                    @keyframes bubble3 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(10px, -25px) scale(1.1); }
                    }
                    @keyframes bubble4 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(-15px, -10px) scale(1.25); }
                    }
                    .animate-float1 { animation: float1 18s ease-in-out infinite; }
                    .animate-float2 { animation: float2 22s ease-in-out infinite; }
                    .animate-float3 { animation: float3 20s ease-in-out infinite; }
                    .animate-bubble1 { animation: bubble1 8s ease-in-out infinite; }
                    .animate-bubble2 { animation: bubble2 10s ease-in-out infinite; }
                    .animate-bubble3 { animation: bubble3 12s ease-in-out infinite; }
                    .animate-bubble4 { animation: bubble4 9s ease-in-out infinite; }
                    `}
                </style>
                
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-3">Share Your Feedback</h1>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            We value your opinion! Let us know about your experience and help us improve.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Feedback Form */}
                        <motion.div variants={itemVariants}>
                            <form 
                                onSubmit={handleSubmit} 
                                className="p-8 bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                                    <FiSend className="text-emerald-400" /> 
                                    Submit Feedback
                                </h2>
                                
                                {error && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm mb-4 p-3 bg-red-900/30 rounded-lg"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">
                                        Rating (1-5)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Rating
                                            onClick={handleRating}
                                            initialValue={formData.rating}
                                            size={30}
                                            allowFraction={false}
                                            fillColor="#10b981"
                                            emptyColor="#4b5563"
                                            transition
                                        />
                                        <span className="text-emerald-400 font-medium">
                                            {formData.rating} / 5
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">
                                        Your Feedback
                                    </label>
                                    <textarea
                                        name="comment"
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                        required
                                        minLength="10"
                                        placeholder="Share your thoughts (minimum 10 characters)..."
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                                        rows="5"
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                                        isSubmitting 
                                            ? 'bg-emerald-700 cursor-not-allowed' 
                                            : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-emerald-500/20'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend /> Submit Feedback
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* User Feedbacks */}
                        <motion.div variants={itemVariants}>
                            <div className="p-8 bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg h-full">
                                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                                    <FiUser className="text-blue-400" /> 
                                    Your Previous Feedbacks
                                </h2>
                                
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-40">
                                        <div className="animate-pulse flex flex-col items-center">
                                            <div className="h-8 w-8 bg-emerald-400 rounded-full mb-2"></div>
                                            <p className="text-gray-300">Loading your feedbacks...</p>
                                        </div>
                                    </div>
                                ) : userFeedbacks.length === 0 ? (
                                    <div className="text-center py-10">
                                        <FiStar className="mx-auto text-3xl text-gray-500 mb-3" />
                                        <p className="text-gray-400">You haven't submitted any feedback yet.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                        {userFeedbacks.map((f) => (
                                            <motion.div 
                                                key={f.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-emerald-500/50"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Rating
                                                            readonly
                                                            initialValue={f.rating}
                                                            size={20}
                                                            allowFraction={false}
                                                            fillColor="#10b981"
                                                            emptyColor="#4b5563"
                                                        />
                                                        <span className="text-sm text-emerald-400">
                                                            {f.rating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-400">
                                                        <FiClock className="mr-1" />
                                                        {new Date(f.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <p className="text-gray-200">{f.comment}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            
            <Footer />
        </>
    );
};

export default FeedbackForm;