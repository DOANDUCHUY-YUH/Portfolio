import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Briefcase, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: BarChart3, label: 'Phân tích', path: '/admin/analytics' },
    { icon: Briefcase, label: 'Quản lý Dự án', path: '/admin/projects' },
    { icon: FileText, label: 'Quản lý Bài viết', path: '/admin/blog-posts' },
    { icon: Users, label: 'Quản lý người dùng', path: '/admin/users' },
    { icon: Settings, label: 'Cài đặt', path: '/admin/settings' },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { delay: 0.2 } },
    closed: { opacity: 0, x: -20 },
  };
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      <motion.aside 
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-6 flex flex-col shadow-xl z-40 lg:translate-x-0"
      >
        <motion.div variants={itemVariants} className="text-3xl font-bold mb-10 gradient-text">Admin Panel</motion.div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <motion.li key={item.label} variants={itemVariants} className="mb-3">
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 ${location.pathname === item.path ? 'bg-slate-700/60 ring-2 ring-purple-500' : ''}`}
                  onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-start p-3 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200 text-slate-300"
          >
            <LogOut className="mr-3" size={20} />
            Đăng xuất
          </Button>
        </motion.div>
      </motion.aside>
    </>
  );
};


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`flex-1 p-6 lg:p-10 transition-all duration-300 ${sidebarOpen && window.innerWidth >=1024 ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto">
         {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;