import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Save, Palette, Bell, Lock } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const initialSettings = {
    siteName: 'Portfolio Cá Nhân',
    adminEmail: 'admin@example.com',
    maintenanceMode: false,
    themeColor: '#8A2BE2', // BlueViolet
    notificationsEnabled: true,
  };
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('adminSettings'));
    if (storedSettings) {
      setSettings(prev => ({...prev, ...storedSettings}));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    toast({
      title: "Thành công!",
      description: "Cài đặt đã được lưu.",
      className: "bg-green-500 text-white"
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold gradient-text">Cài đặt Chung</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="glass-effect border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl gradient-text"><Palette className="mr-2 h-6 w-6 text-purple-400"/> Thông tin Website</CardTitle>
              <CardDescription>Cấu hình thông tin cơ bản của trang web.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-muted-foreground mb-1">Tên Website</label>
                <Input
                  id="siteName"
                  name="siteName"
                  type="text"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  className="glass-effect"
                />
              </div>
              <div>
                <label htmlFor="adminEmail" className="block text-sm font-medium text-muted-foreground mb-1">Email Quản trị</label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={handleInputChange}
                  className="glass-effect"
                />
              </div>
               <div>
                <label htmlFor="themeColor" className="block text-sm font-medium text-muted-foreground mb-1">Màu chủ đạo</label>
                <Input
                  id="themeColor"
                  name="themeColor"
                  type="color"
                  value={settings.themeColor}
                  onChange={handleInputChange}
                  className="w-full h-10 p-1 glass-effect"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="glass-effect border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl gradient-text"><Bell className="mr-2 h-6 w-6 text-yellow-400"/> Thông báo & Bảo trì</CardTitle>
              <CardDescription>Quản lý thông báo và chế độ bảo trì.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="notificationsEnabled" className="text-sm font-medium text-muted-foreground">Bật thông báo Email</label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="notificationsEnabled"
                        name="notificationsEnabled"
                        checked={settings.notificationsEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/50 dark:peer-focus:ring-purple-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="maintenanceMode" className="text-sm font-medium text-muted-foreground">Chế độ bảo trì</label>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="maintenanceMode"
                        name="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={handleInputChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/50 dark:peer-focus:ring-red-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="glass-effect border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center text-xl gradient-text"><Lock className="mr-2 h-6 w-6 text-green-400"/> Bảo mật</CardTitle>
                    <CardDescription>Cài đặt liên quan đến bảo mật tài khoản admin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full glass-effect hover:bg-primary/10">Đổi mật khẩu Admin</Button>
                    <Button variant="outline" className="w-full glass-effect hover:bg-primary/10">Cấu hình Xác thực hai yếu tố (2FA)</Button>
                </CardContent>
            </Card>
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants} className="flex justify-end">
          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white pulse-glow">
            <Save className="mr-2 h-5 w-5" /> Lưu Cài đặt
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AdminSettings;