import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coins, ShieldCheck, Zap, Layers, Eye, TrendingUp, CheckCircle, Cpu, Link as LinkIconExt, BarChart2, Package, Repeat, ExternalLink, Wallet as WalletIcon, Home, Search, Grid, MessageSquare, User, Bell, Settings, Sun, Moon, ArrowRight, MapPin, Building, CircleDollarSign, SlidersHorizontal, Heart, Bookmark, Share2, Info, ShoppingCart, ArrowLeftRight, LogOut } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const formatCurrency = (amount, currency = 'VND') => {
  if (currency === 'USDVN') {
    return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
  name: `Ngày ${i + 1}`,
  Giá: 1000 + (Math.random() - 0.5) * 20, // Giữ biến động nhỏ quanh 1000
}));

const StatCard = ({ icon: Icon, label, value, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
    className="bg-card/50 dark:bg-card/40 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border/50 flex flex-col justify-between h-full"
  >
    <div className="flex items-center text-muted-foreground mb-2">
      <Icon className="w-4 h-4 mr-2 text-primary" />
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
    {trend && <p className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend}</p>}
  </motion.div>
);

const Sidebar = ({ activeNavItem, setActiveNavItem, onThemeToggle }) => {
  const { theme } = useTheme();
  const navItems = [
    { id: 'home', icon: Home, label: 'Trang chủ USDVN' },
    { id: 'market', icon: Search, label: 'Thị trường Coin' },
    { id: 'portfolio', icon: WalletIcon, label: 'Ví của tôi' },
    { id: 'news', icon: MessageSquare, label: 'Tin tức Blockchain' },
    { id: 'profile', icon: User, label: 'Hồ sơ Người dùng' },
    { id: 'settings_sidebar', icon: Settings, label: 'Cài đặt Trang' },
    { id: 'exit', icon: LogOut, label: 'Thoát' },
  ];

  const handleNavClick = (id) => {
    if (id === 'exit') {
      window.location.href = '/';
    } else {
      setActiveNavItem(id);
    }
  };

  return (
    <motion.div 
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-y-0 left-0 w-20 bg-background/80 dark:bg-slate-900/80 backdrop-blur-lg border-r border-border/60 flex flex-col items-center py-6 shadow-2xl z-50"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: -5 }} 
        className="mb-10 p-3 bg-gradient-to-br from-primary to-purple-500 dark:to-purple-600 rounded-xl shadow-lg"
      >
        <Coins className="h-7 w-7 text-primary-foreground" />
      </motion.div>
      <nav className="flex-grow flex flex-col items-center space-y-3">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={cn(
              "p-3 rounded-lg transition-all duration-300 ease-out relative group",
              activeNavItem === item.id ? "bg-primary/20 text-primary scale-110 shadow-md" : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
            )}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </span>
          </motion.button>
        ))}
      </nav>
      <div className="flex flex-col items-center space-y-3 mt-auto">
        <motion.button 
          onClick={onThemeToggle} 
          className="p-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" 
          whileHover={{ scale: 1.15, rotate: 15 }} 
          whileTap={{ scale: 0.95 }}
          title={theme === 'dark' ? 'Chế độ Sáng' : 'Chế độ Tối'}
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </motion.button>
        <motion.button 
          className="p-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" 
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.95 }}
          title="Thông báo"
        >
          <Bell className="h-6 w-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const TopBar = ({ onAction }) => {
  const filters = [
    { id: 'network', label: 'Mạng lưới', icon: Layers, options: ['Tất cả', 'Ethereum', 'BNB Chain', 'Polygon', 'Solana'] },
    { id: 'asset_type', label: 'Loại tài sản', icon: Package, options: ['Tất cả', 'Stablecoin', 'Utility Token', 'Governance'] },
  ];

  return (
    <motion.div 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      className="fixed top-0 left-20 right-0 h-16 bg-background/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-border/60 flex items-center px-6 shadow-lg z-40"
    >
      <div className="flex items-center space-x-3 mr-auto">
        {filters.map(filter => (
          <Select key={filter.id} onValueChange={(value) => onAction('filter_changed', { filter: filter.id, value })}>
            <SelectTrigger className="w-auto min-w-[150px] bg-transparent border-border/70 hover:border-primary/70 focus:ring-primary/50 text-sm h-9 rounded-lg shadow-sm">
              <filter.icon className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/70 shadow-xl">
              {filter.options.map(opt => <SelectItem key={opt} value={opt.toLowerCase().replace(/ /g, '_')} className="text-sm">{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        ))}
         <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary h-9">
          <SlidersHorizontal className="h-4 w-4 mr-2" /> Thêm bộ lọc
        </Button>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="border-primary/70 text-primary hover:bg-primary/10 hover:text-primary h-9 font-medium shadow-sm">
          <ShoppingCart className="h-4 w-4 mr-2" /> Mua USDVN
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-primary to-purple-500 dark:to-purple-600 hover:opacity-90 text-primary-foreground h-9 font-medium shadow-md">
          Giao dịch ngay <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

const InfoCard = ({ title, description, details, imageText, onAction, className }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.5 }}
    className={cn("w-full bg-background/85 dark:bg-slate-800/85 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-border/60", className)}
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
          <span>Neo giá: 1 USDVN = 1,000 VND</span>
        </div>
      </div>
      <motion.div 
        className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 dark:to-purple-600 rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px hsla(var(--primary-rgb), 0.5)"}}
        onClick={() => onAction('view_coin_details', { title })}
      >
        {imageText}
      </motion.div>
    </div>
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-5">
      {details.map(detail => (
        <div key={detail.label} className="flex items-center">
          <detail.icon className="w-4 h-4 mr-2 text-primary/80" />
          <span className="text-muted-foreground">{detail.label}:</span>
          <span className="ml-auto font-medium text-foreground">{detail.value}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        {[Heart, Bookmark, Share2].map((Icon, idx) => (
          <Button key={idx} variant="ghost" size="icon" className="w-9 h-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full" onClick={() => onAction('social_action', { action: Icon.displayName || Icon.name.toLowerCase() })}>
            <Icon className="w-5 h-5" />
          </Button>
        ))}
      </div>
      <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold" onClick={() => onAction('learn_more_coin', { title })}>
        Tìm hiểu thêm <Info className="w-4 w-4 ml-2" />
      </Button>
    </div>
  </motion.div>
);


const UsdvnCoinPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [userUsdvnBalance, setUserUsdvnBalance] = useState(0);

  useEffect(() => {
    const storedWalletData = JSON.parse(localStorage.getItem('walletData'));
    if (storedWalletData && storedWalletData.balances && storedWalletData.balances.USDVN) {
      setUserUsdvnBalance(storedWalletData.balances.USDVN);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleAction = (type, payload) => {
    console.log("Action:", type, payload);
    toast({ 
      title: `Hành động: ${type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`, 
      description: payload ? `Chi tiết: ${JSON.stringify(payload)}` : "Một hành động đã được thực hiện." 
    });
  };

  const pageData = {
    hero: {
      title: "USDVN Coin",
      subtitle: "Giải pháp Stablecoin Tiên phong cho Thị trường Việt Nam",
      description: "Trải nghiệm sự ổn định và hiệu quả vượt trội với USDVN - stablecoin được thiết kế để cách mạng hóa giao dịch kỹ thuật số. Neo giá 1:1000 với VND, USDVN mang lại sự minh bạch, an toàn và tốc độ cho mọi nhu cầu thanh toán của bạn.",
    },
    infoCard: {
      title: "USDVN Stablecoin",
      description: "USDVN là cầu nối giữa tài chính truyền thống và thế giới blockchain, cung cấp một giải pháp thanh toán kỹ thuật số tin cậy và dễ tiếp cận.",
      imageText: "U",
      details: [
        { label: "Tổng cung", value: "1B USDVN", icon: Package },
        { label: "Mạng lưới", value: "ERC-20 & BEP-20", icon: Layers },
        { label: "Giá trị Ví dụ", value: formatCurrency(userUsdvnBalance * 1000), icon: CircleDollarSign },
        { label: "Giao dịch/ngày", value: "2.1M+", icon: ArrowLeftRight },
      ]
    },
    stats: [
      { icon: BarChart2, label: "Giá (USDVN/VND)", value: "1,000", trend: "+0.02%" },
      { icon: ShoppingCart, label: "KLGD (24h)", value: formatCurrency(21000000000), trend: "+7.1%" },
      { icon: Package, label: "Vốn hóa", value: formatCurrency(750000000000), trend: "+2.3%" },
      { icon: TrendingUp, label: "Người nắm giữ", value: "18,700+", trend: "+310 mới" },
    ],
  };

  const mainContentMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.4, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 dark:from-slate-950 dark:via-gray-900 dark:to-black text-foreground overflow-hidden">
      <Sidebar activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} onThemeToggle={handleThemeToggle} />
      <TopBar onAction={handleAction}/>

      <main className="flex-1 ml-20 mt-16 overflow-y-auto p-8 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.03] dark:opacity-[0.02]" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1640955033017-c9265011e0dd?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/10 dark:from-primary/20 via-transparent to-transparent opacity-40 dark:opacity-30 blur-3xl rounded-full pointer-events-none transform -translate-y-1/3"></div>
        
        <div className="relative z-10">
          <motion.section 
            id="hero-usdvnc" 
            className="mb-12 pt-10"
            initial="initial"
            animate="animate"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 dark:from-primary dark:via-purple-400 dark:to-pink-400"
              variants={{ initial: { y: -30, opacity: 0 }, animate: { y: 0, opacity: 1, transition:{duration: 0.6, ease: "circOut"} } }}
            >
              {pageData.hero.title}
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6"
              variants={{ initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1, transition:{duration: 0.6, ease: "circOut"} } }}
            >
              {pageData.hero.subtitle}
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed"
              variants={{ initial: { opacity: 0 }, animate: { opacity: 1, transition:{duration: 0.7} } }}
            >
              {pageData.hero.description}
            </motion.p>
          </motion.section>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" {...mainContentMotion}>
            {pageData.stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} delay={idx} />
            ))}
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <motion.section 
              id="price-chart-usdvnc" 
              className="lg:col-span-2" 
              {...mainContentMotion} 
              transition={{ ...mainContentMotion.transition, delay: 0.6 }}
            >
              <Card className="h-full bg-card/60 dark:bg-card/50 backdrop-blur-md shadow-xl border-border/60">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground">Biểu đồ giá USDVN/VND</CardTitle>
                  <CardDescription className="text-muted-foreground">Diễn biến giá trị USDVN (Mô phỏng)</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] p-2 pr-6 -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockPriceData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorPriceChart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary-hsl))" stopOpacity={0.7}/>
                          <stop offset="95%" stopColor="hsl(var(--primary-hsl))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" />
                      <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}} />
                      <YAxis domain={[970, 1030]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(value) => `${value}`} axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', boxShadow: 'var(--shadow-lg)' }}
                        itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                        labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                        formatter={(value) => [`${value.toFixed(0)} VND`, "Giá USDVN"]}
                      />
                      <Area type="monotone" dataKey="Giá" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPriceChart)" activeDot={{ r: 6, strokeWidth: 2, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.section>

            <InfoCard 
                title={pageData.infoCard.title}
                description={pageData.infoCard.description}
                details={pageData.infoCard.details}
                imageText={pageData.infoCard.imageText}
                onAction={handleAction}
                className="lg:col-span-1 h-full"
            />
          </div>


          <motion.section id="more-info-usdvnc" {...mainContentMotion} transition={{ ...mainContentMotion.transition, delay: 0.8 }}>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/60 dark:bg-card/50 backdrop-blur-md shadow-xl border-border/60">
                <CardHeader><CardTitle className="text-xl text-foreground">Đặc điểm nổi bật</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  {[
                    {icon: ShieldCheck, text: "Ổn định giá trị 1:1000 với VND, minh bạch tuyệt đối."},
                    {icon: Zap, text: "Giao dịch siêu tốc, chi phí tối ưu trên đa nền tảng."},
                    {icon: Layers, text: "Tương thích ERC-20 & BEP-20, dễ dàng tích hợp."},
                    {icon: CheckCircle, text: "Bảo chứng bằng tài sản thực, kiểm toán định kỳ."}
                  ].map(item => (
                    <div key={item.text} className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3 text-primary" /> {item.text}
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-card/60 dark:bg-card/50 backdrop-blur-md shadow-xl border-border/60">
                <CardHeader><CardTitle className="text-xl text-foreground">Tầm nhìn và Sứ mệnh</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>USDVN đặt mục tiêu trở thành stablecoin hàng đầu tại Việt Nam, là cầu nối vững chắc giữa tài chính truyền thống và DeFi, thúc đẩy một nền kinh tế số toàn diện, an toàn và dễ tiếp cận cho mọi người.</p>
                  <Button variant="link" className="px-0 text-primary hover:text-primary/80 font-medium" onClick={() => handleAction('read_whitepaper')}>
                    Đọc Whitepaper Dự án <ExternalLink className="w-4 h-4 ml-2"/>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default UsdvnCoinPage;
