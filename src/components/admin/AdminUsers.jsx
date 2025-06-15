import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const initialFormData = {
    id: null,
    username: '',
    email: '',
    role: 'user', // 'user' or 'admin'
    createdAt: new Date().toISOString(),
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('adminUsers')) || [
      { id: '1', username: 'john_doe', email: 'john.doe@example.com', role: 'admin', createdAt: '2024-01-10T10:00:00Z' },
      { id: '2', username: 'jane_smith', email: 'jane.smith@example.com', role: 'user', createdAt: '2024-02-15T14:30:00Z' },
    ];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setUsers(users.map(u => u.id === formData.id ? { ...formData } : u));
      toast({ title: "Thành công!", description: "Thông tin người dùng đã được cập nhật." });
    } else {
      setUsers([...users, { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
      toast({ title: "Thành công!", description: "Người dùng mới đã được thêm." });
    }
    setIsFormOpen(false);
    setFormData(initialFormData);
  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    // Prevent deleting the hardcoded admin for now (if any)
    if (id === 'admin' && users.find(u => u.id === id && u.username === 'admin')) {
        toast({ title: "Lỗi!", description: "Không thể xóa tài khoản admin mặc định.", variant: "destructive" });
        setIsDeleteConfirmOpen(false);
        setUserToDelete(null);
        return;
    }
    setUsers(users.filter(u => u.id !== id));
    toast({ title: "Thành công!", description: "Người dùng đã được xóa." });
    setIsDeleteConfirmOpen(false);
    setUserToDelete(null);
  };
  
  const openDeleteConfirm = (user) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Quản lý Người dùng</h1>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white pulse-glow-alt">
          <UserPlus className="mr-2 h-5 w-5" /> Thêm Người dùng
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass-effect border-border/50 focus:border-primary/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="overflow-x-auto glass-effect border border-border/50 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-border/30">
          <thead className="bg-slate-800/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tên người dùng</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vai trò</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ngày tạo</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-600/30 text-purple-300' : 'bg-green-600/30 text-green-300'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck className="h-4 w-4 mr-1 inline-block"/> : <ShieldAlert className="h-4 w-4 mr-1 inline-block"/>}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(user)} className="glass-effect border-yellow-500/50 hover:bg-yellow-500/20 w-8 h-8">
                      <Edit className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openDeleteConfirm(user)} className="glass-effect border-red-500/50 hover:bg-red-500/20 w-8 h-8">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
             <p className="text-center text-muted-foreground py-8">Không tìm thấy người dùng nào.</p>
        )}
      </div>


      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">{currentUser ? 'Chỉnh sửa Người dùng' : 'Thêm Người dùng mới'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Input name="username" value={formData.username} onChange={handleInputChange} placeholder="Tên người dùng" required className="glass-effect" />
            </div>
            <div>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="glass-effect" />
            </div>
            <div>
              <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 rounded-md glass-effect border border-border/50 focus:border-primary/50 focus:ring-primary/50 bg-background text-foreground">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {currentUser && (
                 <p className="text-sm text-muted-foreground">Ngày tạo: {new Date(currentUser.createdAt).toLocaleString('vi-VN')}</p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="glass-effect">Hủy</Button>
              <Button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-2xl">Xác nhận Xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "{userToDelete?.username}" không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)} className="glass-effect">Hủy</Button>
            <Button onClick={() => handleDelete(userToDelete?.id)} className="bg-red-600 hover:bg-red-700 text-white">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminUsers;