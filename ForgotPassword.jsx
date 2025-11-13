import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaKey, FaLock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ onBackToLogin, initialEmail }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(initialEmail || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const token = localStorage.getItem('token');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      const response = await fetch(`http://localhost:8000/job_analysis/forgot-password/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (step === 3 && newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('otp', otp);
      
      if (step === 3) {
        params.append('new_password', newPassword);
      }

      const response = await fetch(`http://localhost:8000/job_analysis/forgot-password/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: params
      });

      const data = await response.json();
      if (response.ok) {
        if (step === 2) {
          setStep(3);
        } else {
          setSuccess(true);
          setTimeout(() => onBackToLogin(), 2000);
        }
      } else {
        setError(data.message || step === 2 ? 'Invalid OTP' : 'Password reset failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-emerald-900 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-500/20 p-8 relative z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Reset Password'}
          </h2>
          <Link to="/login-register">
            <button
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <FaArrowLeft size={14} />
              Back to Login
            </button>
          </Link>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-600/10 border border-red-500/30 text-red-300 rounded-xl p-4 mb-4 relative"
          >
            <div className="flex items-center gap-3">
              <FaLock className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        {otpSent && step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-600/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-4 mb-4 relative"
          >
            <div className="flex items-center gap-3">
              <FaCheckCircle className="w-5 h-5" />
              <span className="text-sm">OTP sent to your email. Please check your inbox.</span>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode='wait'>
          {!success ? (
            <motion.form
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
              onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}
            >
              {/* Step 1: Email Input */}
              {step === 1 && (
                <motion.div variants={itemVariants} className="relative">
                  <FaEnvelope className="absolute top-4 left-4 text-emerald-400 text-lg" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-email"
                    required
                  />
                </motion.div>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <>
                  <motion.div variants={itemVariants} className="relative">
                    <FaEnvelope className="absolute top-4 left-4 text-emerald-400 text-lg" />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-gray-300"
                      value={email}
                      readOnly
                      autoComplete="off"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="relative">
                    <FaKey className="absolute top-4 left-4 text-emerald-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="\d{4}"
                      required
                    />
                  </motion.div>
                </>
              )}

              {/* Step 3: Password Reset */}
              {step === 3 && (
                <>
                  <motion.div variants={itemVariants} className="relative">
                    <FaLock className="absolute top-4 left-4 text-emerald-400 text-lg" />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="relative">
                    <FaLock className="absolute top-4 left-4 text-emerald-400 text-lg" />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full pl-12 pr-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </motion.div>
                </>
              )}

              {error && (
                <motion.div 
                  variants={itemVariants}
                  className="text-red-400 text-sm text-center py-2 px-3 bg-red-900/30 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:from-emerald-500 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    step === 1 ? 'Send OTP' :
                    step === 2 ? 'Verify OTP' :
                    'Reset Password'
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center p-4 bg-emerald-900/20 rounded-full">
                <FaCheckCircle className="text-5xl text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Password Reset Successful!
              </h3>
              <p className="text-gray-300">
                Redirecting to login page...
              </p>
              <div className="pt-4">
                <div className="h-1 w-full bg-emerald-900/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;