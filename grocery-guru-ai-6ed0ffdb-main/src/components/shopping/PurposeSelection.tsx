import { motion } from 'framer-motion';
import { PURPOSES, BIRYANI_SUBCATEGORIES } from '@/types/grocery';

interface PurposeSelectionProps {
  onSelect: (purpose: string, subCategory?: string) => void;
  showSubCategories?: string;
}

export default function PurposeSelection({ onSelect, showSubCategories }: PurposeSelectionProps) {
  if (showSubCategories === 'biryani') {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-2">What type of Biryani? 🍗</h2>
          <p className="text-muted-foreground">Choose your favorite</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {BIRYANI_SUBCATEGORIES.map((sub, index) => (
            <motion.button
              key={sub.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect('biryani', sub.id)}
              className="group relative p-4 bg-card rounded-xl border border-border card-shadow-hover text-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-3xl mb-2">{sub.emoji}</div>
              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                {sub.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">What are you shopping for?</h2>
        <p className="text-muted-foreground">Pick a category to get started</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {PURPOSES.map((purpose, index) => (
          <motion.button
            key={purpose.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => {
              if (purpose.id === 'biryani') {
                onSelect('biryani');
              } else {
                onSelect(purpose.id);
              }
            }}
            className="group relative p-5 bg-card rounded-xl border border-border card-shadow-hover text-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="text-4xl mb-2"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {purpose.emoji}
            </motion.div>
            <div className="font-medium group-hover:text-primary transition-colors">
              {purpose.label}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}