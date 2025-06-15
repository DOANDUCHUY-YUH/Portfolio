import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Globe, MousePointerClick, Clock, MapPin, Smartphone, Monitor } from 'lucide-react';

const mockDailyTraffic = Array.from({ length: 30 }, (_, i) => ({
  name: `Ngày ${i + 1}`,
  LượtTruyCập: Math.floor(Math.random() * (3000 - 500 + 1) + 500),
  NgườiDùngMới: Math.floor(Math.random() * (100 - 10 + 1) + 10),
}));

const mockReferrerData = [
  { name: 'Google', value: 1250, color: '#8884d8' },
  { name: 'Facebook', value: 980, color: '#82ca9d' },
  { name: 'Trực tiếp', value: 850, color: '#ffc658' },
  { name: 'Instagram', value: 500, color: '#ff8042' },
  { name: 'LinkedIn', value: 320, color: '#00C49F' },
  { name: 'Khác', value: 410, color: '#FFBB28' },
];

const mockPageViews = [
  { name: 'Trang chủ', views: 2800 },
  { name: 'Portfolio', views: 1500 },
  { name: 'Blog', views: 1200 },
  { name: 'Về tôi', views: 900 },
  { name: 'Liên hệ', views: 650 },
];

const mockDeviceData = [
    { name: 'Desktop', value: 65, color: '#0088FE' },
    { name: 'Mobile', value: 30, color: '#00C49F' },
    { name: 'Tablet', value: 5, color: '#FFBB28' },
];

const mockGeoData = [
    { name: 'Việt Nam', value: 70, color: '#FF8042' },
    { name: 'Hoa Kỳ', value: 15, color: '#0088FE' },
    { name: 'Nhật Bản', value: 8, color: '#00C49F' },
    { name: 'Khác', value: 7, color: '#FFBB28' },
];

const ChartCard = ({ title, description, icon, children, cardClassName, contentClassName }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`glass-effect border-border/50 shadow-lg ${cardClassName}`}>
        <CardHeader>
          <CardTitle className="gradient-text flex items-center">
            {IconComponent && <IconComponent className="mr-2 h-5 w-5 text-primary" />}
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className={contentClassName || "h-[350px] pr-0 -ml-2 sm:-ml-4"}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminAnalytics = () => {
  const tooltipStyle = { 
    backgroundColor: 'rgba(var(--background-rgb), 0.85)', 
    borderColor: 'rgba(var(--border-rgb), 0.5)',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(4px)',
  };
  const axisTickStyle = { fill: 'var(--muted-foreground)', fontSize: 12 };

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold gradient-text mb-8"
      >
        Phân tích Website
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Lượt truy cập hàng ngày (30 ngày)" description="Theo dõi lượng truy cập và người dùng mới mỗi ngày." icon={TrendingUp}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDailyTraffic}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: 'var(--foreground)' }} labelStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}/>
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="LượtTruyCập" stroke="var(--primary)" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="NgườiDùngMới" stroke="var(--secondary)" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Nguồn truy cập" description="Phân bổ lượt truy cập từ các nguồn khác nhau." icon={Globe}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockReferrerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockReferrerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--background)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Lượt xem trang nhiều nhất" description="Các trang được truy cập nhiều nhất trên website." icon={MousePointerClick} contentClassName="h-[400px] pr-0 -ml-2 sm:-ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPageViews} layout="vertical" margin={{ right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis type="number" tick={axisTickStyle} />
              <YAxis dataKey="name" type="category" tick={axisTickStyle} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="views" fill="var(--primary)" radius={[0, 5, 5, 0]}>
                 {mockPageViews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary-hue), 70%, ${60 - index * 5}%)`} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Phân bổ theo thiết bị" description="Tỷ lệ người dùng truy cập từ các loại thiết bị." icon={Smartphone} contentClassName="h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie data={mockDeviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {mockDeviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--background)" strokeWidth={2}/>
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Phân bổ theo địa lý" description="Lượt truy cập từ các quốc gia khác nhau." icon={MapPin} contentClassName="h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie data={mockGeoData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>
                        {mockGeoData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--background)" strokeWidth={2}/>
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminAnalytics;