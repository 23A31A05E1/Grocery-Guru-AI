import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StoreSelection from '@/components/shopping/StoreSelection';
import BudgetInput from '@/components/shopping/BudgetInput';
import QualitySelection from '@/components/shopping/QualitySelection';
import PurposeSelection from '@/components/shopping/PurposeSelection';
import ShoppingListView from '@/components/shopping/ShoppingListView';
import AIChatBubble from '@/components/shopping/AIChatBubble';
import { ShoppingPreferences, GroceryItem } from '@/types/grocery';
import { generateRecommendations } from '@/lib/recommendationEngine';

type Step = 'store' | 'budget' | 'quality' | 'purpose' | 'subcategory' | 'list';

export default function Index() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('store');
  const [preferences, setPreferences] = useState<ShoppingPreferences>({
    store: null, budget: null, quality: null, purpose: null, subCategory: null,
  });
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle redirect in useEffect to avoid setState during render
  const shouldRedirect = !loading && !user;
  
  React.useEffect(() => {
    if (shouldRedirect) {
      navigate('/auth');
    }
  }, [shouldRedirect, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleStoreSelect = (store: 'dmart' | 'reliance') => {
    setPreferences((p) => ({ ...p, store }));
    setStep('budget');
  };

  const handleBudgetSubmit = (budget: number) => {
    setPreferences((p) => ({ ...p, budget }));
    setStep('quality');
  };

  const handleQualitySelect = (quality: 'budget' | 'premium') => {
    setPreferences((p) => ({ ...p, quality }));
    setStep('purpose');
  };

  const handlePurposeSelect = (purpose: string, subCategory?: string) => {
    if (purpose === 'biryani' && !subCategory) {
      setPreferences((p) => ({ ...p, purpose }));
      setStep('subcategory');
    } else {
      setPreferences((p) => ({ ...p, purpose, subCategory }));
      
      // Use the smart recommendation engine
      const result = generateRecommendations({
        budget: preferences.budget || 1000,
        purpose,
        quality: preferences.quality || 'budget',
        store: preferences.store || 'dmart',
        dietaryPreference: 'none',
        subCategory,
      });
      
      setItems(result.items);
      setTotalAmount(result.totalAmount);
      setStep('list');
    }
  };

  const handleItemCheck = (id: string, checked: boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, isChecked: checked } : item));
  };

  const handleReset = () => {
    setStep('store');
    setPreferences({ store: null, budget: null, quality: null, purpose: null, subCategory: null });
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">GroceryGuru</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/dashboard')}
              className="relative"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {(user?.user_metadata?.full_name || user?.email || 'U').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {step === 'store' && <StoreSelection onSelect={handleStoreSelect} />}
            {step === 'budget' && <BudgetInput onSubmit={handleBudgetSubmit} />}
            {step === 'quality' && <QualitySelection onSelect={handleQualitySelect} />}
            {step === 'purpose' && <PurposeSelection onSelect={handlePurposeSelect} />}
            {step === 'subcategory' && <PurposeSelection onSelect={handlePurposeSelect} showSubCategories="biryani" />}
            {step === 'list' && (
              <ShoppingListView
                items={items}
                budget={preferences.budget || 1000}
                store={preferences.store || 'dmart'}
                purpose={preferences.purpose || 'everyday'}
                servings={4}
                onItemCheck={handleItemCheck}
                onReset={handleReset}
                aiTip="💡 Soak rice for 30 minutes for longer, fluffier grains!"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Chat Bubble */}
      <AIChatBubble userName={user?.user_metadata?.full_name || user?.email?.split('@')[0]} />
    </div>
  );
}