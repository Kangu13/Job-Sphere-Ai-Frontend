import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Clipboard, ChevronRight, Phone } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail("");
        setPassword("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setError(null);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/job_analysis/user_login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If response is not successful (status code >= 400)
                if (response.status === 401) {
                    setError('Incorrect password. Please try again.');
                } else if (response.status === 404) {
                    setError('User not found. Please check your email.');
                } else {
                    setError('An error occurred. Please try again.');
                }
                return;
            }

            if (data.error) {
                setError('An error occurred. Please try again.');
                return;
            }

            const userResponse = await fetch(`http://localhost:8000/job_analysis/user_details/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            const userData = await userResponse.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(userData.user));
            navigate("/", { replace: true });
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Client-side validation for required fields
        if (!email || !password || !firstName || !lastName || !username || !phone) {
            let missingFields = [];
            if (!email) missingFields.push('Email');
            if (!password) missingFields.push('Password');
            if (!firstName) missingFields.push('First Name');
            if (!lastName) missingFields.push('Last Name');
            if (!username) missingFields.push('Username');
            if (!phone) missingFields.push('Phone Number');
            
            setError(`${missingFields.join(', ')} are required fields.`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/job_analysis/user_register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    phone_number: phone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 400) {
                    if (data.error && data.error.toLowerCase().includes('email')) {
                        setError('This email is already registered. Please use a different email.');
                    } else {
                        setError(data.error || 'Please fill in all required fields correctly.');
                    }
                } else {
                    setError('An error occurred during registration. Please try again.');
                }
                return;
            }

            if (data.error) {
                if (data.error.toLowerCase().includes('email')) {
                    setError('This email is already registered. Please use a different email.');
                } else {
                    setError(data.error);
                }
                return;
            }

            localStorage.setItem("token", data.token);
            setIsLogin(true);
            setError('Registration successful! Please login to continue.');
        } catch (error) {
            setError('An error occurred during registration. Please try again.');
        }
    };

    // Generate floating squares with emerald color scheme
    const squares = Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 80 + 40;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10;
        const rotate = Math.random() * 45;

        return (
            <div
                key={i}
                className="absolute rounded-lg bg-emerald-900 border border-emerald-500/50"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${posX}%`,
                    top: `${posY}%`,
                    opacity: 0.6,
                    animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
                }}
            />
        );
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Floating squares background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {squares}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/85 to-gray-900/95 z-1" />

                {/* Smoke effect */}
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`green-${i}`}
                            className="absolute rounded-full bg-emerald-400/20"
                            style={{
                                width: `${Math.random() * 200 + 100}px`,
                                height: `${Math.random() * 200 + 100}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                filter: 'blur(40px)',
                                animation: `float ${Math.random() * 30 + 20}s linear infinite`,
                                animationDelay: `${Math.random() * 10}s`,
                                opacity: 0.1 + Math.random() * 0.1
                            }} />
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl relative z-20"
                >
                    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/20">
                        {/* Welcome Section - Glassmorphism Effect */}
                        <motion.div 
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-2/5 bg-black/40 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center relative border-r border-emerald-400/30"
                        >
                            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-900/10 blur-md"></div>
                            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-emerald-900/15 blur-md"></div>
                            
                            <div className="relative z-10">
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent bg-clip-text"
                                >
                                    Hello, Welcome!
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg text-gray-300 mb-8"
                                >
                                    About Us on the screen!
                                </motion.p>
                                
                                {isLogin && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={toggleForm}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-md transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <Clipboard className="w-5 h-5" />
                                        Registration
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>

                        {/* Form Section - Glassmorphism Effect */}
                        <motion.div 
                            initial={{ x: 50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-3/5 bg-black/40 backdrop-blur-sm p-8 md:p-12 border-l border-emerald-400/30"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-between items-center mb-8"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    {isLogin ? "Login" : "Registration"}
                                </h2>
                                {!isLogin && (
                                    <motion.button
                                        whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={toggleForm}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-2 px-6 rounded-xl font-medium text-md transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                        Login
                                    </motion.button>
                                )}
                            </motion.div>

                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                onSubmit={isLogin ? handleLogin : handleRegister}
                                className="space-y-5"
                            >
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-red-600/10 border border-red-500/30 text-red-300 rounded-xl p-4 mb-4 relative"
                                    >
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    </motion.div>
                                )}
                                {!isLogin && (
                                    <>
                                        <motion.div
                                            initial={{ y: 10 }}
                                            animate={{ y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-emerald-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                                        placeholder="Enter your first name"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-emerald-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                                        placeholder="Enter your last name"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-emerald-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                                        placeholder="Enter your username"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone className="h-5 w-5 text-emerald-400" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </>
                                )}

                                <motion.div
                                    initial={{ y: 10 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        {isLogin ? "Email" : "Email"}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            {isLogin ? (
                                                <User className="h-5 w-5 text-emerald-400" />
                                            ) : (
                                                <Mail className="h-5 w-5 text-emerald-400" />
                                            )}
                                        </div>
                                        <input
                                            type={isLogin ? "text" : "email"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                            placeholder={isLogin ? "Enter your username" : "Enter your email"}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 10 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-emerald-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-emerald-900/30 border border-emerald-400/30 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none text-white placeholder-gray-400 transition-all hover:border-emerald-400/50"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </motion.div>

                                {isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="text-right"
                                    >
                                        <Link to='/forgot-password'>
                                        <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm hover:underline transition-colors">
                                            Forgot password?
                                        </a></Link>
                                    </motion.div>
                                )}

                                <motion.button
                                    initial={{ y: 10 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ 
                                        scale: 1.02,
                                        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3 px-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/30"
                                >
                                    {isLogin ? "Login" : "Register"}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <Footer />

            {/* CSS for floating animation */}
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
};

export default LoginRegister;