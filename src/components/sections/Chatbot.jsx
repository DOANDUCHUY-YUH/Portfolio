import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotSection = () => {
  
  const openChatbot = () => {
    const chatbotButton = document.querySelector('.fixed.bottom-6.right-6 button');
    if (chatbotButton) {
      chatbotButton.click();
      const chatbotWindow = document.querySelector('.fixed.bottom-24.right-6');
      if (chatbotWindow) {
        const inputField = chatbotWindow.querySelector('input');
        if (inputField) {
           setTimeout(() => inputField.focus(), 100);
        }
      }
    }
  };

  return (
    <section id="chatbot-section" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">AI Chatbot</span> Hỗ trợ
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bạn có thể tìm thấy AI Assistant của tôi ở góc dưới bên phải màn hình. 
            Hãy nhấp vào biểu tượng để bắt đầu trò chuyện và tìm hiểu thêm về tôi!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-effect border-border/50 rounded-xl p-8 text-center"
        >
          <MessageCircle size={64} className="mx-auto mb-6 text-primary animate-bounce" />
          <h3 className="text-2xl font-semibold mb-4">AI Assistant sẵn sàng phục vụ!</h3>
          <p className="text-muted-foreground mb-6">
            Đừng ngần ngại hỏi bất cứ điều gì về kinh nghiệm, dự án, hoặc kỹ năng của tôi. 
            AI Assistant sẽ cung cấp thông tin nhanh chóng và chính xác.
          </p>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={openChatbot}
          >
            Bắt đầu trò chuyện ngay
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;