import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

const Feature_1 = () => {
  const features = [
    'AI-Powered Resume Analysis',
    'Smart Job Matching',
    'HR Community Insights',
    'Real-time Feedback System',
    'Career Growth Analytics'
  ];

  // Generate random sparkles
  const generateSparkles = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full pointer-events-none"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
    ));
  };

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-gray-800/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-800/10 to-emerald-500/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-gray-200">
                  Next-Gen Career Platform
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Revolutionizing Job Search with
                <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  {' '}AI Innovation
                </span>
              </h2>

              <p className="text-xl text-gray-300">
                Job Sphere AI combines cutting-edge machine learning with community-powered insights 
                to transform your career journey. Our platform offers intelligent resume optimization, 
                real-time market analysis, and direct access to industry professionals.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Project Name Highlight with Sparkles */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square bg-black/80 backdrop-blur-xl rounded-3xl border border-emerald-400/30 p-8 overflow-hidden">
              {/* Floating grid pattern */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-grid-emerald-400/5 [mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]" />
              </div>

              {/* Sparkles container */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {generateSparkles(20)}
              </div>

              {/* Animated center element */}
              <div className="relative h-full flex items-center justify-center z-10">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 0.95, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="text-center space-y-6"
                >
                  <div className="inline-block bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-400/30 relative overflow-hidden">
                    <div className="absolute -inset-1 bg-emerald-400/10 rounded-full blur-sm"></div>
                    <span className="text-sm font-medium text-gray-200 relative">
                      Welcome to
                    </span>
                  </div>
                  
                  <h2 className="text-6xl md:text-7xl font-bold relative">
                    <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent relative">
                      Job Sphere
                    </span>
                    <span className="block text-4xl md:text-5xl mt-2 text-gray-200 relative">
                      AI Platform
                    </span>
                    {/* Additional sparkles around the title */}
                    <div className="absolute -inset-4 overflow-hidden pointer-events-none">
                      {generateSparkles(15)}
                    </div>
                  </h2>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_1;