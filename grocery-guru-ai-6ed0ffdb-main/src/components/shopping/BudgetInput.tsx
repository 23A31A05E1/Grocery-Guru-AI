import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IndianRupee, Sparkles, TrendingDown } from 'lucide-react';

interface BudgetInputProps {
  onSubmit: (budget: number) => void;
}

const quickAmounts = [500, 1000, 2000, 5000];

export default function BudgetInput({ onSubmit }: BudgetInputProps) {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(budget);
    if (amount > 0) {
      onSubmit(amount);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">What's your budget?</h2>
        <p className="text-muted-foreground flex items-center justify-center gap-1">
          <TrendingDown className="w-4 h-4" />
          We'll stay close to your budget
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
            <IndianRupee className="w-6 h-6" />
          </div>
          <Input
            type="number"
            placeholder="Enter amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="pl-12 h-16 text-2xl font-semibold text-center bg-card border-2 border-border focus:border-primary"
            min="100"
            required
          />
        </motion.div>

        {/* Quick amount buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {quickAmounts.map((amount, index) => (
            <motion.button
              key={amount}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => setBudget(amount.toString())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                budget === amount.toString()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ₹{amount.toLocaleString()}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 btn-gradient text-lg font-semibold"
            disabled={!budget || parseInt(budget) <= 0}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Continue
          </Button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary/50 rounded-xl p-4 text-center"
      >
        <p className="text-sm text-muted-foreground">
          💡 <strong>Pro tip:</strong> We'll recommend items totaling 85-95% of your budget,
          leaving room for spontaneous additions!
        </p>
      </motion.div>
    </div>
  );
}