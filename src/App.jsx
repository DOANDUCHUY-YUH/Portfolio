import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import WalletSection from '@/components/sections/Wallet';
import ChatbotSection from '@/components/sections/Chatbot';
import Chatbot from '@/components/Chatbot'; 
import CoinChatbot from '@/components/CoinChatbot';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import UsdvnCoinPage from '@/components/sections/UsdvnCoinPage';
import { ThemeProvider } from '@/components/ThemeProvider';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isUsdvnPage = location.pathname === '/usdvnc';
  const [activeSection, setActiveSection] = useState(isUsdvnPage ? 'usdvnc' : 'home');

  useEffect(() => {
    if (isUsdvnPage) {
      setActiveSection('usdvnc'); // Ensure activeSection is set for USDVN page
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'blog', 'contact', 'wallet', 'chatbot-section'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.replace('-section', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUsdvnPage, location.pathname]);

  if (isUsdvnPage) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main>{children}</main>
        <CoinChatbot />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} isUsdvnPage={isUsdvnPage} />
      <main>
        {children}
      </main>
      <Chatbot />
      <Footer />
      <Toaster />
    </div>
  );
};


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LayoutWrapper><Hero /><About /><Portfolio /><Blog /><Contact /><WalletSection /><ChatbotSection /></LayoutWrapper>} />
          <Route path="/usdvnc" element={<LayoutWrapper><UsdvnCoinPage /></LayoutWrapper>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Navigate to="/admin/dashboard" replace />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="blog-posts" element={<AdminBlogPosts />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;