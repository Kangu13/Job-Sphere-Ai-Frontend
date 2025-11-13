import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Reply, Users, TrendingUp, ChevronUp } from 'lucide-react';
import backgroundImage from '../../assets/background.jpg';
import { Link } from "react-router-dom";

const Feature_3 = () => {
  const discussions = [
    {
      id: 1,
      author: "Sarah Johnson",
      role: "Software Engineer",
      content: "Just landed my dream job at Google! The resume analysis feature helped me tailor my CV perfectly. Ask me anything!",
      likes: 245,
      comments: 38,
      replies: [
        "Congratulations Sarah! Can you share how you prepared for the technical round?",
        "How long did the hiring process take?"
      ]
    },
    {
      id: 2,
      author: "Mike Chen",
      role: "HR Manager",
      content: "Pro tip: Always customize your resume's keywords based on the job description. Our AI tools can help with this!",
      likes: 189,
      comments: 22,
      replies: [
        "This helped me get 3x more callbacks!",
        "How specific should the keywords be?"
      ]
    }
  ];

  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Thriving
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                {' '}Community Hub
              </span>
              {/* Water splash effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-md"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0.3 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -inset-3 bg-emerald-400/10 rounded-full blur-sm"
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect, collaborate, and grow with professionals and peers in our dynamic discussion platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Community Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="p-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-emerald-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Collaborative Learning</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Real-time Q&A with industry experts",
                  "Peer-to-peer feedback system",
                  "Weekly AMA sessions",
                  "Success story sharing"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <ChevronUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Community Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1.2M+", label: "Daily Interactions" },
                  { value: "95%", label: "Helpful Responses" },
                  { value: "4.8/5", label: "User Rating" },
                  { value: "50K+", label: "Monthly Posts" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-emerald-900/20 rounded-xl border border-emerald-400/20">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Discussion Feed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {discussions.map((post, index) => (
              <div 
                key={post.id}
                className="p-6 bg-black/60 backdrop-blur-sm rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all"
              >
                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">{post.author}</h4>
                    <p className="text-sm text-gray-400">{post.role}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-300 mb-6">{post.content}</p>

                {/* Interactions */}
                <div className="flex items-center space-x-6 text-gray-400">
                  <button className="flex items-center hover:text-emerald-400 transition-colors">
                    <Heart className="w-5 h-5 mr-2" />
                    {post.likes}
                  </button>
                  <button className="flex items-center hover:text-emerald-400 transition-colors">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {post.comments}
                  </button>
                  <button className="hover:text-gray-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Replies Preview */}
                <div className="mt-6 space-y-4">
                  {post.replies.map((reply, idx) => (
                    <div key={idx} className="flex items-start space-x-3 pl-4 border-l-2 border-emerald-400/20">
                      <Reply className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-gray-400">{reply}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-emerald-600/30 to-green-500/30 backdrop-blur-sm rounded-2xl border border-emerald-400/30 text-center cursor-pointer hover:border-emerald-400/50 transition-all"
            >
              <div className="text-xl font-bold mb-2 text-white">Join the Conversation</div>
              <p className="text-gray-300 mb-4">Share your experiences and help others grow</p>
              <Link
              to = '/community'
            >
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-400 text-black rounded-lg font-semibold hover:from-emerald-400 hover:to-green-300 transition-all">
                Start New Discussion
              </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_3;