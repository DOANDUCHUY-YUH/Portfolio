import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIconLucide, Send, Plus, Eye, EyeOff, Repeat, Settings2, ShieldAlert, LogIn, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const initialWalletData = {
  balances: {
    VND: 2500000,
    USDVN: 500.00,
  },
  transactions: [
    { id: 1, type: 'receive', amount: 500000, currency: 'VND', description: 'Thanh toán dự án website', date: '2025-05-15' },
    { id: 2, type: 'send', amount: 200000, currency: 'VND', description: 'Mua hosting', date: '2025-05-14' },
    { id: 3, type: 'receive', amount: 120.50, currency: 'USDVN', description: 'Nhận USDVN từ Airdrop', date: '2025-05-13' },
    { id: 4, type: 'send', amount: 15.75, currency: 'USDVN', description: 'Phí giao dịch NFT', date: '2025-05-12' },
    { id: 5, type: 'swap', amountFrom: 100000, currencyFrom: 'VND', amountTo: 100.00, currencyTo: 'USDVN', description: 'Swap VND sang USDVN', date: '2025-05-11' },
  ],
  connectedWallet: null,
};

const formatCurrency = (amount, currency = 'VND') => {
  if (currency === 'USDVN') {
    return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDVN`;
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


const WalletBalanceCard = ({ walletData, activeCurrency, setActiveCurrency, showBalance, setShowBalance, onSendClick, onDepositClick, onSwapClick }) => (
  <Card className="glass-effect border-border/50 overflow-hidden">
    <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
      <div className="absolute inset-0 bg-black/25"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center mb-2">
              <Label htmlFor="currency-select" className="text-white/80 mr-2">Tài sản:</Label>
              <Select value={activeCurrency} onValueChange={setActiveCurrency}>
                <SelectTrigger id="currency-select" className="w-[120px] bg-white/10 border-white/30 text-white h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-700">
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="USDVN">USDVN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-white/80 mb-1">Số dư khả dụng ({activeCurrency})</p>
            <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold">
                {showBalance ? formatCurrency(walletData.balances[activeCurrency] || 0, activeCurrency) : '••••••••'}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
          <WalletIconLucide size={40} className="text-white/80" />
        </div>
        {walletData.connectedWallet && (
          <p className="text-xs text-white/70 mb-4">Đã kết nối: {walletData.connectedWallet}</p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button onClick={onSendClick} className="bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline">
            <Send className="w-4 h-4 mr-2" /> Gửi tiền
          </Button>
          <Button onClick={onDepositClick} className="bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Nạp tiền
          </Button>
          <Button onClick={onSwapClick} className="bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline">
            <Repeat className="w-4 h-4 mr-2" /> Swap
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const SecurityAndConnectionCard = ({ connectedWallet, onConnectWallet, onDisconnectWallet, onFeatureProgress }) => (
  <Card className="glass-effect border-border/50">
    <CardHeader><CardTitle className="text-lg gradient-text">Kết nối & Bảo mật</CardTitle></CardHeader>
    <CardContent className="space-y-3">
      {!connectedWallet ? (
        <Button variant="default" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600" onClick={onConnectWallet}>
          <LogIn className="w-4 h-4 mr-3" /> Kết nối Ví ngoài
        </Button>
      ) : (
         <Button variant="outline" className="w-full justify-start glass-effect border-green-500/50 text-green-400 hover:border-green-500/70" onClick={onDisconnectWallet}>
          <LogIn className="w-4 h-4 mr-3" /> Ngắt kết nối Ví
        </Button>
      )}
      <Button variant="outline" className="w-full justify-start glass-effect border-border/50 hover:border-primary/50" onClick={() => onFeatureProgress('Cài đặt 2FA')}>
        <ShieldAlert className="w-4 h-4 mr-3" /> Xác thực 2 yếu tố (2FA)
      </Button>
      <Button variant="outline" className="w-full justify-start glass-effect border-border/50 hover:border-primary/50" onClick={() => onFeatureProgress('Quản lý thiết bị')}>
        <Settings2 className="w-4 h-4 mr-3" /> Quản lý thiết bị
      </Button>
    </CardContent>
  </Card>
);

const TransactionListItem = ({ tx, index }) => (
  <motion.div
    key={tx.id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    viewport={{ once: true }}
    className="flex items-center justify-between p-4 rounded-lg glass-effect border border-border/30 hover:border-primary/50 transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
        tx.type === 'receive' ? 'bg-green-500/20 text-green-400' : 
        tx.type === 'send' ? 'bg-red-500/20 text-red-400' : 
        'bg-blue-500/20 text-blue-400' 
      }`}>
        {tx.type === 'receive' ? <ArrowDownLeft size={18} /> : 
         tx.type === 'send' ? <ArrowUpRight size={18} /> : 
         <Repeat size={18} />}
      </div>
      <div>
        <p className="font-medium">{tx.description}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(tx.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
    <div className={`text-right ${
      tx.type === 'receive' ? 'text-green-400' : 
      tx.type === 'send' ? 'text-red-400' :
      'text-blue-400'
    }`}>
      <p className="font-semibold">
        {tx.type === 'swap' 
          ? `${formatCurrency(tx.amountFrom, tx.currencyFrom)} → ${formatCurrency(tx.amountTo, tx.currencyTo)}`
          : `${tx.type === 'receive' ? '+' : '-'}${formatCurrency(tx.amount, tx.currency)}`
        }
      </p>
    </div>
  </motion.div>
);

const TransactionHistoryCard = ({ transactions }) => (
  <Card className="glass-effect border-border/50">
    <CardHeader>
      <CardTitle className="text-xl gradient-text">Lịch sử giao dịch</CardTitle>
      <CardDescription>Theo dõi tất cả các hoạt động tài chính của bạn.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {transactions.length === 0 && <p className="text-muted-foreground text-center py-4">Chưa có giao dịch nào.</p>}
        {transactions.map((tx, index) => (
          <TransactionListItem key={tx.id} tx={tx} index={index} />
        ))}
      </div>
    </CardContent>
  </Card>
);

const SendMoneyDialog = ({ open, onOpenChange, sendForm, setSendForm, onSendMoney, walletBalances }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px] glass-effect border-border/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="gradient-text">Gửi tiền</DialogTitle>
        <DialogDescription>Chuyển tiền đến địa chỉ ví khác.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="send-currency" className="text-right">Loại</Label>
          <Select value={sendForm.currency} onValueChange={(val) => setSendForm(prev => ({...prev, currency: val}))}>
            <SelectTrigger id="send-currency" className="col-span-3"> <SelectValue /> </SelectTrigger>
            <SelectContent><SelectItem value="VND">VND</SelectItem><SelectItem value="USDVN">USDVN</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="send-address" className="text-right">Địa chỉ</Label>
          <Input id="send-address" value={sendForm.address} onChange={(e) => setSendForm(prev => ({...prev, address: e.target.value}))} className="col-span-3" placeholder="0x..." />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="send-amount" className="text-right">Số tiền</Label>
          <Input id="send-amount" type="number" value={sendForm.amount} onChange={(e) => setSendForm(prev => ({...prev, amount: e.target.value}))} className="col-span-3" placeholder="0.00" />
        </div>
        <p className="text-xs text-muted-foreground text-right col-span-4">Số dư: {formatCurrency(walletBalances[sendForm.currency] || 0, sendForm.currency)}</p>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="send-memo" className="text-right">Ghi chú</Label>
          <Input id="send-memo" value={sendForm.memo} onChange={(e) => setSendForm(prev => ({...prev, memo: e.target.value}))} className="col-span-3" placeholder="(Không bắt buộc)" />
        </div>
      </div>
      <DialogFooter> <Button onClick={onSendMoney} className="bg-primary hover:bg-primary/90">Xác nhận gửi</Button> </DialogFooter>
    </DialogContent>
  </Dialog>
);

