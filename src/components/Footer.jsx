import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, Phone, MapPin, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/DOANDUCHUY-YUH', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/doanduchuy-yuhz', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/I_am_YuHz', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/uchuy.188992', label: 'Facebook' },
  ];

  const quickLinks = [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Về tôi', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'dduchuy0711@gmail.com' },
    { icon: Phone, text: '+84 944 533 041' },
    { icon: MapPin, text: 'Hồ Chí Minh, Việt Nam' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-black/20 to-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <span className="text-3xl font-bold gradient-text">Doan Duc Huy - Yuhz</span>
                <p className="text-lg text-muted-foreground mt-2">
                  Full-Stack Developer
                </p>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Tạo ra những trải nghiệm web tuyệt vời với đam mê và sự tận tâm. 
                Luôn sẵn sàng cho những thử thách mới và cơ hội hợp tác thú vị.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full glass-effect hover:bg-primary/20 flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-lg font-semibold mb-4 block">Liên kết nhanh</span>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-lg font-semibold mb-4 block">Liên hệ</span>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <info.icon size={16} className="text-primary" />
                    <span className="text-muted-foreground text-sm">{info.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border/50 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} YuHz. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <span>Được tạo với</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>và React</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;