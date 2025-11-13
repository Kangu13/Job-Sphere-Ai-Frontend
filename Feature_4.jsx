import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, ChevronRight, User, Sparkle } from 'lucide-react';
import { Link } from "react-router-dom";

const Feature_4 = () => {
  const testimonials = [
    {
      name: "Emily Rodriguez",
      role: "Recent Graduate",
      feedback: "Job Sphere AI completely transformed my job search! The resume analysis pointed out improvements I never would have considered. Landed 3 interviews in 2 weeks!",
      rating: 5,
      likes: 128,
      comments: 15
    },
    {
      name: "David Chen",
      role: "Career Changer",
      feedback: "The community insights helped me negotiate a 20% higher salary. This platform is worth its weight in gold for anyone serious about their career.",
      rating: 5,
      likes: 245,
      comments: 29
    },
    {
      name: "Sarah Johnson",
      role: "HR Professional",
      feedback: "As a recruiter, I'm impressed by how well-prepared Job Sphere AI users are. Their resumes are always optimized and application strategies are on point.",
      rating: 4.5,
      likes: 189,
      comments: 22
    }
  ];

  // Generate random sparkles
  const sparkles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Sparkling background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, sparkle.size, 0],
              x: [sparkle.x + '%', (sparkle.x + Math.random() * 10 - 5) + '%'],
              y: [sparkle.y + '%', (sparkle.y + Math.random() * 10 - 5) + '%']
            }}
            transition={{
              delay: sparkle.delay,
              duration: sparkle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className="absolute text-emerald-400"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`
            }}
          >
            <Sparkle className="w-3 h-3" />
          </motion.div>
        ))}
        
        {/* Animated gradient circles */}
        <motion.div 
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Hear From Our
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
            >
              {' '}Success Stories
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-emerald-200 max-w-2xl mx-auto"
          >
            Discover how Job Sphere AI has transformed careers and empowered professionals worldwide
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                type: 'spring',
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group relative p-8 bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10"
            >
              {/* Floating sparkle effect on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -top-2 -right-2 text-emerald-400"
              >
                <Sparkle className="w-5 h-5" />
              </motion.div>

              {/* User Profile */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center mb-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-emerald-300">{testimonial.role}</p>
                </div>
              </motion.div>

              {/* Rating Stars */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center mb-4"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Star
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-emerald-400 fill-emerald-400' : 'text-gray-600'}`}
                    />
                  </motion.div>
                ))}
                <span className="ml-2 text-emerald-300">
                  ({testimonial.rating})
                </span>
              </motion.div>

              {/* Feedback Text */}
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-emerald-100 mb-6 italic"
              >
                "{testimonial.feedback}"
              </motion.p>

              {/* Interaction Stats */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between text-emerald-300"
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center"
                  >
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    {testimonial.likes}
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {testimonial.comments}
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring' }}
          whileHover={{ scale: 1.01 }}
          className="mt-16 p-8 bg-gradient-to-r from-emerald-900/30 to-green-900/30 backdrop-blur-lg rounded-2xl border border-emerald-500/20 text-center relative overflow-hidden"
        >
          {/* Floating sparkles in CTA */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, 15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute text-emerald-400 text-opacity-70 ${i % 2 ? 'w-4 h-4' : 'w-3 h-3'}`}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 60}%`
              }}
            >
              <Sparkle className="w-full h-full" />
            </motion.div>
          ))}
          
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Transform Your Career?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-emerald-200 mb-8 max-w-xl mx-auto"
          >
            Join thousands of successful professionals who've accelerated their career growth with Job Sphere AI
          </motion.p>
          <Link
              to = '/community'
            >
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all relative overflow-hidden"
          >
            <span className="relative z-10">Share Your Success Story</span>
            <motion.span
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;