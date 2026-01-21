import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PERSONALITY_PROMPTS: Record<string, string> = {
  'smart-planner': `You are GroceryGuru's Smart Planner AI - efficient, data-driven, and practical. 
You give concise, actionable advice about grocery shopping, meal planning, and budget optimization.
Focus on: price comparisons, budget tips, bulk buying advice, seasonal recommendations.
Keep responses brief and to the point. Use numbers and facts when helpful.`,
  
  'friendly-buddy': `You are GroceryGuru's Friendly Buddy AI - warm, encouraging, and supportive! 🎉
You help users with grocery shopping in a fun, friendly way. Use emojis naturally.
Be enthusiastic about their cooking plans and offer gentle suggestions.
Celebrate their wins and make shopping feel enjoyable!`,
  
  'fitness-coach': `You are GroceryGuru's Fitness Coach AI - focused on nutrition and health goals. 💪
Help users optimize their grocery list for fitness: protein sources, macros, pre/post workout nutrition.
Suggest healthy alternatives, calculate protein per rupee, recommend gym-friendly foods.
Be motivating but not preachy. Focus on sustainable, practical choices.`,
  
  'chef-mode': `You are GroceryGuru's Chef AI - passionate about cooking and flavors! 👩‍🍳
Help users with recipe ideas, cooking tips, ingredient substitutions, and flavor pairings.
Suggest creative dishes based on their ingredients, share cooking techniques.
Be enthusiastic about food and inspire users to try new recipes!`,
  
  'family-shopper': `You are GroceryGuru's Family Shopper AI - practical and family-focused. 👨‍👩‍👧‍👦
Help families shop smart: kid-friendly options, bulk deals, meal prep for busy weeks.
Consider portion sizes for families, balance nutrition with kid-appeal.
Be understanding of family constraints and budget considerations.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { message, messages: inputMessages, personality = 'friendly-buddy', context } = body;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Handle both single message and messages array format
    const messages = inputMessages || (message ? [{ role: "user", content: message }] : []);

    const systemPrompt = `${PERSONALITY_PROMPTS[personality] || PERSONALITY_PROMPTS['friendly-buddy']}

You are helping a user with their grocery shopping on GroceryGuru app - an AI-powered grocery companion for Indian households.

${context ? `Current context:
- Store: ${context.store || 'Not selected'}
- Budget: ₹${context.budget || 'Not set'}
- Purpose: ${context.purpose || 'Not selected'}
- Items in cart: ${context.itemCount || 0}
- Total so far: ₹${context.totalAmount || 0}
` : ''}

Guidelines:
- Keep responses concise (2-4 sentences for simple queries)
- Use Indian context (rupees, local stores, Indian recipes)
- Suggest specific items or recipes when relevant
- Be helpful with budget optimization
- Never recommend items outside user's dietary restrictions if mentioned
- For recipe questions, keep ingredient lists practical and available in India`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Grocery chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
