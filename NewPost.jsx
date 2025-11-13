import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/community/create_post/`;

export default function CommunityHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-register", { replace: true });
    }
  }, []);

  // Mouse and orientation effects (existing)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleDeviceOrientation = (e) => {
      if (e.beta && e.gamma) {
        setDeviceOrientation({
          beta: e.beta * 0.1,
          gamma: e.gamma * 0.1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, []);

  // API: Post submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Post created successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate("/community"), 2000);
      } else {
        setError(response.data.message || "Failed to create post.");
      }
    } catch (err) {
      setError("Error submitting post. Please try again.");
    }
  };

  // Generate floating squares with 100% opacity (existing)
  const squares = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 20 + 10;
    const rotate = Math.random() * 45;

    return (
      <div
        key={i}
        className="absolute rounded-lg bg-emerald-900 border border-emerald-500"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          opacity: 1,
          transform: `translate(${mousePosition.x * 20 + deviceOrientation.gamma * 10}px, 
                      ${mousePosition.y * 20 + deviceOrientation.beta * 10}px) 
                      rotate(${rotate}deg)`,
          transition: `transform 0.5s ease-out`,
          animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
        }}
      />
    );
  });

  return (
    <>
      <section className="relative bg-gray-900 min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Floating squares background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {squares}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/85 to-gray-900/95" />

        {/* Content */}
        <div className="max-w-5xl text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent bg-clip-text">
              Hello And Welcome To <br /> 
              Our Community Forum!
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            This is a no-code community forum! If you're new to no-code, you've
            come to the right place. Find like-minded individuals who are
            passionate about no-code and ready to help you take your skills to
            the next level.
          </motion.p>

          {/* New Post Form (API-integrated) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-emerald-500/20 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-emerald-400 text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
                />
              </div>

              <div>
                <label className="block text-emerald-400 text-sm font-medium mb-1">Content</label>
                <textarea
                  placeholder="Share your thoughts..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
                />
              </div>

              <div>
                <label className="block text-emerald-400 text-sm font-medium mb-1">Image (Optional)</label>
                <div className="flex items-center justify-center w-full bg-gray-700 border border-gray-600 rounded-lg p-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full text-gray-300 bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg font-bold transition-all mt-4"
                type="submit"
              >
                Create Post
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 justify-center flex-wrap mt-8"
          >
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30">
              Join Community
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-900/30 font-medium rounded-lg transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: '#00796b', color: 'white' }}
      />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, 20px) rotate(5deg);
          }
          100% {
            transform: translate(-20px, -20px) rotate(-5deg);
          }
        }
      `}</style>
    </>
  );
}