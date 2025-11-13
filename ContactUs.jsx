import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, MessageCircle, Send, Zap } from 'lucide-react';

const ContactUs = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Smoke Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-900/20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              width: `${300 + Math.random() * 500}px`,
              height: `${300 + Math.random() * 500}px`,
              opacity: 0.1
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 + 20}%`],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
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
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <Zap className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get In
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions or need support? Our team is ready to help you accelerate your career journey
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-gradient-to-br from-black to-gray-900/80 rounded-2xl border border-emerald-400/20 shadow-xl shadow-emerald-400/10"
          >
            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-300 mb-2">Your Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 rounded-lg border border-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 rounded-lg border border-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-300 mb-2">Message</label>
                <div className="relative">
                  <MessageCircle className="w-5 h-5 text-emerald-400 absolute left-3 top-4" />
                  <textarea
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 rounded-lg border border-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-black font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-br from-black to-gray-900/80 rounded-2xl border border-emerald-400/20 shadow-xl shadow-emerald-400/5"
            >
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-6"
              >
                Contact <span className="text-emerald-400">Information</span>
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="p-3 bg-emerald-500/20 rounded-lg"
                  >
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <p className="text-emerald-400">support@jobsphere.ai</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ rotate: -15 }}
                    className="p-3 bg-emerald-500/20 rounded-lg"
                  >
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone</h4>
                    <p className="text-emerald-400">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="p-3 bg-emerald-500/20 rounded-lg"
                  >
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Address</h4>
                    <p className="text-emerald-400">San Francisco, CA</p>
                    <p className="text-emerald-400">United States</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Support CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-emerald-400/30 relative overflow-hidden"
            >
              {/* Floating emerald particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-emerald-400/20"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    width: `${3 + Math.random() * 5}px`,
                    height: `${3 + Math.random() * 5}px`,
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

              <h3 className="text-xl font-bold text-white mb-4">24/7 Support</h3>
              <p className="text-gray-300 mb-6">
                Our dedicated support team is available round the clock to assist you with any inquiries
              </p>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.7 + item * 0.1 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 border-2 border-white/20"
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  Supported by real humans
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating animated elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-40 -right-40 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(0,0,0,0) 70%)"
        }}
      />
    </section>
  );
};

export default ContactUs;