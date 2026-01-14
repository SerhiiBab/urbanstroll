import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { UserPreferences } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const prefs: UserPreferences = req.body;

  // Используем ключ EXACTLY как на Vercel
  const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY!, // <-- имя переменной с Vercel
  });

  const prompt = `
Erstelle eine einzigartige Wanderroute in der Stadt ${prefs.city}. 
Interessen des Nutzers: ${prefs.interests.join(', ')}.
Dauer: etwa ${prefs.duration} Minuten.
Startpunkt: ${prefs.startingPoint || 'Stadtzentrum'}.

Die Route sollte logisch, sicher und interessant sein. 
Die Antwort MUSS in DEUTSCHER Sprache verfasst sein.

WICHTIG: Bitte gib die Antwort im JSON-Format aus.
JSON-Struktur:
{
  "name": "Name der Route",
  "summary": "Kurze Beschreibung des Abenteuers",
  "distance": "Ungefähre Distanz in km",
  "duration": "Ungefähre Zeit in Stunden/Minuten",
  "steps": [
    {
      "title": "Name des Ortes",
      "description": "Was man dort machen kann und warum es interessant ist",
      "estimatedTime": "Wie viel Zeit man dort verbringen sollte",
      "category": "sight | cafe | park | hidden-gem | architecture"
    }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { tools: [{ googleMaps: {} }] },
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'KI konnte keine strukturierten Daten liefern.' });
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    res.status(200).json(parsedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Generieren der Route' });
  }
}
