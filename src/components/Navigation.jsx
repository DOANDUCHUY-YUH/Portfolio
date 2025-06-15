import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, BookOpen, Mail, Wallet, MessageCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = ({ activeSection, setActiveSection, isUsdvnPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, path: '/' },
    { id: 'about', label: 'Về tôi', icon: User, path: '/#about' },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase, path: '/#portfolio' },
    { id: 'blog', label: 'Blog', icon: BookOpen, path: '/#blog' },
    { id: 'usdvnc', label: 'USDVN Coin', icon: DollarSign, path: '/usdvnc' },
    { id: 'contact', label: 'Liên hệ', icon: Mail, path: '/#contact' },
  ];

  const handleNavigate = (path, sectionId) => {
    if (path.startsWith('/#')) { // Internal page link
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => { // Wait for navigation then scroll
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    } else { // External page link (like /usdvnc)
      navigate(path);
      setActiveSection(sectionId); // Set active section for the new page
    }
    setIsOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isUsdvnPage ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={() => handleNavigate('/', 'home')}
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigate(item.path, item.id)}
                  className={`flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            {!isUsdvnPage && (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-primary/50 hover:bg-primary/20"
                  onClick={() => scrollToSection('wallet')}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Ví điện tử
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => scrollToSection('chatbot-section')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat AI
                </Button>
              </div>
            )}
             {isUsdvnPage && (
                <div className="hidden md:block">
                    <Link to="/">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600">
                            <Home className="w-4 h-4 mr-2" />
                            Về Trang Chủ
                        </Button>
                    </Link>
                </div>
            )}


            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          className="md:hidden glass-effect border-t border-border/50"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate(item.path, item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            ))}
            {!isUsdvnPage && (
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full glass-effect border-primary/50"
                  onClick={() => scrollToSection('wallet')}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Ví điện tử
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => scrollToSection('chatbot-section')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat AI
                </Button>
              </div>
            )}
            {isUsdvnPage && (
                <div className="pt-4">
                    <Link to="/">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-500">
                            <Home className="w-4 h-4 mr-2" />
                            Về Trang Chủ
                        </Button>
                    </Link>
                </div>
            )}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navigation;