const SwapCurrencyDialog = ({ open, onOpenChange, swapForm, setSwapForm, onSwapCurrency, handleSwapAmountChange, walletBalances }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md glass-effect border-border/50 text-foreground">
      <DialogHeader>
        <DialogTitle className="gradient-text">Swap Tiền tệ</DialogTitle>
        <DialogDescription>Chuyển đổi giữa các loại tiền tệ trong ví của bạn.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="swap-from-currency">Từ</Label>
          <div className="flex gap-2">
            <Select value={swapForm.fromCurrency} onValueChange={(val) => setSwapForm(prev => ({...prev, fromCurrency: val, toAmount: ''}))}>
              <SelectTrigger id="swap-from-currency" className="flex-1"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="VND">VND</SelectItem><SelectItem value="USDVN">USDVN</SelectItem></SelectContent>
            </Select>
            <Input id="swap-from-amount" type="number" value={swapForm.fromAmount} onChange={(e) => handleSwapAmountChange(e.target.value, 'from')} className="flex-1" placeholder="0.00" />
          </div>
          <p className="text-xs text-muted-foreground">Số dư: {formatCurrency(walletBalances[swapForm.fromCurrency] || 0, swapForm.fromCurrency)}</p>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" onClick={() => setSwapForm(prev => ({ fromCurrency: prev.toCurrency, toCurrency: prev.fromCurrency, fromAmount: prev.toAmount, toAmount: prev.fromAmount }))}>
            <Repeat className="h-5 w-5 text-primary" />
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="swap-to-currency">Đến</Label>
           <div className="flex gap-2">
            <Select value={swapForm.toCurrency} onValueChange={(val) => setSwapForm(prev => ({...prev, toCurrency: val, fromAmount: ''}))}>
              <SelectTrigger id="swap-to-currency" className="flex-1"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="VND">VND</SelectItem><SelectItem value="USDVN">USDVN</SelectItem></SelectContent>
            </Select>
            <Input id="swap-to-amount" type="number" value={swapForm.toAmount} onChange={(e) => handleSwapAmountChange(e.target.value, 'to')} className="flex-1" placeholder="0.00" />
          </div>
           <p className="text-xs text-muted-foreground">Tỷ giá ước tính: 1 {swapForm.fromCurrency} ≈ {swapForm.fromCurrency === 'VND' ? '0.001' : '1000'} {swapForm.toCurrency}</p>
        </div>
      </div>
      <DialogFooter> <Button onClick={onSwapCurrency} className="bg-primary hover:bg-primary/90 w-full">Xác nhận Swap</Button> </DialogFooter>
    </DialogContent>
  </Dialog>
);


