// api/generate-route.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const prefs = req.body;

    const prompt = `
Erstelle eine einzigartige Wanderroute in der Stadt ${prefs.city}.
Interessen des Nutzers: ${prefs.interests.join(', ')}.
Dauer: etwa ${prefs.duration} Minuten.
Startpunkt: ${prefs.startingPoint || 'Stadtzentrum'}.

Die Route sollte logisch, sicher und interessant sein.
Antwort NUR im JSON-Format.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) return res.status(500).json({ error: 'Invalid AI response' });

    res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI error' });
  }
}
