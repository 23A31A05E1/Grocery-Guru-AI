export interface GroceryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  isChecked: boolean;
  reason?: string;
  healthFlags?: string[];
}

export interface ShoppingList {
  id: string;
  name: string;
  store: 'dmart' | 'reliance';
  budget: number;
  purpose: string;
  quality: 'budget' | 'premium';
  items: GroceryItem[];
  totalAmount: number;
  isCompleted: boolean;
  createdAt: Date;
}

export interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: Date;
  addedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  dietaryPreference: 'none' | 'vegetarian' | 'vegan' | 'keto' | 'diabetic';
  qualityPreference: 'budget' | 'premium';
  favoriteStore: 'dmart' | 'reliance';
  familySize: number;
  aiPersonality: 'smart' | 'friendly' | 'fitness' | 'chef' | 'family';
}

export interface Achievement {
  id: string;
  type: 'budget_boss' | 'waste_saver' | 'protein_pro' | 'green_champion' | 'streak_master';
  earnedAt: Date;
  title: string;
  description: string;
  emoji: string;
}

export interface ShoppingPreferences {
  store: 'dmart' | 'reliance' | null;
  budget: number | null;
  quality: 'budget' | 'premium' | null;
  purpose: string | null;
  subCategory: string | null;
}

export const PURPOSES = [
  { id: 'everyday', label: 'Everyday', emoji: '🍞' },
  { id: 'baking', label: 'Baking', emoji: '🍰' },
  { id: 'biryani', label: 'Biryani', emoji: '🍗' },
  { id: 'diet', label: 'Diet', emoji: '🥗' },
  { id: 'gym', label: 'Gym', emoji: '🏋️' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🥞' },
  { id: 'lunch', label: 'Lunch', emoji: '🍱' },
  { id: 'dinner', label: 'Dinner', emoji: '🍽️' },
  { id: 'snacks', label: 'Snacks', emoji: '🍿' },
  { id: 'beverages', label: 'Beverages', emoji: '🥤' },
] as const;

export const BIRYANI_SUBCATEGORIES = [
  { id: 'chicken', label: 'Chicken Biryani', emoji: '🐔' },
  { id: 'mutton', label: 'Mutton Biryani', emoji: '🐑' },
  { id: 'veg', label: 'Veg Biryani', emoji: '🥕' },
  { id: 'prawns', label: 'Prawns Biryani', emoji: '🦐' },
  { id: 'mixed', label: 'Mixed Biryani', emoji: '🍲' },
] as const;

export const AI_PERSONALITIES = [
  { id: 'smart', label: 'Smart Planner', emoji: '🧠', description: 'Efficient, data-driven advice' },
  { id: 'friendly', label: 'Friendly Buddy', emoji: '😄', description: 'Warm, encouraging, emoji-friendly' },
  { id: 'fitness', label: 'Fitness Coach', emoji: '💪', description: 'Protein-focused, macro-aware' },
  { id: 'chef', label: 'Chef Mode', emoji: '👩‍🍳', description: 'Recipe ideas, cooking tips' },
  { id: 'family', label: 'Family Shopper', emoji: '👨‍👩‍👧', description: 'Kid-friendly, bulk deals' },
] as const;

export const ACHIEVEMENTS_CONFIG: Record<string, { title: string; description: string; emoji: string }> = {
  budget_boss: {
    title: 'Budget Boss',
    emoji: '🥇',
    description: 'Stayed under budget 5 times',
  },
  waste_saver: {
    title: 'Waste Saver',
    emoji: '♻️',
    description: 'Used expiring items before they spoiled',
  },
  protein_pro: {
    title: 'Protein Pro',
    emoji: '💪',
    description: 'Maintained gym-friendly streak',
  },
  green_champion: {
    title: 'Green Champion',
    emoji: '🌱',
    description: 'Chose seasonal produce',
  },
  streak_master: {
    title: 'Streak Master',
    emoji: '🔥',
    description: '7-day planning streak',
  },
};