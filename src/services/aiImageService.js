import FLOWER_TYPES from '../engine/flowers';

/**
 * AI Image Generation Service for DevsBouquet
 * 
 * Handles construction of the dynamic prompt and interfaces with
 * the image generation API (DALL-E 3, Google Imagen, etc.)
 */

const DEFAULT_PROMPT_TEMPLATE =
  "Lush professional watercolor bouquet illustration, light off-white textured background. Bouquet content: [SELECTED_FLOWERS]. Style: Exquisite botanical watercolor painting, soft wet-on-wet technique, delicate color gradients, subtle bleeding between colors, translucent layers, visible paper texture. Arrangement: Full, balanced, romantic bouquet with flowers naturally fanned out, overlapping petals, varied stem lengths. Rich green foliage including ferns, monstera, and fine leaves for contrast. Finish with a large luxurious satin [RIBBON_COLOR] ribbon bow tied around the stems, with realistic ribbon folds and soft shadows. Soft diffused lighting, gentle highlights on petals, high detail, masterpiece, intricate botanical art, warm and elegant atmosphere.";

/**
 * Determines the ribbon color based on the dominant flowers in the selection.
 * @param {Array} flowers - Array of flower objects
 * @returns {string} - Ribbon color name
 */
export function getRibbonColor(flowers) {
  if (!flowers || flowers.length === 0) return 'ivory';

  const counts = {
    pink: 0,
    warm: 0, // yellow, orange
    other: 0
  };

  flowers.forEach(f => {
    const typeInfo = FLOWER_TYPES[f.type];
    if (!typeInfo) return;

    if (typeInfo.dominantColor === 'pink') counts.pink++;
    else if (['warm', 'red'].includes(typeInfo.dominantColor)) counts.warm++;
    else counts.other++;
  });

  if (counts.pink > counts.warm && counts.pink > counts.other) return 'blush';
  if (counts.warm > counts.pink && counts.warm > counts.other) return 'champagne';
  
  return 'ivory';
}

/**
 * Generates the prompt string for the selected flowers.
 * @param {Array} flowers - Array of flower objects
 * @returns {string}
 */
export function buildBouquetPrompt(flowers) {
  if (!flowers || flowers.length === 0) return "";

  const flowerNames = flowers.map(f => FLOWER_TYPES[f.type]?.name || f.type);
  const uniqueFlowers = [...new Set(flowerNames)];
  
  // Format list: "Roses, Peonies, and Lilies"
  let flowerListStr = "";
  if (uniqueFlowers.length === 1) {
    flowerListStr = uniqueFlowers[0];
  } else if (uniqueFlowers.length === 2) {
    flowerListStr = `${uniqueFlowers[0]} and ${uniqueFlowers[1]}`;
  } else {
    flowerListStr = `${uniqueFlowers.slice(0, -1).join(', ')}, and ${uniqueFlowers.slice(-1)}`;
  }

  const ribbonColor = getRibbonColor(flowers);

  return DEFAULT_PROMPT_TEMPLATE
    .replace("[SELECTED_FLOWERS]", flowerListStr)
    .replace("[RIBBON_COLOR]", ribbonColor);
}

/**
 * Calls the AI Image Generation API.
 * Uses OpenAI if the key is provided, otherwise falls back to a free zero-config generative API.
 */
export async function generateBouquetImage(flowers) {
  const prompt = buildBouquetPrompt(flowers);
  if (!prompt) return null;

  console.log("Generating with prompt:", prompt);

  // Check for API Key in environment
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey || apiKey === "YOUR_OPENAI_API_KEY") {
    // REAL AI GENERATION (ZERO-CONFIG FALLBACK)
    // Uses pollinations.ai to generate raw image binaries based on the encoded prompt.
    const encodedPrompt = encodeURIComponent(prompt);
    const uniqueSeed = Math.floor(Math.random() * 1000000); // Unique image every time
    const freeAiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${uniqueSeed}`;
    
    // Simulate generation queue delay so the UI loader registers cleanly
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return freeAiUrl;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd"
      })
    });

    if (!response.ok) {
       throw new Error(`OpenAI API failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
