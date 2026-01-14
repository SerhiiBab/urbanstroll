import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY!, // ← ВАЖНО
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const prefs = req.body;

    const prompt = `
Erstelle eine einzigartige Wanderroute in der Stadt ${prefs.city}.
Interessen des Nutzers: ${prefs.interests.join(", ")}.
Dauer: etwa ${prefs.duration} Minuten.
Startpunkt: ${prefs.startingPoint || "Stadtzentrum"}.

Die Route sollte logisch, sicher und interessant sein.
Antwort NUR im JSON-Format.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI error" });
  }
}



    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources = chunks
      .filter((c) => c.maps)
      .map((c) => ({
        title: c.maps?.title || "Auf der Karte ansehen",
        uri: c.maps?.uri || "",
      }));

    const enrichedSteps = parsedData.steps.map((step: any) => {
      const matchingSource = sources.find(
        (s) =>
          s.title.toLowerCase().includes(step.title.toLowerCase()) ||
          step.title.toLowerCase().includes(s.title.toLowerCase())
      );

      return {
        ...step,
        mapsUrl: matchingSource?.uri || sources[0]?.uri,
      };
    });

    res.status(200).json({
      ...parsedData,
      steps: enrichedSteps,
      sources,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI error" });
  }
}
