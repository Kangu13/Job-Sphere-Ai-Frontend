import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import videoBg from "../../assets/vedio.mp4";

const HeroSection = () => {
  const videoRef = useRef(null);
  const stats = [
    { number: "95", label: "Success Rate" },
    { number: "1M", label: "Users Helped" },
    { number: "50k", label: "Jobs Matched" },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented, trying with muted:", error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[115vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Empower Your Career
              <br />
              with <span className="text-emerald-400">AI Intelligence</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Transform your job search with AI-powered resume analysis, smart 
            matching, and community-powered insights. Land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Link
              to = '/resume-analysis'
            >
            <button className="group relative inline-flex items-center px-8 py-4 bg-emerald-600 rounded-xl text-white font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-emerald-700">
              <Rocket className="w-6 h-6 mr-3 animate-pulse" />
              Get Started Free
              <div className="absolute inset-0 rounded-xl border-2 border-white/20 mix-blend-overlay group-hover:border-white/40 transition-all" />
            </button>
            </Link>
          </motion.div>
        </div>

        {/* Upload Resume Section - Now with black background */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 max-w-2xl mx-auto bg-black/60 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <UploadCloud className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-xl text-white mb-2 font-semibold">
              Upload Your Resume to Get Started
            </h3>
            <p className="text-gray-300 mb-4">
              Supported formats: PDF, DOCX, TXT (Max 5MB)
            </p>
            <Link
              to = '/resume-analysis'
            >
            <button className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all shadow-md hover:shadow-lg font-medium">
              <FileText className="w-5 h-5 mr-2" />
              Browse Files
            </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid - Now with black background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 bg-black/60 backdrop-blur-sm rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all shadow-md hover:shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                {stat.number}
                <span className="text-emerald-300">+</span>
              </div>
              <div className="text-gray-200 text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Sparkles Effect (now in emerald) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;