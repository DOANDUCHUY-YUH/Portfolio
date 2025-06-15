import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, Eye, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBlogPosts = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const initialFormData = {
    id: null,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    category: '',
    publishedAt: new Date().toISOString().slice(0, 10),
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('adminBlogPosts')) || [
      { id: '1', title: 'Hướng dẫn React từ A-Z', slug: 'huong-dan-react-a-z', excerpt: 'Bài viết chi tiết về React...', content: 'Nội dung đầy đủ...', tags: 'React,JavaScript', category: 'Tutorial', publishedAt: '2024-05-01' },
      { id: '2', title: 'TailwindCSS cho người mới bắt đầu', slug: 'tailwindcss-cho-nguoi-moi', excerpt: 'Tìm hiểu về TailwindCSS...', content: 'Nội dung đầy đủ...', tags: 'CSS,TailwindCSS', category: 'Frontend', publishedAt: '2024-05-15' },
    ];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminBlogPosts', JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    if (name === 'title' && !formData.id) { // Auto-generate slug for new posts
        newFormData.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setPosts(posts.map(p => p.id === formData.id ? { ...formData, tags: formData.tags.split(',').map(t => t.trim()) } : p));
      toast({ title: "Thành công!", description: "Bài viết đã được cập nhật." });
    } else {
      setPosts([...posts, { ...formData, id: Date.now().toString(), tags: formData.tags.split(',').map(t => t.trim()) }]);
      toast({ title: "Thành công!", description: "Bài viết mới đã được thêm." });
    }
    setIsFormOpen(false);
    setFormData(initialFormData);
  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setCurrentPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post) => {
    setFormData({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags });
    setCurrentPost(post);
    setIsFormOpen(true);
  };
  
  const handleView = (post) => {
    setCurrentPost(post);
    setIsViewOpen(true);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(p => p.id !== id));
    toast({ title: "Thành công!", description: "Bài viết đã được xóa." });
    setIsDeleteConfirmOpen(false);
    setPostToDelete(null);
  };

  const openDeleteConfirm = (post) => {
    setPostToDelete(post);
    setIsDeleteConfirmOpen(true);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Quản lý Bài viết</h1>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white pulse-glow">
          <PlusCircle className="mr-2 h-5 w-5" /> Thêm Bài viết
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass-effect border-border/50 focus:border-primary/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <AnimatePresence>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass-effect border-border/50 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="gradient-text truncate">{post.title}</CardTitle>
                    <CardDescription className="truncate h-10">{post.excerpt}</CardDescription>
                    <div className="flex items-center text-xs text-muted-foreground pt-2">
                      <Calendar className="h-3 w-3 mr-1" /> {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                      {post.category && <span className="ml-2 inline-flex items-center"><Tag className="h-3 w-3 mr-1" /> {post.category}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-1 mb-2">
                        {(Array.isArray(post.tags) ? post.tags : (post.tags || "").split(','))
                         .map(tag => tag.trim())
                         .filter(tag => tag)
                         .map(tag => (
                           <span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" size="icon" onClick={() => handleView(post)} className="glass-effect border-primary/50 hover:bg-primary/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(post)} className="glass-effect border-yellow-500/50 hover:bg-yellow-500/20">
                      <Edit className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openDeleteConfirm(post)} className="glass-effect border-red-500/50 hover:bg-red-500/20">
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
            Không tìm thấy bài viết nào.
          </motion.p>
        )}
      </AnimatePresence>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">{formData.id ? 'Chỉnh sửa Bài viết' : 'Thêm Bài viết mới'}</DialogTitle>
            <DialogDescription>
              {formData.id ? 'Cập nhật thông tin chi tiết của bài viết.' : 'Điền thông tin để tạo bài viết mới.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Tiêu đề bài viết" required className="glass-effect" />
            </div>
             <div>
              <Input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="Slug (URL thân thiện)" required className="glass-effect" />
            </div>
            <div>
              <Textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} placeholder="Mô tả ngắn (excerpt)" required className="glass-effect min-h-[80px]" />
            </div>
            <div>
              <Textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Nội dung bài viết (Markdown hỗ trợ)" required className="glass-effect min-h-[150px]" />
            </div>
            <div>
              <Input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (cách nhau bởi dấu phẩy)" className="glass-effect" />
            </div>
            <div>
              <Input name="category" value={formData.category} onChange={handleInputChange} placeholder="Chuyên mục" className="glass-effect" />
            </div>
            <div>
              <Input type="date" name="publishedAt" value={formData.publishedAt} onChange={handleInputChange} placeholder="Ngày xuất bản" required className="glass-effect" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="glass-effect">Hủy</Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-2xl glass-effect border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">{currentPost?.title}</DialogTitle>
            <DialogDescription>
                Slug: {currentPost?.slug}
            </DialogDescription>
          </DialogHeader>
          {currentPost && (
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <p><strong className="text-primary">Mô tả ngắn:</strong> {currentPost.excerpt}</p>
              <div>
                <strong className="text-primary">Nội dung:</strong>
                <div className="prose prose-sm dark:prose-invert max-w-none mt-1 p-3 border border-border/30 rounded-md bg-background/30">
                    {currentPost.content}
                </div>
              </div>
              <p><strong className="text-primary">Tags:</strong> {(Array.isArray(currentPost.tags) ? currentPost.tags : (currentPost.tags || "").split(','))
                         .map(tag => tag.trim())
                         .filter(tag => tag)
                         .join(', ')}</p>
              <p><strong className="text-primary">Chuyên mục:</strong> {currentPost.category}</p>
              <p><strong className="text-primary">Ngày xuất bản:</strong> {new Date(currentPost.publishedAt).toLocaleDateString('vi-VN')}</p>
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
              Bạn có chắc chắn muốn xóa bài viết "{postToDelete?.title}" không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)} className="glass-effect">Hủy</Button>
            <Button onClick={() => handleDelete(postToDelete?.id)} className="bg-red-600 hover:bg-red-700 text-white">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminBlogPosts;