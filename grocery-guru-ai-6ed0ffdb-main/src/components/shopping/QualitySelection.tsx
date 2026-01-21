import { motion } from 'framer-motion';
import { Coins, Crown, Check } from 'lucide-react';

interface QualitySelectionProps {
  onSelect: (quality: 'budget' | 'premium') => void;
}

const options = [
  {
    id: 'budget' as const,
    title: 'Budget Friendly',
    emoji: '💰',
    description: 'Best value for money. Quality essentials at great prices.',
    features: ['Lower prices', 'Store brands', 'Bulk options'],
    icon: Coins,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'premium' as const,
    title: 'Premium Quality',
    emoji: '✨',
    description: 'Top-tier products. Premium brands and organic options.',
    features: ['Premium brands', 'Organic options', 'Specialty items'],
    icon: Crown,
    gradient: 'from-amber-500 to-orange-600',
  },
];

export default function QualitySelection({ onSelect }: QualitySelectionProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Choose your preference</h2>
        <p className="text-muted-foreground">This affects our recommendations</p>
      </motion.div>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(option.id)}
            className="group relative w-full p-6 bg-card rounded-2xl border border-border card-shadow-hover text-left overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{option.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {option.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
                  >
                    <Check className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}