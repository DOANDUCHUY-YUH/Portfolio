import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const skills = [
    {
      icon: Code,
      title: 'Phát triển Frontend',
      description: 'React, Vue.js, TypeScript, Tailwind CSS',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Phát triển Backend',
      description: 'Node.js, Python, PostgreSQL, MongoDB',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD, Thiết kế responsive',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Đam mê',
      description: 'Học hỏi công nghệ mới, giải quyết vấn đề',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const stats = [
    { number: '50+', label: 'Dự án hoàn thành' },
    { number: '3+', label: 'Năm kinh nghiệm' },
    { number: '20+', label: 'Khách hàng hài lòng' },
    { number: '100%', label: 'Cam kết chất lượng' }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
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
            Về <span className="gradient-text">Tôi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tôi là một nhà phát triển đam mê với hơn 3 năm kinh nghiệm trong việc tạo ra những ứng dụng web hiện đại và thân thiện với người dùng.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect">
              <img  
                alt="Developer working on multiple monitors with code"
                className="w-full h-96 object-cover"
               src="https://images.unsplash.com/photo-1665667332739-d33305807f07" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold gradient-text">Câu chuyện của tôi</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bắt đầu từ niềm đam mê với công nghệ từ nhỏ, tôi đã phát triển kỹ năng lập trình qua nhiều năm học tập và thực hành. 
              Tôi tin rằng công nghệ có thể thay đổi thế giới và luôn cố gắng tạo ra những sản phẩm có ý nghĩa.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Với kinh nghiệm làm việc với các công ty khởi nghiệp và doanh nghiệp lớn, tôi hiểu rõ tầm quan trọng của việc 
              kết hợp thiết kế đẹp mắt với hiệu suất cao và trải nghiệm người dùng tuyệt vời.
            </p>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center`}>
                    <skill.icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{skill.title}</h4>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;