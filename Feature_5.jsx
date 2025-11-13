import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Rocket, Smartphone, UserCheck, Globe, Mail, Zap } from 'lucide-react';
import { Link } from "react-router-dom";

const Feature_5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI resume analysis work?",
      answer: "Our advanced ML models scan your resume for 50+ key factors including keyword optimization, ATS compatibility, and industry-specific requirements, providing actionable insights in seconds."
    },
    {
      question: "Is my personal data secure?",
      answer: "We employ enterprise-grade encryption and strict privacy controls. Your data is never shared or sold to third parties."
    },
    {
      question: "Can I contact HR professionals directly?",
      answer: "Our community features allow verified communication with HR experts while maintaining professional boundaries and privacy standards."
    },
    {
      question: "What makes Job Sphere AI different?",
      answer: "We combine AI precision with human expertise and community wisdom for a holistic career development approach."
    },
    {
      question: "How often should I update my profile?",
      answer: "We recommend updating after any major career development or every 3 months for optimal algorithm performance."
    },
    {
      question: "Do you offer mobile access?",
      answer: "Yes! Our progressive web app works seamlessly across all devices with full feature parity."
    }
  ];

  const stats = [
    { icon: <Rocket className="w-6 h-6" />, value: "2.3s", label: "Avg. Analysis Time" },
    { icon: <Smartphone className="w-6 h-6" />, value: "99.9%", label: "Uptime" },
    { icon: <UserCheck className="w-6 h-6" />, value: "4.8M", label: "Active Users" },
    { icon: <Globe className="w-6 h-6" />, value: "50+", label: "Countries" }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Water Splash Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large water splash shapes */}
        <motion.div 
          className="absolute -top-20 -left-40 w-[800px] h-[800px] opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(0,0,0,0) 70%)"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] opacity-15"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 150,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(0,0,0,0) 70%)"
          }}
        />

        {/* Animated bubbles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/10"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              opacity: 0.3
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 + 50}%`],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <Zap className="w-12 h-12 text-emerald-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Answers to
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {' '}Your Questions
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive knowledge hub - from technical details to career strategies
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Items with enhanced animations */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative overflow-hidden"
              >
                {/* Hover effect layer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 0.3 : 0,
                    scale: hoveredIndex === index ? 1.02 : 1
                  }}
                  className="absolute inset-0 bg-emerald-400/10 rounded-xl"
                  transition={{ duration: 0.3 }}
                />

                {/* Ripple effect */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-xl bg-emerald-400/20"
                  />
                )}

                <motion.div 
                  className={`p-6 backdrop-blur-sm rounded-xl border cursor-pointer transition-all ${
                    activeIndex === index 
                      ? 'border-emerald-400/30 bg-gradient-to-br from-black to-gray-900/50 shadow-lg shadow-emerald-400/10' 
                      : 'border-gray-800 hover:border-emerald-400/20 bg-gray-900/50'
                  }`}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={{ 
                          rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <MessageCircle className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 text-gray-300"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Stats Card with enhanced design */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-gradient-to-br from-black to-gray-900/80 rounded-2xl border border-gray-800 h-fit sticky top-24 shadow-xl shadow-emerald-400/5"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-white mb-8 text-center"
            >
              Our <span className="text-emerald-400">Impact</span> in Numbers
            </motion.h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-5 text-center bg-gray-900/50 rounded-xl border border-gray-800 hover:border-emerald-400/30 transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-center mb-3 text-emerald-400"
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Support CTA with enhanced animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-xl text-center border border-emerald-400/20 relative overflow-hidden"
            >
              {/* Floating particles inside CTA */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-emerald-400/20"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    width: `${3 + Math.random() * 7}px`,
                    height: `${3 + Math.random() * 7}px`,
                    opacity: 0
                  }}
                  animate={{
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100 + 20}%`],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}

              <div className="text-lg font-bold text-white mb-2">
                Still Have Questions?
              </div>
              <p className="text-gray-300 mb-4">
                Our support team is ready to help 24/7
              </p>
              <Link
              to = '/contact-us'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-black rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-400/20 transition-all"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_5;