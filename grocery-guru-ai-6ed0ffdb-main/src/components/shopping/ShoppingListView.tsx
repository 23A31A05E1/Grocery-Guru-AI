import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ShoppingCart,
  Copy,
  RefreshCw,
  BarChart3,
  Check,
  Sparkles,
  Users,
  IndianRupee,
  Scale,
} from 'lucide-react';
import { GroceryItem } from '@/types/grocery';
import { useToast } from '@/hooks/use-toast';
import ComparePricesModal from './ComparePricesModal';
import Confetti from './Confetti';

interface ShoppingListViewProps {
  items: GroceryItem[];
  budget: number;
  store: string;
  purpose: string;
  servings: number;
  onItemCheck: (id: string, checked: boolean) => void;
  onReset: () => void;
  aiTip?: string;
}

export default function ShoppingListView({
  items,
  budget,
  store,
  purpose,
  servings,
  onItemCheck,
  onReset,
  aiTip,
}: ShoppingListViewProps) {
  const [localItems, setLocalItems] = useState(items);
  const [showConfetti, setShowConfetti] = useState(false);
  const [justCheckedId, setJustCheckedId] = useState<string | null>(null);
  const [compareItem, setCompareItem] = useState<GroceryItem | null>(null);
  const { toast } = useToast();

  const checkedCount = localItems.filter((item) => item.isChecked).length;
  const progress = localItems.length > 0 ? (checkedCount / localItems.length) * 100 : 0;
  const totalAmount = localItems.reduce((sum, item) => sum + item.price, 0);
  const savedAmount = budget - totalAmount;

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    if (progress === 100 && localItems.length > 0) {
      setShowConfetti(true);
      toast({
        title: 'All done! 🎉',
        description: `You saved ₹${savedAmount.toFixed(0)} on this trip!`,
      });
    }
  }, [progress]);

  const handleSwipe = (id: string, info: PanInfo) => {
    if (info.offset.x > 100) {
      // Swipe right - mark as bought
      setJustCheckedId(id);
      const item = localItems.find((i) => i.id === id);
      if (item && !item.isChecked) {
        onItemCheck(id, true);
        setLocalItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, isChecked: true } : i))
        );
      }
      setTimeout(() => setJustCheckedId(null), 500);
    }
  };

  const handleItemClick = (id: string) => {
    const item = localItems.find((i) => i.id === id);
    if (item) {
      const newChecked = !item.isChecked;
      if (newChecked) setJustCheckedId(id);
      onItemCheck(id, newChecked);
      setLocalItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isChecked: newChecked } : i))
      );
      if (newChecked) setTimeout(() => setJustCheckedId(null), 500);
    }
  };

  const copyList = () => {
    const listText = localItems
      .map((item) => `${item.emoji} ${item.name} - ${item.quantity} ${item.unit}`)
      .join('\n');
    navigator.clipboard.writeText(listText);
    toast({
      title: 'Copied! 📋',
      description: 'Shopping list copied to clipboard',
    });
  };

  const openStore = () => {
    const storeUrl = store === 'dmart' ? 'https://www.dmart.in' : 'https://www.relianceretail.com';
    window.open(storeUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {showConfetti && <Confetti />}

      {/* Header with progress */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 border border-border card-shadow"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold">Your Shopping List</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Serves {servings} people
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary flex items-center">
              <IndianRupee className="w-5 h-5" />
              {totalAmount.toFixed(0)}
            </div>
            <p className="text-xs text-success">
              ₹{savedAmount.toFixed(0)} under budget
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {checkedCount} of {localItems.length} items
            </span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {progress >= 80 && progress < 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-2 bg-success/10 rounded-lg text-center"
          >
            <p className="text-sm font-medium text-success">
              🎉 Almost done! Just {localItems.length - checkedCount} more to go!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* AI Tip */}
      {aiTip && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary/50 rounded-xl p-3 flex items-start gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-secondary-foreground">{aiTip}</p>
        </motion.div>
      )}

      {/* Shopping items */}
      <div className="space-y-2">
        <AnimatePresence>
          {localItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.03 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => handleSwipe(item.id, info)}
              onClick={() => handleItemClick(item.id)}
              className={`relative bg-card rounded-xl p-4 border border-border cursor-pointer transition-all ${
                item.isChecked ? 'opacity-60' : 'card-shadow-hover'
              }`}
            >
              {/* Swipe indicator */}
              <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center bg-success/10 rounded-l-xl opacity-0 -z-10">
                <Check className="w-6 h-6 text-success" />
              </div>

              <div className="flex items-center gap-3">
                {/* Check circle */}
                <motion.div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    item.isChecked
                      ? 'bg-success border-success'
                      : 'border-muted-foreground/30'
                  }`}
                  animate={justCheckedId === item.id ? { scale: [1, 1.3, 1] } : {}}
                >
                  {item.isChecked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-success-foreground"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Emoji */}
                <div className="text-2xl">{item.emoji}</div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        item.isChecked ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.healthFlags?.map((flag) => (
                      <span
                        key={flag}
                        className="text-xs px-1.5 py-0.5 rounded bg-warning/10 text-warning"
                      >
                        {flag === 'high_sugar' && '🍬'}
                        {flag === 'high_sodium' && '🧂'}
                        {flag === 'organic' && '🌱'}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit}
                    {item.reason && (
                      <span className="ml-2 text-xs opacity-70">• {item.reason}</span>
                    )}
                  </div>
                </div>

                {/* Price - item.price is already total for the quantity */}
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold">₹{item.price}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompareItem(item);
                    }}
                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Scale className="w-3 h-3" />
                    Compare
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 pt-4"
      >
        <Button
          size="lg"
          className="h-12 btn-gradient"
          onClick={openStore}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy on {store === 'dmart' ? 'DMart' : 'Reliance'}
        </Button>
        <Button variant="outline" size="lg" className="h-12" onClick={copyList}>
          <Copy className="w-4 h-4 mr-2" />
          Copy List
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" size="lg" className="h-12" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Change Preferences
        </Button>
        <Button variant="secondary" size="lg" className="h-12" onClick={() => setCompareItem(localItems[0] || null)}>
          <BarChart3 className="w-4 h-4 mr-2" />
          Compare Prices
        </Button>
      </div>

      {/* Compare Prices Modal */}
      <ComparePricesModal
        isOpen={!!compareItem}
        onClose={() => setCompareItem(null)}
        item={compareItem}
      />
    </div>
  );
}