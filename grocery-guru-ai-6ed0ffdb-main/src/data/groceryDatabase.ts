// Comprehensive grocery database with realistic Indian market prices
// Price is per unit (kg, L, pkt, etc.)

export interface GroceryProduct {
  id: string;
  name: string;
  emoji: string;
  category: string;
  subCategory?: string;
  unit: string;
  pricePerUnit: number; // Price per 1 unit
  minQuantity: number;
  maxQuantity: number;
  quantityStep: number;
  tags: string[]; // vegan, vegetarian, protein, low-calorie, gluten-free, etc.
  healthFlags?: string[];
  alternatives?: string[]; // IDs of alternative products
  storePrices: {
    dmart: number;
    reliance: number;
    blinkit: number;
    amazon: number;
    instamart: number;
  };
}

export const GROCERY_DATABASE: GroceryProduct[] = [
  // ===== GRAINS & STAPLES =====
  { id: 'rice-basmati', name: 'Basmati Rice', emoji: '🍚', category: 'grains', unit: 'kg', pricePerUnit: 95, minQuantity: 1, maxQuantity: 5, quantityStep: 1, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 95, reliance: 98, blinkit: 105, amazon: 99, instamart: 102 } },
  { id: 'rice-regular', name: 'Regular Rice', emoji: '🍚', category: 'grains', unit: 'kg', pricePerUnit: 55, minQuantity: 1, maxQuantity: 10, quantityStep: 1, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 55, reliance: 58, blinkit: 62, amazon: 60, instamart: 59 } },
  { id: 'wheat-flour', name: 'Wheat Flour (Atta)', emoji: '🌾', category: 'grains', unit: 'kg', pricePerUnit: 45, minQuantity: 1, maxQuantity: 10, quantityStep: 1, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 45, reliance: 47, blinkit: 50, amazon: 48, instamart: 49 } },
  { id: 'oats', name: 'Oats', emoji: '🥣', category: 'grains', unit: 'kg', pricePerUnit: 180, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'gym', 'diet', 'breakfast'], storePrices: { dmart: 180, reliance: 185, blinkit: 195, amazon: 190, instamart: 188 } },
  { id: 'poha', name: 'Poha (Flattened Rice)', emoji: '🍚', category: 'grains', unit: 'kg', pricePerUnit: 65, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'breakfast'], storePrices: { dmart: 65, reliance: 68, blinkit: 72, amazon: 70, instamart: 69 } },
  
  // ===== PULSES & LENTILS =====
  { id: 'toor-dal', name: 'Toor Dal', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 160, minQuantity: 0.5, maxQuantity: 3, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein', 'staple'], alternatives: ['moong-dal', 'chana-dal', 'urad-dal'], storePrices: { dmart: 160, reliance: 165, blinkit: 175, amazon: 170, instamart: 168 } },
  { id: 'moong-dal', name: 'Moong Dal', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 140, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein', 'diet'], alternatives: ['toor-dal', 'masoor-dal'], storePrices: { dmart: 140, reliance: 145, blinkit: 152, amazon: 148, instamart: 150 } },
  { id: 'chana-dal', name: 'Chana Dal', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 120, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein'], alternatives: ['toor-dal'], storePrices: { dmart: 120, reliance: 125, blinkit: 130, amazon: 128, instamart: 127 } },
  { id: 'urad-dal', name: 'Urad Dal', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 150, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein'], storePrices: { dmart: 150, reliance: 155, blinkit: 162, amazon: 158, instamart: 160 } },
  { id: 'masoor-dal', name: 'Masoor Dal', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 130, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein', 'diet'], storePrices: { dmart: 130, reliance: 135, blinkit: 142, amazon: 138, instamart: 140 } },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 180, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein'], storePrices: { dmart: 180, reliance: 185, blinkit: 195, amazon: 190, instamart: 188 } },
  { id: 'chole', name: 'Chole (Chickpeas)', emoji: '🫘', category: 'pulses', unit: 'kg', pricePerUnit: 140, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'protein', 'gym'], storePrices: { dmart: 140, reliance: 145, blinkit: 152, amazon: 148, instamart: 150 } },

  // ===== VEGETABLES =====
  { id: 'onions', name: 'Onions', emoji: '🧅', category: 'vegetables', unit: 'kg', pricePerUnit: 45, minQuantity: 0.5, maxQuantity: 3, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 45, reliance: 48, blinkit: 52, amazon: 50, instamart: 49 } },
  { id: 'tomatoes', name: 'Tomatoes', emoji: '🍅', category: 'vegetables', unit: 'kg', pricePerUnit: 40, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 40, reliance: 42, blinkit: 48, amazon: 45, instamart: 44 } },
  { id: 'potatoes', name: 'Potatoes', emoji: '🥔', category: 'vegetables', unit: 'kg', pricePerUnit: 30, minQuantity: 1, maxQuantity: 5, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 30, reliance: 32, blinkit: 38, amazon: 35, instamart: 34 } },
  { id: 'carrots', name: 'Carrots', emoji: '🥕', category: 'vegetables', unit: 'kg', pricePerUnit: 50, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 50, reliance: 52, blinkit: 58, amazon: 55, instamart: 54 } },
  { id: 'spinach', name: 'Spinach (Palak)', emoji: '🥬', category: 'vegetables', unit: 'bunch', pricePerUnit: 25, minQuantity: 1, maxQuantity: 4, quantityStep: 1, tags: ['vegetarian', 'vegan', 'diet', 'gym'], storePrices: { dmart: 25, reliance: 28, blinkit: 32, amazon: 30, instamart: 29 } },
  { id: 'capsicum', name: 'Capsicum', emoji: '🫑', category: 'vegetables', unit: 'kg', pricePerUnit: 80, minQuantity: 0.25, maxQuantity: 1, quantityStep: 0.25, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 80, reliance: 85, blinkit: 95, amazon: 90, instamart: 88 } },
  { id: 'cauliflower', name: 'Cauliflower', emoji: '🥦', category: 'vegetables', unit: 'pc', pricePerUnit: 40, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 40, reliance: 42, blinkit: 48, amazon: 45, instamart: 44 } },
  { id: 'brinjal', name: 'Brinjal', emoji: '🍆', category: 'vegetables', unit: 'kg', pricePerUnit: 35, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 35, reliance: 38, blinkit: 42, amazon: 40, instamart: 39 } },
  { id: 'ladyfinger', name: 'Lady Finger (Bhindi)', emoji: '🥒', category: 'vegetables', unit: 'kg', pricePerUnit: 55, minQuantity: 0.5, maxQuantity: 1, quantityStep: 0.25, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 55, reliance: 58, blinkit: 65, amazon: 62, instamart: 60 } },
  { id: 'green-chillies', name: 'Green Chillies', emoji: '🌶️', category: 'vegetables', unit: 'g', pricePerUnit: 0.4, minQuantity: 100, maxQuantity: 250, quantityStep: 50, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.4, reliance: 0.42, blinkit: 0.5, amazon: 0.45, instamart: 0.44 } },
  { id: 'ginger', name: 'Ginger', emoji: '🫚', category: 'vegetables', unit: 'g', pricePerUnit: 0.3, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.3, reliance: 0.32, blinkit: 0.38, amazon: 0.35, instamart: 0.34 } },
  { id: 'garlic', name: 'Garlic', emoji: '🧄', category: 'vegetables', unit: 'g', pricePerUnit: 0.35, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.35, reliance: 0.38, blinkit: 0.42, amazon: 0.4, instamart: 0.39 } },
  { id: 'coriander', name: 'Coriander Leaves', emoji: '🌿', category: 'vegetables', unit: 'bunch', pricePerUnit: 15, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 15, reliance: 18, blinkit: 22, amazon: 20, instamart: 19 } },
  { id: 'mint', name: 'Mint Leaves', emoji: '🌿', category: 'vegetables', unit: 'bunch', pricePerUnit: 15, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 15, reliance: 18, blinkit: 22, amazon: 20, instamart: 19 } },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', category: 'vegetables', unit: 'kg', pricePerUnit: 35, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 35, reliance: 38, blinkit: 42, amazon: 40, instamart: 39 } },
  { id: 'lemon', name: 'Lemons', emoji: '🍋', category: 'vegetables', unit: 'pc', pricePerUnit: 5, minQuantity: 4, maxQuantity: 12, quantityStep: 2, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 5, reliance: 6, blinkit: 7, amazon: 6, instamart: 6 } },

  // ===== DAIRY =====
  { id: 'milk', name: 'Milk', emoji: '🥛', category: 'dairy', unit: 'L', pricePerUnit: 62, minQuantity: 1, maxQuantity: 5, quantityStep: 0.5, tags: ['vegetarian', 'protein'], storePrices: { dmart: 62, reliance: 62, blinkit: 64, amazon: 63, instamart: 63 } },
  { id: 'curd', name: 'Curd (Dahi)', emoji: '🥛', category: 'dairy', unit: 'kg', pricePerUnit: 70, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'protein', 'probiotic'], storePrices: { dmart: 70, reliance: 72, blinkit: 78, amazon: 75, instamart: 74 } },
  { id: 'paneer', name: 'Paneer', emoji: '🧀', category: 'dairy', unit: 'g', pricePerUnit: 0.42, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'protein', 'gym'], storePrices: { dmart: 0.42, reliance: 0.44, blinkit: 0.48, amazon: 0.46, instamart: 0.45 } },
  { id: 'butter', name: 'Butter', emoji: '🧈', category: 'dairy', unit: 'g', pricePerUnit: 0.55, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian'], storePrices: { dmart: 0.55, reliance: 0.58, blinkit: 0.62, amazon: 0.6, instamart: 0.59 } },
  { id: 'ghee', name: 'Ghee', emoji: '🧈', category: 'dairy', unit: 'kg', pricePerUnit: 550, minQuantity: 0.2, maxQuantity: 1, quantityStep: 0.2, tags: ['vegetarian'], storePrices: { dmart: 550, reliance: 565, blinkit: 590, amazon: 575, instamart: 570 } },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', category: 'dairy', unit: 'g', pricePerUnit: 0.7, minQuantity: 100, maxQuantity: 400, quantityStep: 100, tags: ['vegetarian', 'protein'], storePrices: { dmart: 0.7, reliance: 0.72, blinkit: 0.78, amazon: 0.75, instamart: 0.74 } },
  { id: 'cream', name: 'Fresh Cream', emoji: '🍨', category: 'dairy', unit: 'ml', pricePerUnit: 0.18, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian'], storePrices: { dmart: 0.18, reliance: 0.19, blinkit: 0.21, amazon: 0.2, instamart: 0.19 } },

  // ===== EGGS & MEAT =====
  { id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'eggs', unit: 'pc', pricePerUnit: 8, minQuantity: 6, maxQuantity: 30, quantityStep: 6, tags: ['protein', 'gym', 'breakfast'], storePrices: { dmart: 8, reliance: 8.5, blinkit: 9, amazon: 8.5, instamart: 8.5 } },
  { id: 'chicken', name: 'Chicken', emoji: '🍗', category: 'meat', unit: 'kg', pricePerUnit: 280, minQuantity: 0.5, maxQuantity: 3, quantityStep: 0.5, tags: ['protein', 'gym', 'non-veg'], storePrices: { dmart: 280, reliance: 290, blinkit: 320, amazon: 300, instamart: 295 } },
  { id: 'mutton', name: 'Mutton', emoji: '🥩', category: 'meat', unit: 'kg', pricePerUnit: 750, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['protein', 'non-veg'], storePrices: { dmart: 750, reliance: 780, blinkit: 850, amazon: 800, instamart: 790 } },
  { id: 'fish', name: 'Fish (Rohu)', emoji: '🐟', category: 'meat', unit: 'kg', pricePerUnit: 350, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['protein', 'gym', 'non-veg'], storePrices: { dmart: 350, reliance: 365, blinkit: 400, amazon: 380, instamart: 370 } },
  { id: 'prawns', name: 'Prawns', emoji: '🦐', category: 'meat', unit: 'kg', pricePerUnit: 650, minQuantity: 0.5, maxQuantity: 1, quantityStep: 0.25, tags: ['protein', 'non-veg'], storePrices: { dmart: 650, reliance: 680, blinkit: 750, amazon: 700, instamart: 690 } },

  // ===== OILS =====
  { id: 'sunflower-oil', name: 'Sunflower Oil', emoji: '🫒', category: 'oils', unit: 'L', pricePerUnit: 145, minQuantity: 1, maxQuantity: 5, quantityStep: 1, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 145, reliance: 150, blinkit: 162, amazon: 155, instamart: 152 } },
  { id: 'mustard-oil', name: 'Mustard Oil', emoji: '🫒', category: 'oils', unit: 'L', pricePerUnit: 170, minQuantity: 1, maxQuantity: 5, quantityStep: 1, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 170, reliance: 175, blinkit: 185, amazon: 180, instamart: 178 } },
  { id: 'olive-oil', name: 'Olive Oil', emoji: '🫒', category: 'oils', unit: 'L', pricePerUnit: 650, minQuantity: 0.5, maxQuantity: 1, quantityStep: 0.25, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 650, reliance: 680, blinkit: 720, amazon: 695, instamart: 700 } },
  { id: 'coconut-oil', name: 'Coconut Oil', emoji: '🥥', category: 'oils', unit: 'L', pricePerUnit: 220, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 220, reliance: 230, blinkit: 250, amazon: 240, instamart: 235 } },

  // ===== SPICES =====
  { id: 'turmeric', name: 'Turmeric Powder', emoji: '🌶️', category: 'spices', unit: 'g', pricePerUnit: 0.4, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.4, reliance: 0.42, blinkit: 0.48, amazon: 0.45, instamart: 0.44 } },
  { id: 'red-chilli', name: 'Red Chilli Powder', emoji: '🌶️', category: 'spices', unit: 'g', pricePerUnit: 0.5, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.5, reliance: 0.52, blinkit: 0.58, amazon: 0.55, instamart: 0.54 } },
  { id: 'coriander-powder', name: 'Coriander Powder', emoji: '🌶️', category: 'spices', unit: 'g', pricePerUnit: 0.35, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.35, reliance: 0.38, blinkit: 0.42, amazon: 0.4, instamart: 0.39 } },
  { id: 'cumin', name: 'Cumin Seeds (Jeera)', emoji: '🌶️', category: 'spices', unit: 'g', pricePerUnit: 0.6, minQuantity: 100, maxQuantity: 250, quantityStep: 50, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.6, reliance: 0.62, blinkit: 0.7, amazon: 0.65, instamart: 0.64 } },
  { id: 'garam-masala', name: 'Garam Masala', emoji: '🌶️', category: 'spices', unit: 'g', pricePerUnit: 0.8, minQuantity: 50, maxQuantity: 200, quantityStep: 50, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.8, reliance: 0.85, blinkit: 0.95, amazon: 0.9, instamart: 0.88 } },
  { id: 'biryani-masala', name: 'Biryani Masala', emoji: '🌶️', category: 'spices', unit: 'pkt', pricePerUnit: 45, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 45, reliance: 48, blinkit: 55, amazon: 50, instamart: 49 } },
  { id: 'saffron', name: 'Saffron', emoji: '🌸', category: 'spices', unit: 'g', pricePerUnit: 80, minQuantity: 1, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 80, reliance: 85, blinkit: 95, amazon: 90, instamart: 88 } },
  { id: 'salt', name: 'Salt', emoji: '🧂', category: 'spices', unit: 'kg', pricePerUnit: 25, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['vegetarian', 'vegan', 'staple'], storePrices: { dmart: 25, reliance: 26, blinkit: 28, amazon: 27, instamart: 27 } },
  { id: 'black-pepper', name: 'Black Pepper', emoji: '⚫', category: 'spices', unit: 'g', pricePerUnit: 1.2, minQuantity: 50, maxQuantity: 200, quantityStep: 50, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 1.2, reliance: 1.25, blinkit: 1.4, amazon: 1.3, instamart: 1.28 } },

  // ===== BAKING =====
  { id: 'maida', name: 'Maida (All Purpose Flour)', emoji: '🌾', category: 'baking', unit: 'kg', pricePerUnit: 55, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'baking'], storePrices: { dmart: 55, reliance: 58, blinkit: 62, amazon: 60, instamart: 59 } },
  { id: 'sugar', name: 'Sugar', emoji: '🍬', category: 'baking', unit: 'kg', pricePerUnit: 48, minQuantity: 1, maxQuantity: 5, quantityStep: 1, tags: ['vegetarian', 'vegan', 'baking', 'staple'], healthFlags: ['high_sugar'], storePrices: { dmart: 48, reliance: 50, blinkit: 54, amazon: 52, instamart: 51 } },
  { id: 'baking-powder', name: 'Baking Powder', emoji: '🥄', category: 'baking', unit: 'g', pricePerUnit: 0.6, minQuantity: 50, maxQuantity: 200, quantityStep: 50, tags: ['vegetarian', 'vegan', 'baking'], storePrices: { dmart: 0.6, reliance: 0.65, blinkit: 0.72, amazon: 0.68, instamart: 0.66 } },
  { id: 'baking-soda', name: 'Baking Soda', emoji: '🥄', category: 'baking', unit: 'g', pricePerUnit: 0.3, minQuantity: 50, maxQuantity: 200, quantityStep: 50, tags: ['vegetarian', 'vegan', 'baking'], storePrices: { dmart: 0.3, reliance: 0.32, blinkit: 0.38, amazon: 0.35, instamart: 0.34 } },
  { id: 'vanilla-essence', name: 'Vanilla Essence', emoji: '🍦', category: 'baking', unit: 'ml', pricePerUnit: 0.8, minQuantity: 25, maxQuantity: 100, quantityStep: 25, tags: ['vegetarian', 'baking'], storePrices: { dmart: 0.8, reliance: 0.85, blinkit: 0.95, amazon: 0.9, instamart: 0.88 } },
  { id: 'cocoa-powder', name: 'Cocoa Powder', emoji: '🍫', category: 'baking', unit: 'g', pricePerUnit: 1.5, minQuantity: 100, maxQuantity: 300, quantityStep: 50, tags: ['vegetarian', 'baking'], storePrices: { dmart: 1.5, reliance: 1.55, blinkit: 1.7, amazon: 1.6, instamart: 1.58 } },
  { id: 'condensed-milk', name: 'Condensed Milk', emoji: '🥛', category: 'baking', unit: 'g', pricePerUnit: 0.28, minQuantity: 200, maxQuantity: 400, quantityStep: 100, tags: ['vegetarian', 'baking'], storePrices: { dmart: 0.28, reliance: 0.3, blinkit: 0.34, amazon: 0.32, instamart: 0.31 } },

  // ===== BREAKFAST =====
  { id: 'bread', name: 'Bread', emoji: '🍞', category: 'breakfast', unit: 'pkt', pricePerUnit: 45, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'breakfast'], storePrices: { dmart: 45, reliance: 48, blinkit: 52, amazon: 50, instamart: 49 } },
  { id: 'cornflakes', name: 'Cornflakes', emoji: '🥣', category: 'breakfast', unit: 'pkt', pricePerUnit: 180, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['vegetarian', 'breakfast'], storePrices: { dmart: 180, reliance: 185, blinkit: 198, amazon: 190, instamart: 188 } },
  { id: 'muesli', name: 'Muesli', emoji: '🥣', category: 'breakfast', unit: 'kg', pricePerUnit: 380, minQuantity: 0.5, maxQuantity: 1, quantityStep: 0.5, tags: ['vegetarian', 'breakfast', 'diet', 'gym'], storePrices: { dmart: 380, reliance: 395, blinkit: 420, amazon: 400, instamart: 395 } },
  { id: 'honey', name: 'Honey', emoji: '🍯', category: 'breakfast', unit: 'g', pricePerUnit: 0.6, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'breakfast', 'diet'], storePrices: { dmart: 0.6, reliance: 0.62, blinkit: 0.7, amazon: 0.65, instamart: 0.64 } },
  { id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', category: 'breakfast', unit: 'g', pricePerUnit: 0.45, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'protein', 'gym', 'breakfast'], storePrices: { dmart: 0.45, reliance: 0.48, blinkit: 0.52, amazon: 0.5, instamart: 0.49 } },
  { id: 'jam', name: 'Mixed Fruit Jam', emoji: '🍓', category: 'breakfast', unit: 'g', pricePerUnit: 0.28, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'breakfast'], healthFlags: ['high_sugar'], storePrices: { dmart: 0.28, reliance: 0.3, blinkit: 0.34, amazon: 0.32, instamart: 0.31 } },

  // ===== SNACKS =====
  { id: 'chips', name: 'Potato Chips', emoji: '🍟', category: 'snacks', unit: 'pkt', pricePerUnit: 30, minQuantity: 2, maxQuantity: 6, quantityStep: 1, tags: ['vegetarian', 'snacks'], healthFlags: ['high_sodium'], storePrices: { dmart: 30, reliance: 32, blinkit: 35, amazon: 33, instamart: 32 } },
  { id: 'biscuits', name: 'Biscuits', emoji: '🍪', category: 'snacks', unit: 'pkt', pricePerUnit: 35, minQuantity: 2, maxQuantity: 6, quantityStep: 1, tags: ['vegetarian', 'snacks'], storePrices: { dmart: 35, reliance: 38, blinkit: 42, amazon: 40, instamart: 39 } },
  { id: 'namkeen', name: 'Namkeen Mix', emoji: '🥨', category: 'snacks', unit: 'pkt', pricePerUnit: 45, minQuantity: 1, maxQuantity: 4, quantityStep: 1, tags: ['vegetarian', 'snacks'], healthFlags: ['high_sodium'], storePrices: { dmart: 45, reliance: 48, blinkit: 52, amazon: 50, instamart: 49 } },
  { id: 'maggi', name: 'Maggi Noodles', emoji: '🍜', category: 'snacks', unit: 'pkt', pricePerUnit: 14, minQuantity: 4, maxQuantity: 12, quantityStep: 2, tags: ['vegetarian', 'snacks'], healthFlags: ['high_sodium'], storePrices: { dmart: 14, reliance: 14, blinkit: 15, amazon: 14.5, instamart: 14.5 } },
  { id: 'bhujia', name: 'Bhujia', emoji: '🥨', category: 'snacks', unit: 'g', pricePerUnit: 0.25, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'snacks'], healthFlags: ['high_sodium'], storePrices: { dmart: 0.25, reliance: 0.28, blinkit: 0.32, amazon: 0.3, instamart: 0.29 } },
  { id: 'almonds', name: 'Almonds', emoji: '🌰', category: 'snacks', subCategory: 'nuts', unit: 'g', pricePerUnit: 1.2, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'protein', 'gym', 'diet'], storePrices: { dmart: 1.2, reliance: 1.25, blinkit: 1.35, amazon: 1.3, instamart: 1.28 } },
  { id: 'cashews', name: 'Cashews', emoji: '🥜', category: 'snacks', subCategory: 'nuts', unit: 'g', pricePerUnit: 1.0, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'protein'], storePrices: { dmart: 1.0, reliance: 1.05, blinkit: 1.15, amazon: 1.1, instamart: 1.08 } },
  { id: 'raisins', name: 'Raisins', emoji: '🍇', category: 'snacks', subCategory: 'nuts', unit: 'g', pricePerUnit: 0.4, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.4, reliance: 0.42, blinkit: 0.48, amazon: 0.45, instamart: 0.44 } },
  { id: 'dates', name: 'Dates', emoji: '🌴', category: 'snacks', subCategory: 'nuts', unit: 'g', pricePerUnit: 0.5, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'gym'], storePrices: { dmart: 0.5, reliance: 0.52, blinkit: 0.58, amazon: 0.55, instamart: 0.54 } },

  // ===== BEVERAGES =====
  { id: 'tea', name: 'Tea Leaves', emoji: '🍵', category: 'beverages', unit: 'g', pricePerUnit: 0.5, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.5, reliance: 0.52, blinkit: 0.58, amazon: 0.55, instamart: 0.54 } },
  { id: 'coffee', name: 'Coffee Powder', emoji: '☕', category: 'beverages', unit: 'g', pricePerUnit: 0.8, minQuantity: 100, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 0.8, reliance: 0.85, blinkit: 0.95, amazon: 0.9, instamart: 0.88 } },
  { id: 'green-tea', name: 'Green Tea', emoji: '🍵', category: 'beverages', unit: 'pkt', pricePerUnit: 150, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 150, reliance: 155, blinkit: 170, amazon: 160, instamart: 158 } },
  { id: 'juice', name: 'Fruit Juice', emoji: '🧃', category: 'beverages', unit: 'L', pricePerUnit: 120, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan'], healthFlags: ['high_sugar'], storePrices: { dmart: 120, reliance: 125, blinkit: 135, amazon: 130, instamart: 128 } },
  { id: 'coconut-water', name: 'Coconut Water', emoji: '🥥', category: 'beverages', unit: 'L', pricePerUnit: 90, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan', 'diet', 'gym'], storePrices: { dmart: 90, reliance: 95, blinkit: 105, amazon: 100, instamart: 98 } },
  { id: 'lassi', name: 'Lassi', emoji: '🥛', category: 'beverages', unit: 'ml', pricePerUnit: 0.08, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'probiotic'], storePrices: { dmart: 0.08, reliance: 0.085, blinkit: 0.095, amazon: 0.09, instamart: 0.088 } },

  // ===== GYM & PROTEIN =====
  { id: 'whey-protein', name: 'Whey Protein', emoji: '💪', category: 'gym', unit: 'kg', pricePerUnit: 2200, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['gym', 'protein'], storePrices: { dmart: 2200, reliance: 2280, blinkit: 2400, amazon: 2100, instamart: 2350 } },
  { id: 'protein-bar', name: 'Protein Bar (Pack of 6)', emoji: '🍫', category: 'gym', unit: 'pkt', pricePerUnit: 480, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['gym', 'protein'], storePrices: { dmart: 480, reliance: 495, blinkit: 520, amazon: 450, instamart: 510 } },
  { id: 'flax-seeds', name: 'Flax Seeds', emoji: '🌱', category: 'gym', unit: 'g', pricePerUnit: 0.4, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'gym', 'diet'], storePrices: { dmart: 0.4, reliance: 0.42, blinkit: 0.48, amazon: 0.45, instamart: 0.44 } },
  { id: 'chia-seeds', name: 'Chia Seeds', emoji: '🌱', category: 'gym', unit: 'g', pricePerUnit: 0.8, minQuantity: 200, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'gym', 'diet'], storePrices: { dmart: 0.8, reliance: 0.85, blinkit: 0.95, amazon: 0.9, instamart: 0.88 } },
  { id: 'greek-yogurt', name: 'Greek Yogurt', emoji: '🥛', category: 'gym', unit: 'g', pricePerUnit: 0.5, minQuantity: 400, maxQuantity: 800, quantityStep: 200, tags: ['vegetarian', 'protein', 'gym'], storePrices: { dmart: 0.5, reliance: 0.52, blinkit: 0.58, amazon: 0.55, instamart: 0.54 } },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'gym', unit: 'g', pricePerUnit: 0.6, minQuantity: 250, maxQuantity: 500, quantityStep: 100, tags: ['vegetarian', 'vegan', 'protein', 'gym', 'diet', 'gluten-free'], storePrices: { dmart: 0.6, reliance: 0.65, blinkit: 0.72, amazon: 0.68, instamart: 0.66 } },

  // ===== FRUITS =====
  { id: 'banana', name: 'Bananas', emoji: '🍌', category: 'fruits', unit: 'dozen', pricePerUnit: 60, minQuantity: 1, maxQuantity: 3, quantityStep: 1, tags: ['vegetarian', 'vegan', 'gym', 'breakfast'], storePrices: { dmart: 60, reliance: 62, blinkit: 70, amazon: 65, instamart: 64 } },
  { id: 'apple', name: 'Apples', emoji: '🍎', category: 'fruits', unit: 'kg', pricePerUnit: 180, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 180, reliance: 185, blinkit: 200, amazon: 190, instamart: 188 } },
  { id: 'orange', name: 'Oranges', emoji: '🍊', category: 'fruits', unit: 'kg', pricePerUnit: 120, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 120, reliance: 125, blinkit: 135, amazon: 130, instamart: 128 } },
  { id: 'mango', name: 'Mangoes', emoji: '🥭', category: 'fruits', unit: 'kg', pricePerUnit: 150, minQuantity: 1, maxQuantity: 3, quantityStep: 0.5, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 150, reliance: 155, blinkit: 170, amazon: 160, instamart: 158 } },
  { id: 'grapes', name: 'Grapes', emoji: '🍇', category: 'fruits', unit: 'kg', pricePerUnit: 120, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan'], storePrices: { dmart: 120, reliance: 125, blinkit: 138, amazon: 130, instamart: 128 } },
  { id: 'pomegranate', name: 'Pomegranate', emoji: '🍎', category: 'fruits', unit: 'kg', pricePerUnit: 200, minQuantity: 0.5, maxQuantity: 2, quantityStep: 0.5, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 200, reliance: 210, blinkit: 230, amazon: 220, instamart: 215 } },
  { id: 'papaya', name: 'Papaya', emoji: '🍈', category: 'fruits', unit: 'pc', pricePerUnit: 60, minQuantity: 1, maxQuantity: 2, quantityStep: 1, tags: ['vegetarian', 'vegan', 'diet'], storePrices: { dmart: 60, reliance: 65, blinkit: 75, amazon: 70, instamart: 68 } },
];

// Category mappings for different purposes
export const CATEGORY_MAPPINGS: Record<string, string[]> = {
  everyday: ['grains', 'pulses', 'vegetables', 'dairy', 'oils', 'spices'],
  breakfast: ['breakfast', 'dairy', 'fruits'],
  lunch: ['grains', 'pulses', 'vegetables', 'dairy', 'oils', 'spices', 'meat', 'eggs'],
  dinner: ['grains', 'pulses', 'vegetables', 'dairy', 'oils', 'spices', 'meat'],
  snacks: ['snacks', 'beverages'],
  baking: ['baking', 'dairy'],
  biryani: ['grains', 'meat', 'vegetables', 'dairy', 'spices', 'oils'],
  diet: ['vegetables', 'fruits', 'pulses', 'dairy', 'gym'],
  gym: ['gym', 'dairy', 'eggs', 'meat', 'fruits', 'pulses'],
  party: ['snacks', 'beverages', 'dairy', 'meat', 'fruits'],
  weekly: ['grains', 'pulses', 'vegetables', 'dairy', 'oils', 'spices', 'fruits', 'snacks', 'beverages', 'breakfast'],
};

export type DietaryPreference = 'none' | 'vegetarian' | 'vegan' | 'non-veg';
