import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Check, TrendingDown, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GroceryItem } from '@/types/grocery';
import { GROCERY_DATABASE } from '@/data/groceryDatabase';

interface ComparePricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GroceryItem | null;
}

interface StorePrice {
  store: string;
  displayName: string;
  price: number;
  totalPrice: number;
  url: string;
  logo: string;
}

const STORE_INFO: Record<string, { displayName: string; url: string; logo: string }> = {
  dmart: { displayName: 'DMart', url: 'https://www.dmart.in', logo: '🏪' },
  reliance: { displayName: 'Reliance Fresh', url: 'https://www.relianceretail.com', logo: '🛒' },
  blinkit: { displayName: 'Blinkit', url: 'https://blinkit.com', logo: '⚡' },
  amazon: { displayName: 'Amazon Fresh', url: 'https://www.amazon.in/fresh', logo: '📦' },
  instamart: { displayName: 'Instamart', url: 'https://www.swiggy.com/instamart', logo: '🚀' },
};

export default function ComparePricesModal({ isOpen, onClose, item }: ComparePricesModalProps) {
  if (!item) return null;

  // Find product in database to get store prices
  const dbProduct = GROCERY_DATABASE.find(
    (p) => p.name.toLowerCase() === item.name.toLowerCase() || p.id === item.id
  );

  const getStorePrices = (): StorePrice[] => {
    if (!dbProduct) {
      // Fallback with estimated prices based on item price
      const basePrice = item.price / item.quantity;
      return Object.entries(STORE_INFO).map(([key, info]) => {
        const variance = key === 'dmart' ? 0 : key === 'reliance' ? 0.03 : key === 'blinkit' ? 0.12 : key === 'amazon' ? 0.08 : 0.06;
        const storePrice = Math.round(basePrice * (1 + variance));
        return {
          store: key,
          displayName: info.displayName,
          price: storePrice,
          totalPrice: Math.round(storePrice * item.quantity),
          url: info.url,
          logo: info.logo,
        };
      });
    }

    return Object.entries(dbProduct.storePrices).map(([store, pricePerUnit]) => {
      const info = STORE_INFO[store];
      const totalPrice = Math.round(pricePerUnit * item.quantity);
      return {
        store,
        displayName: info.displayName,
        price: pricePerUnit,
        totalPrice,
        url: info.url,
        logo: info.logo,
      };
    });
  };

  const storePrices = getStorePrices().sort((a, b) => a.totalPrice - b.totalPrice);
  const lowestPrice = storePrices[0];
  const highestPrice = storePrices[storePrices.length - 1];
  const savingsAmount = highestPrice.totalPrice - lowestPrice.totalPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.emoji}</div>
                <div>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-white/80">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Savings Badge */}
            {savingsAmount > 0 && (
              <div className="bg-success/10 border-b border-success/20 px-4 py-2">
                <p className="text-sm text-success font-medium flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Save up to ₹{savingsAmount} by comparing prices!
                </p>
              </div>
            )}

            {/* Store Prices */}
            <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
              {storePrices.map((storePrice, index) => {
                const isBest = index === 0;
                return (
                  <motion.div
                    key={storePrice.store}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative rounded-xl p-4 border-2 transition-all ${
                      isBest
                        ? 'border-success bg-success/5'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    {/* Best Price Badge */}
                    {isBest && (
                      <div className="absolute -top-2.5 left-4 bg-success text-success-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Best Price!
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{storePrice.logo}</div>
                        <div>
                          <h4 className="font-medium">{storePrice.displayName}</h4>
                          <p className="text-xs text-muted-foreground">
                            ₹{storePrice.price}/{dbProduct?.unit || item.unit}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-lg font-bold ${isBest ? 'text-success' : ''}`}>
                          ₹{storePrice.totalPrice}
                        </div>
                        {!isBest && (
                          <p className="text-xs text-muted-foreground">
                            +₹{storePrice.totalPrice - lowestPrice.totalPrice}
                          </p>
                        )}
                      </div>
                    </div>

                    {isBest && (
                      <Button
                        className="w-full mt-3 btn-gradient"
                        onClick={() => window.open(storePrice.url, '_blank')}
                      >
                        <Store className="w-4 h-4 mr-2" />
                        Buy on {storePrice.displayName}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/30">
              <p className="text-xs text-center text-muted-foreground">
                Prices are indicative and may vary. Click to check latest prices.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
