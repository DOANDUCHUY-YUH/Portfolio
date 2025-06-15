import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const initialFormData = {
    id: null,
    title: '',
    description: '',
    imageUrl: '',
    tags: '',
    liveLink: '',
    sourceLink: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('adminProjects')) || [
      { id: '1', title: 'Dự án Alpha', description: 'Mô tả dự án Alpha...', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', tags: 'React,Node.js,MongoDB', liveLink: '#', sourceLink: '#' },
      { id: '2', title: 'Nền tảng Beta', description: 'Mô tả nền tảng Beta...', imageUrl: 'https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', tags: 'Vue.js,Firebase', liveLink: '#', sourceLink: '#' },
    ];
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminProjects', JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setProjects(projects.map(p => p.id === formData.id ? { ...formData, tags: formData.tags.split(',').map(t => t.trim()) } : p));
      toast({ title: "Thành công!", description: "Dự án đã được cập nhật." });
    } else {
      setProjects([...projects, { ...formData, id: Date.now().toString(), tags: formData.tags.split(',').map(t => t.trim()) }]);
      toast({ title: "Thành công!", description: "Dự án mới đã được thêm." });
    }
    setIsFormOpen(false);
    setFormData(initialFormData);
  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setCurrentProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project) => {
    setFormData({ ...project, tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags });
    setCurrentProject(project);
    setIsFormOpen(true);
  };
  
  const handleView = (project) => {
    setCurrentProject(project);
    setIsViewOpen(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: "Thành công!", description: "Dự án đã được xóa." });
    setIsDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  const openDeleteConfirm = (project) => {
    setProjectToDelete(project);
    setIsDeleteConfirmOpen(true);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Quản lý Dự án</h1>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white pulse-glow">
          <PlusCircle className="mr-2 h-5 w-5" /> Thêm Dự án
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Tìm kiếm dự án..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass-effect border-border/50 focus:border-primary/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <AnimatePresence>
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass-effect border-border/50 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <CardHeader>
                    <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                      <img src={project.imageUrl || "https://via.placeholder.com/400x225.png?text=No+Image"} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="gradient-text truncate">{project.title}</CardTitle>
                    <CardDescription className="truncate h-10">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <div className="flex flex-wrap gap-2 mb-2">
                        {(Array.isArray(project.tags) ? project.tags : (project.tags || "").split(','))
                         .map(tag => tag.trim())
                         .filter(tag => tag)
                         .map(tag => (
                           <span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" size="icon" onClick={() => handleView(project)} className="glass-effect border-primary/50 hover:bg-primary/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(project)} className="glass-effect border-yellow-500/50 hover:bg-yellow-500/20">
                      <Edit className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openDeleteConfirm(project)} className="glass-effect border-red-500/50 hover:bg-red-500/20">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-8"
          >
            Không tìm thấy dự án nào.
          </motion.p>
        )}
      </AnimatePresence>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">{formData.id ? 'Chỉnh sửa Dự án' : 'Thêm Dự án mới'}</DialogTitle>
            <DialogDescription>
              {formData.id ? 'Cập nhật thông tin chi tiết của dự án.' : 'Điền thông tin để tạo dự án mới.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Tên dự án" required className="glass-effect" />
            </div>
            <div>
              <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Mô tả ngắn" required className="glass-effect" />
            </div>
            <div>
              <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="URL Hình ảnh" className="glass-effect" />
            </div>
            <div>
              <Input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (cách nhau bởi dấu phẩy, vd: React, Node)" className="glass-effect" />
            </div>
            <div>
              <Input name="liveLink" value={formData.liveLink} onChange={handleInputChange} placeholder="Link Demo trực tiếp" className="glass-effect" />
            </div>
            <div>
              <Input name="sourceLink" value={formData.sourceLink} onChange={handleInputChange} placeholder="Link Mã nguồn" className="glass-effect" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="glass-effect">Hủy</Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-lg glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">{currentProject?.title}</DialogTitle>
          </DialogHeader>
          {currentProject && (
            <div className="space-y-4 py-4">
              <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                <img src={currentProject.imageUrl || "https://via.placeholder.com/400x225.png?text=No+Image"} alt={currentProject.title} className="w-full h-full object-cover" />
              </div>
              <p><strong className="text-primary">Mô tả:</strong> {currentProject.description}</p>
              <p><strong className="text-primary">Tags:</strong> {(Array.isArray(currentProject.tags) ? currentProject.tags : (currentProject.tags || "").split(','))
                         .map(tag => tag.trim())
                         .filter(tag => tag)
                         .join(', ')}</p>
              {currentProject.liveLink && currentProject.liveLink !== '#' && (
                <p><strong className="text-primary">Demo:</strong> <a href={currentProject.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{currentProject.liveLink} <ExternalLink className="inline h-4 w-4 ml-1" /></a></p>
              )}
              {currentProject.sourceLink && currentProject.sourceLink !== '#' && (
                <p><strong className="text-primary">Mã nguồn:</strong> <a href={currentProject.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{currentProject.sourceLink} <ExternalLink className="inline h-4 w-4 ml-1" /></a></p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)} className="glass-effect">Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-2xl">Xác nhận Xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa dự án "{projectToDelete?.title}" không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)} className="glass-effect">Hủy</Button>
            <Button onClick={() => handleDelete(projectToDelete?.id)} className="bg-red-600 hover:bg-red-700 text-white">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminProjects;