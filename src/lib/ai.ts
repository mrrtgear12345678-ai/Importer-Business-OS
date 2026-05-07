import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateProductDescription = async (name: string, category: string, features: string[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a professional, catchy product description for a ${category} item named "${name}". Key features: ${features.join(', ')}. Format as a short paragraph.`,
  });
  return response.text;
};

export const getAIPricingSuggestion = async (costPrice: number, category: string, currentRetail: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Given a product in category "${category}" with a landing cost of ${costPrice} and current retail price of ${currentRetail}, suggest an optimized retail and wholesale price for maximum profit and competitiveness. Return in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedRetail: { type: Type.NUMBER },
          suggestedWholesale: { type: Type.NUMBER },
          reasoning: { type: Type.STRING }
        },
        required: ["suggestedRetail", "suggestedWholesale", "reasoning"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateSocialMediaCopy = async (product: any, platform: 'Facebook' | 'TikTok' | 'WhatsApp') => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a high-converting ${platform} ad caption for: ${product.name}. Price: ${product.retail_price}. Include emojis and hashtags.`,
  });
  return response.text;
};
