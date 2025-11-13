import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import { UploadCloud, FileText, Clipboard, ChevronRight, X, Rocket, BookOpen, Briefcase, Star, Zap } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function ResumeAnalysis() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jdText, setJdText] = useState('');
    const [jdFile, setJdFile] = useState(null);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputMode, setInputMode] = useState('text');
    const [dragActive, setDragActive] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
    const [error, setError] = useState('');

    // Mouse and device orientation tracking for floating squares
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };

        const handleDeviceOrientation = (e) => {
            if (e.beta && e.gamma) {
                setDeviceOrientation({
                    beta: e.beta * 0.1,
                    gamma: e.gamma * 0.1
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (window.DeviceOrientationEvent) {
                window.removeEventListener('deviceorientation', handleDeviceOrientation);
            }
        };
    }, []);

    // Generate floating squares with 100% opacity
    const squares = Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10;
        const rotate = Math.random() * 45;

        return (
            <div
                key={i}
                className="absolute rounded-lg bg-emerald-900 border border-emerald-500"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${posX}%`,
                    top: `${posY}%`,
                    opacity: 0.8,
                    transform: `translate(${mousePosition.x * 20 + deviceOrientation.gamma * 10}px, 
                                ${mousePosition.y * 20 + deviceOrientation.beta * 10}px) 
                                rotate(${rotate}deg)`,
                    transition: `transform 0.5s ease-out`,
                    animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
                }}
            />
        );
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF, DOC, or DOCX file');
            return;
        }

        // Validate file size (optional, adjust as needed)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError('File size should not exceed 5MB');
            return;
        }

        if (type === 'resume') {
            setResumeFile(file);
            setError(''); // Clear error if file is valid
        }
        if (type === 'jd') {
            setJdFile(file);
            setError(''); // Clear error if file is valid
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setJdFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);

        // Validate job description
        if (!jdText.trim() && !jdFile) {
            setError('Job description is required');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to use this feature');
            setIsLoading(false);
            return;
        }

        if (!resumeFile) {
            setError('Please upload your resume');
            setIsLoading(false);
            return;
        }

        setError(''); // Clear any previous error

        const formData = new FormData();
        formData.append('resume_pdf', resumeFile);
        if (jdFile) {
            formData.append('job_description_pdf', jdFile);
        } else {
            formData.append('job_description_text', jdText);
        }

        try {
            const response = await axios.post('http://localhost:8000/job_analysis/analyze_resume/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.data.success) {
                setResults({
                    ...response.data,
                    recommendations: response.data.recommendations || []
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error analyzing resume');
        } finally {
            setIsLoading(false);
        }
    };

    const ScoreCard = ({ title, value, color }) => (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-black/40 p-6 rounded-2xl backdrop-blur-sm border border-emerald-400/30 hover:border-emerald-400/50 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
        >
            <div className="w-32 h-32 mx-auto">
                <CircularProgressbar
                    value={value}
                    text={`${Math.round(value)}%`}
                    styles={{
                        path: { stroke: color },
                        text: {
                            fill: '#fff',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px rgba(16, 185, 129, 0.7)'
                        },
                        trail: { stroke: '#1e293b' }
                    }} />
            </div>
            <h3 className="text-white text-center mt-4 text-xl font-bold">
                {title}
            </h3>
        </motion.div>
    );

    const SkillList = ({ title, skills, color }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/40 p-6 rounded-2xl backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
        >
            <div className="flex items-center mb-4 space-x-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-900/50 backdrop-blur-sm border border-emerald-400/30 hover:bg-emerald-800/50 transition-all"
                        style={{ color: '#d1fae5' }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );

    const SummarySection = ({ title, content }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/40 p-6 rounded-2xl backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
        >
            <div className="flex items-center mb-3 space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{content}</p>
        </motion.div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-900">
                {/* Floating squares background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {squares}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/85 to-gray-900/95 z-1" />

                {/* Smoke effect */}
                <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
                    {/* Green smoke */}
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={`green-${i}`}
                            className="absolute rounded-full bg-emerald-400/30"
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
                    
                    {/* Black smoke */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`black-${i}`}
                            className="absolute rounded-full bg-black/40"
                            style={{
                                width: `${Math.random() * 300 + 150}px`,
                                height: `${Math.random() * 300 + 150}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                filter: 'blur(50px)',
                                animation: `float ${Math.random() * 40 + 25}s linear infinite`,
                                animationDelay: `${Math.random() * 15}s`,
                                opacity: 0.8 + Math.random() * 0.8,
                                mixBlendMode: 'multiply'
                            }} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto relative z-20"
                >
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-4xl md:text-5xl font-bold mb-4 text-white"
                        >
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent bg-clip-text">AI-Powered</span> Resume Analysis
                        </motion.h1>
                        <motion.p
                            className="text-gray-300 max-w-xl mx-auto text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontWeight: 'bold' }}
                        >
                            Get instant feedback on your resume's compatibility with any job description using advanced AI analysis
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Upload Section */}
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
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
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
                                <Briefcase className="w-6 h-6 text-emerald-400" />
                                <span>Upload Documents</span>
                            </h2>

                            {/* Resume Upload */}
                            <div className="mb-8">
                                <label className="block text-gray-300 mb-4 font-medium">Upload Resume</label>
                                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-emerald-400/40 rounded-2xl cursor-pointer hover:border-emerald-400/60 transition-all group bg-black/20 hover:bg-black/30">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'resume')}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx" />
                                    <div className="text-center space-y-2">
                                        <UploadCloud className="w-12 h-12 mx-auto text-gray-400 group-hover:text-emerald-400 transition-colors" />
                                        <p className="text-gray-300 group-hover:text-white transition-colors font-medium">
                                            {resumeFile ? resumeFile.name : 'Drag & Drop or Browse Files'}
                                        </p>
                                        <p className="text-sm text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
                                    </div>
                                </label>
                            </div>

                            {/* JD Input Toggle */}
                            <div className="flex gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setInputMode('text')}
                                    className={`flex-1 py-3 rounded-xl transition-all font-medium ${inputMode === 'text'
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-black/30 text-gray-300 hover:bg-black/40 border border-emerald-400/30'}`}
                                >
                                    <Clipboard className="w-5 h-5 inline-block mr-2" />
                                    Paste Text
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setInputMode('file')}
                                    className={`flex-1 py-3 rounded-xl transition-all font-medium ${inputMode === 'file'
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-black/30 text-gray-300 hover:bg-black/40 border border-emerald-400/30'}`}
                                >
                                    <FileText className="w-5 h-5 inline-block mr-2" />
                                    Upload JD
                                </motion.button>
                            </div>

                            {/* JD Input Area */}
                            {inputMode === 'text' ? (
                                <textarea
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    placeholder="Paste job description here..."
                                    className="w-full h-48 p-4 bg-black/30 border border-emerald-400/30 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium transition-all hover:border-emerald-400/50" />
                            ) : (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragActive ? 'border-emerald-400/60 bg-emerald-900/20' : 'border-emerald-400/40 bg-black/20 hover:bg-black/30'}`}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'jd')}
                                        className="hidden"
                                        id="jd-upload"
                                        accept=".pdf,.doc,.docx" />
                                    <label htmlFor="jd-upload" className="cursor-pointer space-y-4">
                                        <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
                                        <p className="text-gray-300 font-medium">
                                            {jdFile ? jdFile.name : 'Drag & Drop JD File'}
                                        </p>
                                    </label>
                                </div>
                            )}

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <span className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                                        Analyzing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center space-x-2">
                                        <Rocket className="w-5 h-5" />
                                        Start Analysis
                                    </span>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Results Section */}
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all space-y-10"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                                        <Star className="w-6 h-6 text-emerald-400" />
                                        <span>Analysis Results</span>
                                    </h2>
                                    <button
                                        onClick={() => setResults(null)}
                                        className="p-2 hover:bg-emerald-900/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-300 hover:text-white" />
                                    </button>
                                </div>

                                {/* Scores Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <ScoreCard
                                        title="Overall Match"
                                        value={results.overall_match_percentage}
                                        color="#10b981" />
                                    <ScoreCard
                                        title="Skills Match"
                                        value={results.skills_match_percentage}
                                        color="#34d399" />
                                </div>

                                {/* Skills Analysis */}
                                <div className="space-y-6">
                                    {results.matching_skills?.length > 0 && (
                                        <SkillList
                                            title="Matched Skills"
                                            skills={results.matching_skills}
                                            color="#6ee7b7" />
                                    )}
                                    {results.missing_skills?.length > 0 && (
                                        <SkillList
                                            title="Missing Skills"
                                            skills={results.missing_skills}
                                            color="#fca5a5" />
                                    )}
                                    {results.extra_skills?.length > 0 && (
                                        <SkillList
                                            title="Extra Skills"
                                            skills={results.extra_skills}
                                            color="#93c5fd" />
                                    )}
                                </div>

                                {/* Summaries */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {results.job_description_summary && (
                                        <SummarySection
                                            title="JD Breakdown"
                                            content={results.job_description_summary} />
                                    )}
                                    {results.resume_summary && (
                                        <SummarySection
                                            title="Resume Insights"
                                            content={results.resume_summary} />
                                    )}
                                </div>

                                {/* Recommendations */}
                                {results.recommendations?.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                            <ChevronRight className="w-5 h-5 text-emerald-400" />
                                            <span>Optimization Tips</span>
                                        </h3>
                                        <ul className="space-y-3">
                                            {results.recommendations.map((rec, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start p-4 bg-emerald-900/10 rounded-xl border border-emerald-400/30 hover:bg-emerald-900/20 transition-all"
                                                >
                                                    <span className="text-emerald-400 mr-2 mt-1">▹</span>
                                                    <span className="text-gray-200">{rec}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                }}
                progressStyle={{ background: 'linear-gradient(to right, #10b981, #34d399)' }} />

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
}

export default ResumeAnalysis;