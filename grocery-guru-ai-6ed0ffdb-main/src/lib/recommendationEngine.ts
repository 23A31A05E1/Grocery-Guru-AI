import { GROCERY_DATABASE, GroceryProduct, CATEGORY_MAPPINGS, DietaryPreference } from '@/data/groceryDatabase';
import { GroceryItem } from '@/types/grocery';

export interface RecommendationParams {
  budget: number;
  purpose: string;
  quality: 'budget' | 'premium';
  store: 'dmart' | 'reliance';
  dietaryPreference: DietaryPreference;
  subCategory?: string;
}

export interface RecommendationResult {
  items: GroceryItem[];
  totalAmount: number;
  savedAmount: number;
  crossSellSuggestions: GroceryProduct[];
}

// Essential items per category (must include)
const ESSENTIAL_ITEMS: Record<string, string[]> = {
  everyday: ['rice-regular', 'toor-dal', 'sunflower-oil', 'onions', 'tomatoes', 'potatoes', 'turmeric', 'salt'],
  breakfast: ['bread', 'milk', 'eggs', 'banana', 'oats'],
  lunch: ['rice-regular', 'toor-dal', 'onions', 'tomatoes', 'potatoes', 'sunflower-oil'],
  dinner: ['rice-regular', 'toor-dal', 'onions', 'tomatoes', 'sunflower-oil'],
  baking: ['maida', 'sugar', 'butter', 'eggs', 'baking-powder', 'vanilla-essence'],
  biryani: ['rice-basmati', 'onions', 'curd', 'biryani-masala', 'ghee', 'mint', 'ginger', 'garlic'],
  diet: ['oats', 'moong-dal', 'spinach', 'cucumber', 'curd', 'banana', 'almonds', 'green-tea'],
  gym: ['eggs', 'chicken', 'oats', 'banana', 'peanut-butter', 'milk', 'almonds', 'greek-yogurt'],
  snacks: ['chips', 'biscuits', 'namkeen', 'tea', 'coffee'],
  party: ['chips', 'namkeen', 'juice', 'paneer', 'cashews', 'almonds'],
  weekly: ['rice-regular', 'wheat-flour', 'toor-dal', 'sunflower-oil', 'onions', 'tomatoes', 'potatoes', 'milk', 'curd', 'bread'],
};

// Sub-category specific essentials
const SUBCATEGORY_ESSENTIALS: Record<string, string[]> = {
  'biryani-chicken': ['chicken'],
  'biryani-mutton': ['mutton'],
  'biryani-veg': ['paneer', 'cauliflower', 'capsicum'],
};

function filterByDiet(products: GroceryProduct[], diet: DietaryPreference): GroceryProduct[] {
  if (diet === 'none') return products;
  
  return products.filter(p => {
    if (diet === 'vegan') {
      return p.tags.includes('vegan');
    }
    if (diet === 'vegetarian') {
      return p.tags.includes('vegetarian') || p.tags.includes('vegan');
    }
    return true; // non-veg includes everything
  });
}

function getProductPrice(product: GroceryProduct, store: 'dmart' | 'reliance', quality: 'budget' | 'premium'): number {
  const basePrice = product.storePrices[store];
  // Premium adds 10-20% for organic/better quality variants
  return quality === 'premium' ? Math.round(basePrice * 1.15) : basePrice;
}

function calculateItemTotal(product: GroceryProduct, quantity: number, store: 'dmart' | 'reliance', quality: 'budget' | 'premium'): number {
  const pricePerUnit = getProductPrice(product, store, quality);
  return Math.round(pricePerUnit * quantity);
}

