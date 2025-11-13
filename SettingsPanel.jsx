import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SettingsPanel = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [emailData, setEmailData] = useState({
    current: '',
    new: ''
  });

  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoadingPassword(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token missing');
      }

      const response = await fetch('http://localhost:8000/job_analysis/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      if (data.success) {
        toast.success(data.message || 'Password updated successfully');
        setPasswordData({ current: '', new: '', confirm: '' });
      } else {
        throw new Error(data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Error updating password');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingEmail(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token missing');
      }

      const response = await fetch('http://localhost:8000/job_analysis/change_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_email: emailData.current,
          new_email: emailData.new
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update email');
      }

      if (data.success) {
        toast.success(data.message || 'Email updated successfully');
        setEmailData({ current: '', new: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login-register');
      } else {
        throw new Error(data.message || 'Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error(error.message || 'Error updating email');
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-95 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000')] bg-cover bg-blend-overlay p-6">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-gray-900 border border-emerald-500/20"
        />

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-emerald-900/30 border border-emerald-500/20 transition-all hover:shadow-emerald-500/40">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Change Password
            </h3>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-300">Current Password</label>
              <input
                type="password"
                name="current"
                placeholder="Enter current password"
                value={passwordData.current}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800/70 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-300">New Password</label>
              <input
                type="password"
                name="new"
                placeholder="Enter new password"
                value={passwordData.new}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800/70 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-300">Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                placeholder="Confirm new password"
                value={passwordData.confirm}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800/70 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                required
                minLength={8}
              />
            </div>
            
            <button
              type="submit"
              disabled={loadingPassword}
              className={`w-full mt-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-900 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${
                loadingPassword ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loadingPassword ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-emerald-900/30 border border-emerald-500/20 transition-all hover:shadow-emerald-500/40">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Change Email
            </h3>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-300">Current Email</label>
              <input
                type="email"
                name="current"
                placeholder="Enter current email"
                value={emailData.current}
                onChange={handleEmailChange}
                className="w-full bg-gray-800/70 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-300">New Email</label>
              <input
                type="email"
                name="new"
                placeholder="Enter new email"
                value={emailData.new}
                onChange={handleEmailChange}
                className="w-full bg-gray-800/70 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loadingEmail}
              className={`w-full mt-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-900 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${
                loadingEmail ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loadingEmail ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Update Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;