import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem('user');
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resume Analysis', path: '/resume-analysis' },
    { name: 'Community', path: '/community' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const dropdownVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    open: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      x: '100%',
      transition: { duration: 0.3 }
    }
  };

  const buttonClick = (name) => {
    setActiveButton(name);
    setTimeout(() => setActiveButton(null), 500);
  };

  // Resume document animation
  const documentAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -3, 0, 3, 0],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with document animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                variants={documentAnimation}
                initial="initial"
                animate="animate"
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/20"
              >
                <img 
                  src="/src/assets/logoo.png" 
                  alt="Job Sphere AI Logo" 
                  className="w-8 h-8 object-contain"
                />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-green-200 transition-all">
                Job Sphere AI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  onClick={() => buttonClick(link.name)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                    activeButton === link.name 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                  {activeButton === link.name && (
                    <motion.span 
                      layoutId="activeButton"
                      className="absolute inset-0 bg-emerald-600 rounded-lg z-[-1]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side user section */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden sm:inline font-medium text-gray-200">
                    Hi, {user?.first_name|| 'User'} {user?.last_name|| 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-700 bg-gray-700/50">
                        <p className="text-sm font-medium text-gray-200">Welcome back!</p>
                        <p className="text-sm text-emerald-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors border-b border-gray-700"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3 text-emerald-400" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3 text-emerald-400" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login-register"
                  onClick={() => buttonClick('login')}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                    activeButton === 'login' 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-emerald-500 to-green-400 text-gray-900 hover:shadow-md'
                  }`}
                >
                  Login/Signup
                  {activeButton === 'login' && (
                    <motion.span 
                      layoutId="activeButton"
                      className="absolute inset-0 bg-emerald-600 rounded-lg z-[-1]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors ml-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden fixed inset-y-0 right-0 w-72 bg-gray-900 shadow-2xl border-l border-gray-800 z-40"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <img 
                        src="/src/assets/logoo.png" 
                        alt="Job Sphere AI Logo" 
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                      Job Sphere AI
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          buttonClick(link.name);
                        }}
                        className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                          activeButton === link.name 
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {isLoggedIn ? (
                  <div className="mt-auto p-4 border-t border-gray-800 bg-gray-800/50">
                    <div className="space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium"
                      >
                        <LayoutDashboard className="w-5 h-5 mr-3 text-emerald-400" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 font-medium"
                      >
                        <LogOut className="w-5 h-5 mr-3 text-emerald-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto p-4"
                  >
                    <Link
                      to="/login-register"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        buttonClick('login');
                      }}
                      className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-all ${
                        activeButton === 'login' 
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-emerald-500 to-green-400 text-gray-900 hover:shadow-md'
                      }`}
                    >
                      Login/Signup
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;