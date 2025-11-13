import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart, Briefcase, Users, ThumbsUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Feature_2 = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-emerald-400" />,
      title: "AI-Powered Insights",
      description: "Get instant feedback on your resume"
    },
    {
      icon: <BarChart className="w-12 h-12 text-emerald-400" />,
      title: "Real-time Analytics",
      description: "Track application progress"
    },
    {
      icon: <Briefcase className="w-12 h-12 text-emerald-400" />,
      title: "Job Match",
      description: "Smart opportunity matching"
    },
    {
      icon: <Users className="w-12 h-12 text-emerald-400" />,
      title: "Active Community",
      description: "Connect with HR professionals"
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-emerald-400" />,
      title: "95% Satisfaction",
      description: "Successful placements"
    },
    {
      icon: <Clock className="w-12 h-12 text-emerald-400" />,
      title: "Time-Saving Tools",
      description: "Automate job search tasks"
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(features.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleFeatures = features.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-gray-800/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-800/20 to-emerald-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Why Students
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {' '}Choose Us?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how Job Sphere AI becomes your ultimate career companion
          </p>
        </motion.div>

        {/* Scrapbook Slider */}
        <div className="relative h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {visibleFeatures.map((feature, index) => (
                  <motion.div
                    key={`${currentPage}-${index}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative h-full"
                  >
                    {/* Scrapbook Page Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border-l-4 border-t-4 border-emerald-400/30 transform -rotate-1 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border-r-4 border-b-4 border-emerald-400/30 transform rotate-1 -z-10" />
                    
                    <div className="relative h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg border border-emerald-400/20 hover:border-emerald-400/40 transition-all flex flex-col items-center justify-center text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-6"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                      
                      {/* Scrapbook Sticker Effect */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-400/20 rounded-full" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-emerald-400/20 rotate-45" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-emerald-400/30 hover:bg-emerald-400/10 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-400" />
          </button>
          <button 
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-emerald-400/30 hover:bg-emerald-400/10 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-emerald-400" />
          </button>
          
          {/* Page Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentPage === index ? 'bg-emerald-400 w-6' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mt-20 p-8 rounded-2xl bg-black/60 backdrop-blur-lg border border-emerald-400/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "85%", label: "Interview Success" },
              { value: "4.9/5", label: "User Rating" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scrapbook Tape Decoration */}
      <div className="absolute top-20 left-10 w-24 h-6 bg-gray-300/50 rotate-45 opacity-30" />
      <div className="absolute top-32 right-16 w-16 h-4 bg-gray-300/50 -rotate-12 opacity-30" />
      <div className="absolute bottom-20 right-10 w-20 h-5 bg-gray-300/50 rotate-6 opacity-30" />
    </section>
  );
};

export default Feature_2;