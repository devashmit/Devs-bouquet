import FLOWER_TYPES from '../engine/flowers';

/**
 * AI Image Generation Service for DevsBouquet
 * 
 * Handles construction of the dynamic prompt and interfaces with
 * the image generation API (DALL-E 3, Google Imagen, etc.)
 */

const DEFAULT_PROMPT_TEMPLATE = 
  "A beautiful hand-tied bouquet of [SELECTED_FLOWERS], flowers naturally overlapping and layered at different heights, lush green foliage filling the gaps, stems gathered and tied with a soft elegant [RIBBON_COLOR] satin ribbon bow at the base. Soft watercolor illustration style, delicate linework, pastel palette, dreamy and romantic mood, cream white background. Studio quality, highly detailed.";

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
 * Currently supports a Mock mode for demonstration.
 */
export async function generateBouquetImage(flowers) {
  const prompt = buildBouquetPrompt(flowers);
  if (!prompt) return null;

  console.log("Generating with prompt:", prompt);

  // Check for API Key in environment
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey || apiKey === "YOUR_OPENAI_API_KEY") {
    // MOCK MODE: Simulate a delay and return a random "pre-generated" bouquet or a placeholder
    // In a real scenario, this would be a real API call.
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, we return a "loading" or "sample" image 
    if (flowers.length === 1) {
      const type = flowers[0].type;
      return FLOWER_TYPES[type]?.image || "/assets/flowers/classic_red_rose.png";
    }
    
    // For multiple flowers, dynamic composition in browser
    return "MOCK_COMPOSITE";
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

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
