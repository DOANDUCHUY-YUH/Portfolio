import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, X, ChevronDown, Search, HelpCircle, Brain, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/ThemeProvider';

const CoinChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Chào bạn! Tôi là Coin AI Assistant. Tôi có thể giúp bạn tìm hiểu về USDVN Coin, công nghệ blockchain và các khái niệm liên quan. Bạn muốn hỏi gì?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(Math.min(100, Math.max(0, scrolled || 0))); 
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); 
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const coinBotResponses = {
    'usdvnc là gì': 'USDVN là một stablecoin được thiết kế để sử dụng như một phương tiện thanh toán chung tại Việt Nam, với giá trị được neo cố định theo tỷ giá 1 USDVN = 1.000 VND.',
    'usdvnc hoạt động thế nào': 'USDVN hoạt động trên nền tảng blockchain (tương thích ERC-20 và BEP-20), đảm bảo tính minh bạch, bảo mật và khả năng chuyển giao nhanh chóng. Mỗi USDVN được phát hành sẽ được đảm bảo bằng tài sản tương ứng.',
    'ưu điểm của usdvnc': 'Tính ổn định cao (1 USDVN = 1.000 VND), chi phí giao dịch thấp, tốc độ nhanh, minh bạch và dễ dàng sử dụng cho thanh toán, chuyển khoản, lưu trữ giá trị.',
    'blockchain là gì': 'Blockchain (chuỗi khối) là một sổ cái kỹ thuật số phi tập trung, ghi lại các giao dịch một cách an toàn, minh bạch và không thể thay đổi. Dữ liệu được nhóm thành các khối và liên kết với nhau bằng mã hóa.',
    'smart contract là gì': 'Hợp đồng thông minh (Smart Contract) là các chương trình máy tính tự động thực thi các điều khoản của một hợp đồng khi các điều kiện được xác định trước được đáp ứng. Chúng chạy trên blockchain, giúp loại bỏ nhu cầu về trung gian.',
    'defi là gì': 'DeFi (Decentralized Finance - Tài chính Phi tập trung) là một hệ sinh thái các ứng dụng tài chính được xây dựng trên công nghệ blockchain, nhằm mục đích tạo ra một hệ thống tài chính mở, minh bạch và không cần trung gian.',
    'nft là gì': 'NFT (Non-Fungible Token - Token Không thể Thay thế) là một loại tài sản kỹ thuật số duy nhất trên blockchain, đại diện cho quyền sở hữu một mục cụ thể như tác phẩm nghệ thuật, vật phẩm trong game, hoặc bất động sản ảo.',
    'stablecoin là gì': 'Stablecoin là một loại tiền mã hóa được thiết kế để duy trì một giá trị ổn định, thường được neo vào một tài sản ổn định khác như tiền tệ fiat (ví dụ: USD, VND) hoặc hàng hóa (ví dụ: vàng).',
    'làm thế nào để mua usdvnc': 'Hiện tại, bạn có thể tìm hiểu thông tin về USDVN trên trang này. Các kênh mua bán và giao dịch chính thức sẽ được công bố sớm. Hãy theo dõi để cập nhật!',
    'usdvnc có an toàn không': 'USDVN được thiết kế với các biện pháp bảo mật cao và cơ chế đảm bảo bằng tài sản thực. Tuy nhiên, như mọi tài sản kỹ thuật số, người dùng cần tự bảo vệ ví và thông tin cá nhân của mình.',
    'ví nào hỗ trợ usdvnc': 'USDVN tương thích với các ví hỗ trợ chuẩn ERC-20 và BEP-20 như MetaMask, Trust Wallet, và nhiều ví phổ biến khác. Chúng tôi cũng sẽ sớm ra mắt ví riêng cho USDVN.',
    'câu hỏi khác': 'Tôi có thể cung cấp thêm thông tin về các chủ đề như: Lịch sử Blockchain, Các loại Blockchain (Public, Private, Consortium), Cơ chế đồng thuận (PoW, PoS), Ứng dụng của Blockchain ngoài tài chính,... Bạn muốn tìm hiểu cụ thể về điều gì?',
    'default': 'Tôi đang học hỏi thêm mỗi ngày! Bạn có thể hỏi cụ thể hơn về USDVN Coin, các khái niệm blockchain cơ bản (ví dụ: Smart Contract, DeFi, NFT), hoặc cách sử dụng USDVN. Tôi sẽ cố gắng hết sức để trả lời.'
  };
  
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    let bestMatchKey = 'default';
    let highestMatchScore = 0;

    for (const [key, response] of Object.entries(coinBotResponses)) {
      if (key === 'default') continue;
      
      const keywords = key.split(' ');
      let currentScore = 0;
      keywords.forEach(keyword => {
        if (lowerMessage.includes(keyword)) {
          currentScore++;
        }
      });
      
      if (currentScore > highestMatchScore) {
        highestMatchScore = currentScore;
        bestMatchKey = key;
      }
    }
    // Heuristic: if input is very short, require a higher proportion of keywords to match
    if (lowerMessage.length < 15 && highestMatchScore < (lowerMessage.split(' ').length / 2) && bestMatchKey !== 'default') {
      // If not a good enough match for short queries, check some specific short common questions
      if (lowerMessage.includes('mua') && lowerMessage.includes('usdvnc')) return coinBotResponses['làm thế nào để mua usdvnc'];
      if (lowerMessage.includes('ví') && lowerMessage.includes('usdvnc')) return coinBotResponses['ví nào hỗ trợ usdvnc'];
    }
    
    if (highestMatchScore > 0) return coinBotResponses[bestMatchKey];
    return coinBotResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = getResponse(inputMessage);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'USDVNC là gì?',
    'Blockchain là gì?',
    'Smart Contract?',
    'Mua USDVN ở đâu?',
    'Ví hỗ trợ USDVN?'
  ];

  const iconColor = theme === 'dark' ? 'text-teal-400' : 'text-teal-600';
  const buttonGradient = "bg-gradient-to-r from-primary to-cyan-500 dark:to-cyan-600 hover:opacity-90";
  const headerGradient = "bg-gradient-to-r from-primary/20 to-cyan-500/20 dark:from-primary/30 dark:to-cyan-500/30";

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-[100]" // Ensure higher z-index for chatbot
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          size="icon"
          className={`relative rounded-full w-16 h-16 ${buttonGradient} shadow-xl pulse-glow flex items-center justify-center text-primary-foreground`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mở Coin AI Assistant"
        >
          {isOpen ? <ChevronDown size={32} /> : <Brain size={30} />}
          {!isOpen && scrollProgress > 0 && ( // Only show progress if scrolled
             <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/80 text-xs text-primary-foreground rounded-full flex items-center justify-center border-2 border-background shadow-sm">
               {Math.round(scrollProgress)}%
             </div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-[99] w-full max-w-md" // Ensure z-index below button
            role="dialog"
            aria-modal="true"
            aria-labelledby="coin-chatbot-title"
          >
            <Card className="glass-effect border-border/60 overflow-hidden shadow-2xl dark:shadow-primary/10">
              <CardHeader className={`${headerGradient} border-b border-border/60 p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${buttonGradient} flex items-center justify-center shadow-md`}>
                      <Brain size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle id="coin-chatbot-title" className={`text-lg ${iconColor}`}>Coin AI Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground">Hỏi & Đáp về Blockchain & USDVN</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Đóng chatbot">
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/30 dark:bg-black/10">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2.5 max-w-[85%] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600' 
                              : buttonGradient
                          }`}>
                            {message.type === 'user' ? (
                              <User size={16} className="text-white" />
                            ) : (
                              <Brain size={16} className="text-primary-foreground" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg shadow-sm ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                              : 'glass-effect border border-border/50 bg-background/70 dark:bg-slate-800/70'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-1.5 text-right ${
                              message.type === 'user' ? 'text-blue-100/80' : 'text-muted-foreground/80'
                            }`}>
                              {message.timestamp.toLocaleTimeString('vi-VN', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${buttonGradient} flex items-center justify-center flex-shrink-0 shadow`}>
                          <Brain size={16} className="text-primary-foreground" />
                        </div>
                        <div className="glass-effect border border-border/50 p-3 rounded-lg bg-background/70 dark:bg-slate-800/70 shadow-sm">
                          <div className="flex space-x-1.5 items-center">
                            <div className={`w-2 h-2 ${iconColor} rounded-full animate-bounce`} style={{animationDuration: '1.2s'}}></div>
                            <div className={`w-2 h-2 ${iconColor} rounded-full animate-bounce`} style={{ animationDelay: '0.15s', animationDuration: '1.2s' }}></div>
                            <div className={`w-2 h-2 ${iconColor} rounded-full animate-bounce`} style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="border-t border-border/60 p-4 bg-background/50 dark:bg-black/20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickQuestions.map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(handleSendMessage, 50); 
                        }}
                        className="glass-effect border-border/50 hover:border-primary/60 hover:bg-primary/10 text-xs shadow-sm"
                        disabled={isTyping}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Hỏi về Blockchain, USDVN..."
                      className="glass-effect border-border/60 focus:border-primary/70 shadow-sm"
                      disabled={isTyping}
                      aria-label="Nhập câu hỏi của bạn"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className={`${buttonGradient} shadow-md text-primary-foreground`}
                      aria-label="Gửi tin nhắn"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CoinChatbot;