const WalletSection = () => {
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(true);
  const [walletData, setWalletData] = useState(() => {
    const savedData = localStorage.getItem('walletData');
    return savedData ? JSON.parse(savedData) : initialWalletData;
  });
  const [activeCurrency, setActiveCurrency] = useState('VND');
  
  const [sendForm, setSendForm] = useState({ address: '', amount: '', currency: 'VND', memo: '' });
  const [swapForm, setSwapForm] = useState({ fromCurrency: 'VND', toCurrency: 'USDVN', fromAmount: '', toAmount: '' });

  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isSwapDialogOpen, setIsSwapDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('walletData', JSON.stringify(walletData));
  }, [walletData]);


  const handleActionInProgress = useCallback((featureName) => {
    toast({
      title: "Tính năng đang phát triển",
      description: `${featureName} sẽ sớm được ra mắt hoặc cần tích hợp backend!`,
      variant: "default",
    });
  }, [toast]);

  const handleConnectWallet = useCallback(() => {
    handleActionInProgress("Kết nối ví ngoài (MetaMask, Trust Wallet...)");
    setWalletData(prev => ({ ...prev, connectedWallet: "0x123...abc (Demo)" }));
  }, [handleActionInProgress]);

  const handleDisconnectWallet = useCallback(() => {
    setWalletData(prev => ({ ...prev, connectedWallet: null }));
    toast({ title: "Thành công", description: "Đã ngắt kết nối ví." });
  }, [toast]);

  const handleSendMoney = useCallback(() => {
    if (!sendForm.address || !sendForm.amount) {
      toast({ title: "Lỗi", description: "Vui lòng nhập địa chỉ và số tiền.", variant: "destructive" });
      return;
    }
    const amountNum = parseFloat(sendForm.amount);
    if (amountNum <= 0 || amountNum > walletData.balances[sendForm.currency]) {
      toast({ title: "Lỗi", description: "Số tiền không hợp lệ hoặc không đủ số dư.", variant: "destructive" });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: 'send',
      amount: amountNum,
      currency: sendForm.currency,
      description: `Gửi đến ${sendForm.address.substring(0,10)}... ${sendForm.memo ? `(${sendForm.memo})` : ''}`,
      date: new Date().toISOString().split('T')[0],
    };

    setWalletData(prev => ({
      ...prev,
      balances: {
        ...prev.balances,
        [sendForm.currency]: prev.balances[sendForm.currency] - amountNum,
      },
      transactions: [newTransaction, ...prev.transactions],
    }));
    toast({ title: "Thành công", description: `Đã gửi ${formatCurrency(amountNum, sendForm.currency)}.` });
    setSendForm({ address: '', amount: '', currency: 'VND', memo: '' });
    setIsSendDialogOpen(false);
  }, [sendForm, walletData.balances, toast]);
  
  const handleSwapCurrency = useCallback(() => {
    const { fromCurrency, toCurrency, fromAmount } = swapForm;
    if (!fromAmount) {
      toast({ title: "Lỗi", description: "Vui lòng nhập số tiền muốn swap.", variant: "destructive" });
      return;
    }
    const amountNum = parseFloat(fromAmount);
    if (amountNum <= 0 || amountNum > walletData.balances[fromCurrency]) {
      toast({ title: "Lỗi", description: "Số tiền không hợp lệ hoặc không đủ số dư.", variant: "destructive" });
      return;
    }

    let toAmountNum;
    if (fromCurrency === 'VND' && toCurrency === 'USDVN') toAmountNum = amountNum / 1000;
    else if (fromCurrency === 'USDVN' && toCurrency === 'VND') toAmountNum = amountNum * 1000;
    else {
      toast({ title: "Lỗi", description: "Cặp swap không được hỗ trợ.", variant: "destructive" });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: 'swap',
      amountFrom: amountNum,
      currencyFrom: fromCurrency,
      amountTo: toAmountNum,
      currencyTo: toCurrency,
      description: `Swap ${fromCurrency} sang ${toCurrency}`,
      date: new Date().toISOString().split('T')[0],
    };

    setWalletData(prev => ({
      ...prev,
      balances: {
        ...prev.balances,
        [fromCurrency]: prev.balances[fromCurrency] - amountNum,
        [toCurrency]: (prev.balances[toCurrency] || 0) + toAmountNum,
      },
      transactions: [newTransaction, ...prev.transactions],
    }));
    toast({ title: "Thành công", description: `Đã swap ${formatCurrency(amountNum, fromCurrency)} sang ${formatCurrency(toAmountNum, toCurrency)}.` });
    setSwapForm({ fromCurrency: 'VND', toCurrency: 'USDVN', fromAmount: '', toAmount: '' });
    setIsSwapDialogOpen(false);
  }, [swapForm, walletData.balances, toast]);

  const handleSwapAmountChange = useCallback((value, type) => {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      setSwapForm(prev => ({ ...prev, fromAmount: type === 'from' ? value : prev.fromAmount, toAmount: type === 'to' ? value : prev.toAmount }));
      return;
    }

    if (type === 'from') {
      let toAmountCalc = '';
      if (swapForm.fromCurrency === 'VND' && swapForm.toCurrency === 'USDVN') toAmountCalc = (amount / 1000).toFixed(2);
      else if (swapForm.fromCurrency === 'USDVN' && swapForm.toCurrency === 'VND') toAmountCalc = (amount * 1000).toFixed(0);
      setSwapForm(prev => ({ ...prev, fromAmount: value, toAmount: toAmountCalc }));
    } else { 
      let fromAmountCalc = '';
      if (swapForm.fromCurrency === 'VND' && swapForm.toCurrency === 'USDVN') fromAmountCalc = (amount * 1000).toFixed(0);
      else if (swapForm.fromCurrency === 'USDVN' && swapForm.toCurrency === 'VND') fromAmountCalc = (amount / 1000).toFixed(2);
      setSwapForm(prev => ({ ...prev, toAmount: value, fromAmount: fromAmountCalc }));
    }
  }, [swapForm.fromCurrency, swapForm.toCurrency]);

  return (
    <section id="wallet" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">Ví điện tử</span> Nâng cao
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quản lý tài sản số của bạn một cách an toàn, tiện lợi và đa năng.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <WalletBalanceCard 
              walletData={walletData}
              activeCurrency={activeCurrency}
              setActiveCurrency={setActiveCurrency}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              onSendClick={() => setIsSendDialogOpen(true)}
              onDepositClick={() => handleActionInProgress('Nạp tiền')}
              onSwapClick={() => setIsSwapDialogOpen(true)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <SecurityAndConnectionCard 
              connectedWallet={walletData.connectedWallet}
              onConnectWallet={handleConnectWallet}
              onDisconnectWallet={handleDisconnectWallet}
              onFeatureProgress={handleActionInProgress}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <TransactionHistoryCard transactions={walletData.transactions} />
        </motion.div>
      </div>

      <SendMoneyDialog 
        open={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
        sendForm={sendForm}
        setSendForm={setSendForm}
        onSendMoney={handleSendMoney}
        walletBalances={walletData.balances}
      />
      <SwapCurrencyDialog
        open={isSwapDialogOpen}
        onOpenChange={setIsSwapDialogOpen}
        swapForm={swapForm}
        setSwapForm={setSwapForm}
        onSwapCurrency={handleSwapCurrency}
        handleSwapAmountChange={handleSwapAmountChange}
        walletBalances={walletData.balances}
      />
    </section>
  );
};

export default WalletSection;