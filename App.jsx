import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegister';
import CommunityPage from './pages/CommunityPage';
import PostDetail from './components/Community/PostDetail';
import NewPost from './components/Community/NewPost';
import ContactUs from './pages/ContactUs';
import FeedbackForm from './pages/FeedbackPage';
import ResumeAnalysis from './pages/ResumeAnalysis';
import DashboardPage from './pages/DashboardPage';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/new-post" element={<NewPost />} />
        <Route path="/community/posts/:id" element={<PostDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}
export default App;

