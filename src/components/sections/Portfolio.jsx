import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Nền tảng thương mại điện tử hiện đại với React và Node.js',
      image: 'Modern e-commerce website with shopping cart and product gallery',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Ứng dụng ngân hàng di động với UI/UX hiện đại',
      image: 'Mobile banking app interface with modern design',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux'],
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'AI Dashboard',
      description: 'Dashboard quản lý dữ liệu với tích hợp AI',
      image: 'AI analytics dashboard with charts and data visualization',
      category: 'web',
      technologies: ['Vue.js', 'Python', 'TensorFlow', 'D3.js'],
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'Ứng dụng mạng xã hội với tính năng real-time',
      image: 'Social media app with chat and feed features',
      category: 'mobile',
      technologies: ['Flutter', 'Firebase', 'WebSocket'],
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Website portfolio cá nhân với thiết kế sáng tạo',
      image: 'Creative portfolio website with modern animations',
      category: 'design',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'Task Management Tool',
      description: 'Công cụ quản lý công việc cho team',
      image: 'Team collaboration tool with task boards and calendars',
      category: 'web',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma'],
      github: '#',
      demo: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'web', label: 'Web App' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'design', label: 'Design' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">Portfolio</span> của tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Khám phá những dự án tôi đã thực hiện với đam mê và sự tận tâm
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'glass-effect border-border/50 hover:border-primary/50'
              } transition-all duration-300`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img  
                    alt={project.description}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 gradient-text">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;