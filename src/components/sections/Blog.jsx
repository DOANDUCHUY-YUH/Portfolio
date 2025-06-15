import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Xu hướng phát triển web năm 2024',
      excerpt: 'Khám phá những công nghệ và xu hướng mới nhất trong phát triển web mà mọi developer nên biết.',
      image: 'Modern web development workspace with latest technologies',
      date: '2024-01-15',
      readTime: '5 phút đọc',
      category: 'Web Development',
      tags: ['React', 'Next.js', 'AI']
    },
    {
      id: 2,
      title: 'Tối ưu hiệu suất React App',
      excerpt: 'Hướng dẫn chi tiết các kỹ thuật tối ưu hiệu suất cho ứng dụng React từ cơ bản đến nâng cao.',
      image: 'React performance optimization code on screen',
      date: '2024-01-10',
      readTime: '8 phút đọc',
      category: 'React',
      tags: ['Performance', 'Optimization', 'React']
    },
    {
      id: 3,
      title: 'AI trong phát triển phần mềm',
      excerpt: 'Cách AI đang thay đổi cách chúng ta phát triển phần mềm và những công cụ AI hữu ích cho developer.',
      image: 'AI coding assistant helping developer write code',
      date: '2024-01-05',
      readTime: '6 phút đọc',
      category: 'AI',
      tags: ['AI', 'Machine Learning', 'Tools']
    },
    {
      id: 4,
      title: 'Thiết kế UI/UX hiện đại',
      excerpt: 'Những nguyên tắc và xu hướng thiết kế UI/UX mới nhất để tạo ra trải nghiệm người dùng tuyệt vời.',
      image: 'Modern UI/UX design process with wireframes and prototypes',
      date: '2023-12-28',
      readTime: '7 phút đọc',
      category: 'Design',
      tags: ['UI/UX', 'Design', 'User Experience']
    },
    {
      id: 5,
      title: 'Microservices với Node.js',
      excerpt: 'Hướng dẫn xây dựng kiến trúc microservices với Node.js và các best practices cần biết.',
      image: 'Microservices architecture diagram with Node.js',
      date: '2023-12-20',
      readTime: '10 phút đọc',
      category: 'Backend',
      tags: ['Node.js', 'Microservices', 'Architecture']
    },
    {
      id: 6,
      title: 'DevOps cho Frontend Developer',
      excerpt: 'Những kiến thức DevOps cơ bản mà mọi Frontend Developer nên biết để cải thiện workflow.',
      image: 'DevOps pipeline with CI/CD for frontend applications',
      date: '2023-12-15',
      readTime: '9 phút đọc',
      category: 'DevOps',
      tags: ['DevOps', 'CI/CD', 'Frontend']
    }
  ];

  const categories = ['Tất cả', 'Web Development', 'React', 'AI', 'Design', 'Backend', 'DevOps'];

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Blog</span> & Bài viết
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới công nghệ
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="glass-effect border-border/50 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group h-full">
                <div className="relative overflow-hidden">
                  <img  
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                   src="https://images.unsplash.com/photo-1606498679340-0aec3185edbd" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 gradient-text line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/20 transition-all duration-300"
                  >
                    Đọc thêm
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
          >
            Xem thêm bài viết
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;