export function generateRecommendations(params: RecommendationParams): RecommendationResult {
  const { budget, purpose, quality, store, dietaryPreference, subCategory } = params;
  
  // STRICT: Never exceed budget, target 80-98% of budget
  const maxAllowed = budget * 0.98; // Never go above this
  const targetMin = budget * 0.80;  // Try to reach at least this
  
  // Get allowed categories for this purpose
  const allowedCategories = CATEGORY_MAPPINGS[purpose] || CATEGORY_MAPPINGS.everyday;
  
  // Filter products by category and dietary preference
  let availableProducts = GROCERY_DATABASE.filter(p => allowedCategories.includes(p.category));
  availableProducts = filterByDiet(availableProducts, dietaryPreference);
  
  // Sort by price (cheapest first) to maximize items within budget
  availableProducts.sort((a, b) => {
    const aPrice = calculateItemTotal(a, a.minQuantity, store, quality);
    const bPrice = calculateItemTotal(b, b.minQuantity, store, quality);
    return aPrice - bPrice;
  });
  
  // Start with essential items for this purpose
  const essentialIds = [...(ESSENTIAL_ITEMS[purpose] || ESSENTIAL_ITEMS.everyday)];
  
  // Add subcategory essentials if applicable
  if (subCategory && SUBCATEGORY_ESSENTIALS[`${purpose}-${subCategory}`]) {
    essentialIds.push(...SUBCATEGORY_ESSENTIALS[`${purpose}-${subCategory}`]);
  }
  
  const selectedItems: Map<string, { product: GroceryProduct; quantity: number }> = new Map();
  let currentTotal = 0;
  
  // First pass: Add essential items with minimum quantities (only if fits budget)
  for (const essentialId of essentialIds) {
    const product = availableProducts.find(p => p.id === essentialId);
    if (product) {
      const quantity = product.minQuantity;
      const itemTotal = calculateItemTotal(product, quantity, store, quality);
      
      // STRICT: Only add if it fits within budget
      if (currentTotal + itemTotal <= maxAllowed) {
        selectedItems.set(product.id, { product, quantity });
        currentTotal += itemTotal;
      }
    }
  }
  
  // Second pass: Add optional items to fill budget (cheapest first)
  const optionalProducts = availableProducts.filter(p => !selectedItems.has(p.id));
  
  for (const product of optionalProducts) {
    const quantity = product.minQuantity;
    const itemTotal = calculateItemTotal(product, quantity, store, quality);
    
    // STRICT: Only add if it fits within budget
    if (currentTotal + itemTotal <= maxAllowed) {
      selectedItems.set(product.id, { product, quantity });
      currentTotal += itemTotal;
    }
  }
  
  // Third pass: Increase quantities of staple items to reach target (but NEVER exceed budget)
  const staplePriority = ['rice-regular', 'rice-basmati', 'wheat-flour', 'toor-dal', 'sunflower-oil', 'milk', 'sugar'];
  
  while (currentTotal < targetMin) {
    let increased = false;
    
    for (const stapleId of staplePriority) {
      if (currentTotal >= targetMin) break;
      
      const entry = selectedItems.get(stapleId);
      if (entry && entry.quantity < entry.product.maxQuantity) {
        const oldTotal = calculateItemTotal(entry.product, entry.quantity, store, quality);
        const newQuantity = Math.min(
          entry.quantity + entry.product.quantityStep,
          entry.product.maxQuantity
        );
        const newTotal = calculateItemTotal(entry.product, newQuantity, store, quality);
        const difference = newTotal - oldTotal;
        
        // STRICT: Only increase if still under budget
        if (currentTotal + difference <= maxAllowed) {
          entry.quantity = newQuantity;
          currentTotal += difference;
          increased = true;
        }
      }
    }
    
    // Also try increasing other items
    if (!increased) {
      for (const [id, entry] of selectedItems) {
        if (currentTotal >= targetMin) break;
        
        if (entry.quantity < entry.product.maxQuantity) {
          const oldTotal = calculateItemTotal(entry.product, entry.quantity, store, quality);
          const newQuantity = Math.min(
            entry.quantity + entry.product.quantityStep,
            entry.product.maxQuantity
          );
          const newTotal = calculateItemTotal(entry.product, newQuantity, store, quality);
          const difference = newTotal - oldTotal;
          
          // STRICT: Only increase if still under budget
          if (currentTotal + difference <= maxAllowed) {
            entry.quantity = newQuantity;
            currentTotal += difference;
            increased = true;
          }
        }
      }
    }
    
    if (!increased) break; // Can't increase anymore without exceeding budget
  }
  
  // Convert to GroceryItem format
  const items: GroceryItem[] = Array.from(selectedItems.values()).map((entry, index) => {
    const price = calculateItemTotal(entry.product, entry.quantity, store, quality);
    return {
      id: `item-${index}-${entry.product.id}`,
      name: entry.product.name,
      emoji: entry.product.emoji,
      quantity: entry.quantity,
      unit: entry.product.unit,
      price, // Total price for this quantity
      category: entry.product.category,
      isChecked: false,
      healthFlags: entry.product.healthFlags,
      reason: getItemReason(entry.product, purpose, quality),
    };
  });
  
  // Generate cross-sell suggestions
  const crossSellSuggestions = generateCrossSellSuggestions(
    Array.from(selectedItems.keys()),
    availableProducts,
    dietaryPreference
  );
  
  return {
    items,
    totalAmount: currentTotal,
    savedAmount: budget - currentTotal,
    crossSellSuggestions,
  };
}

function getItemReason(product: GroceryProduct, purpose: string, quality: string): string | undefined {
  if (product.tags.includes('protein') && (purpose === 'gym' || purpose === 'diet')) {
    return 'High protein';
  }
  if (product.tags.includes('staple')) {
    return 'Essential staple';
  }
  if (quality === 'premium' && product.category === 'grains') {
    return 'Premium quality';
  }
  if (product.tags.includes('diet') && purpose === 'diet') {
    return 'Low calorie';
  }
  return undefined;
}

function generateCrossSellSuggestions(
  selectedIds: string[],
  availableProducts: GroceryProduct[],
  diet: DietaryPreference
): GroceryProduct[] {
  const suggestions: GroceryProduct[] = [];
  
  // Find alternatives for selected items
  for (const id of selectedIds) {
    const product = GROCERY_DATABASE.find(p => p.id === id);
    if (product?.alternatives) {
      for (const altId of product.alternatives) {
        if (!selectedIds.includes(altId)) {
          const altProduct = GROCERY_DATABASE.find(p => p.id === altId);
          if (altProduct && !suggestions.find(s => s.id === altId)) {
            // Check dietary preference
            if (diet === 'none' || 
                (diet === 'vegan' && altProduct.tags.includes('vegan')) ||
                (diet === 'vegetarian' && (altProduct.tags.includes('vegetarian') || altProduct.tags.includes('vegan')))) {
              suggestions.push(altProduct);
            }
          }
        }
      }
    }
  }
  
  return suggestions.slice(0, 5); // Max 5 suggestions
}

export function compareStorePrices(productId: string): { store: string; price: number; isBest: boolean }[] {
  const product = GROCERY_DATABASE.find(p => p.id === productId);
  if (!product) return [];
  
  const stores = [
    { store: 'DMart', price: product.storePrices.dmart },
    { store: 'Reliance Smart', price: product.storePrices.reliance },
    { store: 'Blinkit', price: product.storePrices.blinkit },
    { store: 'Amazon Fresh', price: product.storePrices.amazon },
    { store: 'Instamart', price: product.storePrices.instamart },
  ];
  
  const sorted = stores.sort((a, b) => a.price - b.price);
  const minPrice = sorted[0].price;
  
  return sorted.map(s => ({
    ...s,
    isBest: s.price === minPrice,
  }));
}
