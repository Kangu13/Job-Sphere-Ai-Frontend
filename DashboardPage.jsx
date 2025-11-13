import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Settings, LogOut, Heart } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return <Profile user={profileData} />;
      case 'posts': return <CommunityPosts />;
      case 'feedbacks': return <SubmittedFeedbacks />;
      case 'settings': return <SettingsPanel />;
      default: return <Profile user={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-emerald-900 flex flex-col">
      <Navbar />
      
      {/* Grid Layout Container */}
      <div className="mt-20 grid grid-cols-[auto_1fr] flex-1">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-black/80 backdrop-blur-lg border-r border-emerald-400/20 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <img
                  src={`${BASE_URL}${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/50"
                />
                <Heart className="absolute -bottom-1 -right-1 h-5 w-5 text-red-500 bg-white rounded-full p-0.5" />
              </div>
              <div>
                <h3 className="text-white font-medium">{profileData.first_name} {profileData.last_name}</h3>
                <p className="text-sm text-emerald-400">{profileData.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'profile', icon: <User size={20} className="text-emerald-400" />, label: 'Profile' },
                { id: 'posts', icon: <MessageSquare size={20} className="text-emerald-400" />, label: 'My Posts' },
                { id: 'feedbacks', icon: <AlertCircle size={20} className="text-emerald-400" />, label: 'Feedbacks' },
                { id: 'settings', icon: <Settings size={20} className="text-emerald-400" />, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-400/30'
                      : 'text-gray-300 hover:bg-emerald-900/30 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg mt-8 transition-all"
              >
                <LogOut size={20} className="text-red-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="h-[calc(100vh-5rem)] overflow-y-auto bg-gradient-to-br from-black/80 to-emerald-900/30">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black/70 backdrop-blur-lg rounded-2xl border border-emerald-400/20 p-8 m-8"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default DashboardPage;