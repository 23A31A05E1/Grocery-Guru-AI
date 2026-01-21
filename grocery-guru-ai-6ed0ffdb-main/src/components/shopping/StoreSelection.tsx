import { motion } from 'framer-motion';
import { Store, ArrowRight } from 'lucide-react';

interface StoreSelectionProps {
  onSelect: (store: 'dmart' | 'reliance') => void;
}

const stores = [
  {
    id: 'dmart' as const,
    name: 'DMart',
    tagline: 'Best prices, everyday',
    color: 'from-green-500 to-emerald-600',
    emoji: '🏪',
  },
  {
    id: 'reliance' as const,
    name: 'Reliance Smart',
    tagline: 'Fresh & reliable',
    color: 'from-blue-500 to-indigo-600',
    emoji: '🛒',
  },
];

export default function StoreSelection({ onSelect }: StoreSelectionProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Where do you want to shop?</h2>
        <p className="text-muted-foreground">Select your preferred store</p>
      </motion.div>

      <div className="grid gap-4">
        {stores.map((store, index) => (
          <motion.button
            key={store.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(store.id)}
            className="group relative w-full p-6 bg-card rounded-2xl border border-border card-shadow-hover text-left overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background gradient on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${store.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            <div className="relative flex items-center gap-4">
              <div className="text-4xl">{store.emoji}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {store.name}
                </h3>
                <p className="text-sm text-muted-foreground">{store.tagline}</p>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-xs text-muted-foreground"
      >
        Prices are simulated and may vary from actual store prices
      </motion.p>
    </div>
  );
}