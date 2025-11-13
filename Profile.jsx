import React, { useState } from 'react';
import { Pencil, Heart } from 'lucide-react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const { data } = await axios.post(`${BASE_URL}job_analysis/edit_user_details/`, new FormData(e.target), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user_details));
      setProfileData(data.user_details);
      toast.success(data.message);
      window.location.reload();
    } else {
      toast.error(data.message);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${BASE_URL}job_analysis/edit_profile_picture/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user_details));
        setProfileData(data.user_details);
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    }
  };

  // Bubble component
  const Bubble = ({ size, left, top, delay }) => (
    <div 
      className="absolute rounded-full bg-emerald-400/10 border border-emerald-400/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animation: `float ${6 + Math.random() * 10}s ease-in-out infinite ${delay}s`,
      }}
    />
  );

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Floating bubbles background */}
      {[...Array(12)].map((_, i) => (
        <Bubble 
          key={i}
          size={20 + Math.random() * 60}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 5}
        />
      ))}

      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/10 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent relative z-10">
        Profile Settings
      </h2>
      
      <div className="flex items-center gap-6 relative z-10">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 p-1 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
              <img
                src={`${BASE_URL}${profileData.profile_picture}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="text-white bg-emerald-600/80 rounded-full p-1.5" size={20} />
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange} 
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">{profileData.name}</h3>
          <p className="text-emerald-300">{profileData.email}</p>
          <p className="text-emerald-300">{profileData.username}</p>
          <p className="text-emerald-300">{profileData.phone_number}</p>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-black/40 border border-emerald-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm transition-all"
            name="first_name"
            value={profileData.first_name}
            onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-black/40 border border-emerald-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm transition-all"
            name="last_name"
            value={profileData.last_name}
            onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-black/40 border border-emerald-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm transition-all"
            name="username"
            value={profileData.username}
            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full bg-black/40 border border-emerald-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 backdrop-blur-sm transition-all"
            name="phone_number"
            value={profileData.phone_number}
            onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
          />
        </div>
        <button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300">
          Update Profile
        </button>
      </form>

      {/* Add this to your global CSS or style tag */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-100px) translateX(20px) rotate(180deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(360deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;