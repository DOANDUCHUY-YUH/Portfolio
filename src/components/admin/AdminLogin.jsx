import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration, use hardcoded credentials
    // In a real app, you'd validate against a backend
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng trở lại, Admin.",
        className: "bg-green-500 text-white"
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Đăng nhập thất bại!",
        description: "Sai tên đăng nhập hoặc mật khẩu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md glass-effect border-border/50 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200}}
              className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <Shield size={32} className="text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold gradient-text">Admin Đăng Nhập</CardTitle>
            <CardDescription className="text-muted-foreground">Truy cập vào bảng điều khiển quản trị</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Tên đăng nhập (admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary/50 h-12 text-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Mật khẩu (password)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-effect border-border/50 focus:border-primary/50 h-12 text-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 text-lg pulse-glow">
                Đăng Nhập
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              Chỉ dành cho quản trị viên.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;