import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, X, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là AI Assistant của Yuhz. Tôi có thể giúp bạn tìm hiểu về kinh nghiệm, dự án và kỹ năng của anh ấy. Bạn muốn biết điều gì?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(Math.min(100, Math.max(0, scrolled))); 
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

  const botResponses = {
    'kinh nghiệm': 'Yuhz có hơn 3 năm kinh nghiệm trong phát triển web, chuyên về React, Node.js và các công nghệ hiện đại. Anh đã làm việc với nhiều dự án từ startup đến doanh nghiệp lớn.',
    'dự án': 'Yuhz đã hoàn thành hơn 50 dự án bao gồm e-commerce, ứng dụng mobile, dashboard AI và nhiều website portfolio. Bạn có thể xem chi tiết trong phần Portfolio.',
    'kỹ năng': 'Yuhz thành thạo Frontend (React, Vue.js, TypeScript), Backend (Node.js), Database (PostgreSQL, MongoDB) và có kinh nghiệm về UI/UX Design.',
    'liên hệ': 'Bạn có thể liên hệ với Yuhz qua email: dduchuy0711@gmail.com hoặc điện thoại: +84 944 533 041. Anh luôn sẵn sàng thảo luận về dự án mới!',
    'học vấn': 'Yuhz tốt nghiệp Khoa Công nghệ Thông tin và liên tục cập nhật kiến thức qua các khóa học online và chứng chỉ chuyên ngành.',
    'default': 'Tôi hiểu bạn muốn biết thêm về Yuhz. Bạn có thể hỏi về kinh nghiệm, dự án, kỹ năng, thông tin liên hệ hoặc học vấn của anh ấy. Tôi sẽ cố gắng trả lời tốt nhất!'
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    return botResponses.default;
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
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Kinh nghiệm của Yuhz?',
    'Dự án nổi bật?',
    'Kỹ năng chuyên môn?',
    'Thông tin liên hệ?'
  ];

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          size="icon"
          className="relative rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg pulse-glow flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={32} /> : <MessageCircle size={32} />}
          {!isOpen && (
             <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-xs text-primary-foreground rounded-full flex items-center justify-center border-2 border-background">
               {Math.round(scrollProgress)}%
             </div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-md"
          >
            <Card className="glass-effect border-border/50 overflow-hidden shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg gradient-text">AI Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground">Luôn sẵn sàng hỗ trợ bạn</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User size={16} className="text-white" />
                            ) : (
                              <Bot size={16} className="text-white" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                              : 'glass-effect border border-border/50'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="glass-effect border border-border/50 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="border-t border-border/50 p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {quickQuestions.map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(handleSendMessage, 100); 
                        }}
                        className="glass-effect border-border/50 hover:border-primary/50 hover:bg-primary/20 text-xs"
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
                      placeholder="Nhập tin nhắn..."
                      className="glass-effect border-border/50 focus:border-primary/50"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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

export default Chatbot;