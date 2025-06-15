import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Users, Settings, Briefcase, FileText, ExternalLink, BarChart3, TrendingUp, Users2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const StatCard = ({ title, value, icon, color, delay, link, change }) => {
  const IconComponent = icon;
  const cardContent = (
    <Card className="glass-effect border-border/50 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <IconComponent className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold gradient-text">{value}</div>
        {change && (
          <p className={`text-xs pt-1 flex items-center ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${change.startsWith('+') ? '' : 'transform rotate-180'}`} />
            {change} so với tuần trước
          </p>
        )}
      </CardContent>
      {link && (
        <CardContent className="pt-0 pb-4">
            <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto hover:bg-transparent">
                Xem chi tiết <ExternalLink className="h-3 w-3 ml-1"/>
            </Button>
        </CardContent>
      )}
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="h-full"
    >
      {link ? <Link to={link} className="block h-full">{cardContent}</Link> : cardContent}
    </motion.div>
  );
};

const mockTrafficData = [
  { name: 'T2', LượtTruyCập: 2000 }, { name: 'T3', LượtTruyCập: 2500 },
  { name: 'T4', LượtTruyCập: 1800 }, { name: 'T5', LượtTruyCập: 2780 },
  { name: 'T6', LượtTruyCập: 1890 }, { name: 'T7', LượtTruyCập: 2390 },
  { name: 'CN', LượtTruyCập: 3490 },
];

const mockReferrerData = [
  { name: 'Google', value: 400, color: '#8884d8' },
  { name: 'Facebook', value: 300, color: '#82ca9d' },
  { name: 'Trực tiếp', value: 300, color: '#ffc658' },
  { name: 'Khác', value: 200, color: '#ff8042' },
];


const AdminDashboard = () => {
  const projectCount = JSON.parse(localStorage.getItem('adminProjects'))?.length || 0;
  const blogPostCount = JSON.parse(localStorage.getItem('adminBlogPosts'))?.length || 0;
  const userCount = JSON.parse(localStorage.getItem('adminUsers'))?.length || 0;

  const stats = [
    { title: "Lượt truy cập", value: "1,205", icon: Activity, color: "text-blue-400", change: "+5.2%", link: "/admin/analytics" },
    { title: "Người dùng mới", value: "32", icon: Users2, color: "text-teal-400", change: "+12.0%", link: "/admin/users" },
    { title: "Tổng Dự án", value: projectCount.toString(), icon: Briefcase, color: "text-purple-400", link: "/admin/projects" },
    { title: "Tổng Bài viết", value: blogPostCount.toString(), icon: FileText, color: "text-pink-400", link: "/admin/blog-posts" },
  ];

  const quickActions = [
    { label: "Xem Phân tích", path: "/admin/analytics", icon: BarChart3 },
    { label: "Thêm Dự án", path: "/admin/projects", icon: Briefcase },
    { label: "Viết Bài mới", path: "/admin/blog-posts", icon: FileText },
    { label: "Quản lý Users", path: "/admin/users", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold gradient-text mb-8"
      >
        Bảng Điều Khiển Admin
      </motion.h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
        >
            <Card className="glass-effect border-border/50 shadow-lg h-full">
                <CardHeader>
                    <CardTitle className="gradient-text flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-green-400"/>Lượt truy cập tuần</CardTitle>
                    <CardDescription>Tổng quan lượt truy cập trong 7 ngày qua.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pr-0 -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockTrafficData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                            <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: 'rgba(var(--background-rgb), 0.8)', 
                                    borderColor: 'rgba(var(--border-rgb), 0.5)',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                                itemStyle={{ color: 'var(--foreground)' }}
                                labelStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Line type="monotone" dataKey="LượtTruyCập" stroke="url(#trafficGradient)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} activeDot={{ r: 6, stroke: 'var(--primary-foreground)', fill: 'var(--primary)' }} />
                            <defs>
                                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
        >
            <Card className="glass-effect border-border/50 shadow-lg h-full">
                <CardHeader>
                    <CardTitle className="gradient-text flex items-center"><Globe className="mr-2 h-5 w-5 text-cyan-400"/>Nguồn truy cập</CardTitle>
                    <CardDescription>Phân bổ lượt truy cập theo nguồn.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockReferrerData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {mockReferrerData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'rgba(var(--background-rgb), 0.8)', 
                                    borderColor: 'rgba(var(--border-rgb), 0.5)',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <Card className="glass-effect border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="gradient-text">Truy cập nhanh</CardTitle>
                    <CardDescription>Các tác vụ quản trị thường dùng.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {quickActions.map(action => (
                        <Link to={action.path} key={action.label}>
                            <Button variant="outline" className="w-full glass-effect hover:border-primary/50 hover:bg-primary/10 justify-start text-sm">
                                <action.icon className="mr-2 h-4 w-4" />
                                {action.label}
                            </Button>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <Card className="glass-effect border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="gradient-text">Hoạt động gần đây</CardTitle>
                     <CardDescription>Theo dõi các thay đổi mới nhất.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>Admin đã thêm dự án "Dự án Epsilon".</li>
                        <li>Bài viết "Mẹo CSS nâng cao" đã được xuất bản.</li>
                        <li>Người dùng "new_user_01" đã đăng ký.</li>
                        <li>Cài đặt màu chủ đạo đã được thay đổi.</li>
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;