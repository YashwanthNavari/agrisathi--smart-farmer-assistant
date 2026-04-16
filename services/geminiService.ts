/**
 * AgriSathi AI Advisory Service
 * Powered by Google Gemini AI for intelligent agricultural assistance
 */

const GEMINI_API_KEY = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
                       (typeof process !== 'undefined' && process.env?.API_KEY) || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// --- System Personas ---

const EXPERT_SYSTEM_INSTRUCTION = `
You are AgriSathi, a friendly and knowledgeable agricultural expert assistant for Indian farmers.
Your goal is to help farmers with:
1. Crop advice (sowing, harvesting, fertilizers, irrigation).
2. Pest and disease identification and remedies (organic and chemical).
3. Weather-based farming decisions.
4. Government schemes and subsidy programs.
5. Market price trends and mandi rates.

Keep answers concise, practical, and easy to understand.
Use bullet points where possible.
Prefer giving region-specific advice for Indian climates.
If asked about non-agricultural topics, politely redirect to farming.
`.trim();

// --- Core fetch wrapper ---

async function callGeminiAPI(requestBody: object): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'API key not configured. Please set GEMINI_API_KEY in your environment.';
  }
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API Error: ${res.status}`);
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

// --- Public API ---

/**
 * Get expert agricultural advice for a farmer's query.
 */
export async function getExpertAdvice(message: string, history: string[] = []): Promise<string> {
  try {
    const contextHistory =
      history.length > 0
        ? `\nConversation History:\n${history.slice(-6).join('\n')}\n\n`
        : '';
    const requestBody = {
      system_instruction: { parts: [{ text: EXPERT_SYSTEM_INSTRUCTION }] },
      contents: [
        {
          role: 'user',
          parts: [{ text: `${contextHistory}Farmer's Question: ${message}` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };
    return await callGeminiAPI(requestBody);
  } catch (error) {
    console.error('AgriSathi Chat Error:', error);
    throw new Error('Failed to get advice. Please try again.');
  }
}

/**
 * Analyze a plant image for disease or pest identification.
 */
export async function analyzePlantDisease(base64Image: string): Promise<string> {
  try {
    const base64Data = base64Image.includes(',')
      ? base64Image.split(',')[1]
      : base64Image;
    const mimeType = base64Image.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';

    const requestBody = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data,
              },
            },
            {
              text: `You are an expert plant pathologist. Analyze this plant image and provide:

## 🌿 Crop Identification
Identify the crop species visible in the image.

## 🔍 Disease / Pest Diagnosis
Identify any disease, pest, or nutrient deficiency. If healthy, say so.

## 📖 Why It Happens
Briefly explain the cause (pathogen type, environmental trigger, etc.).

## 🌱 Organic Treatment
Suggest 2-3 practical organic/natural remedies.

## 💊 Chemical Treatment
Suggest specific fungicide/pesticide with dosage if needed.

## ⚠️ Precautions
Key safety or application notes for the farmer.

Be concise and practical. Use simple language suitable for Indian farmers.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1200,
      },
    };
    return await callGeminiAPI(requestBody);
  } catch (error) {
    console.error('AgriSathi Vision Error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

/**
 * Generate market insights summary from product data.
 */
export async function generateMarketInsights(products: Array<Record<string, unknown>>): Promise<string> {
  try {
    const productSummary = JSON.stringify(products.slice(0, 8));
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Based on this market data: ${productSummary}
              
Give a brief 2-sentence market summary for a farmer. Highlight any notable price trends or availability.`,
            },
          ],
        },
      ],
      generationConfig: { temperature: 0.3, maxOutputTokens: 150 },
    };
    return await callGeminiAPI(requestBody);
  } catch {
    return 'Market data currently unavailable. Please check local mandi for latest rates.';
  }
}