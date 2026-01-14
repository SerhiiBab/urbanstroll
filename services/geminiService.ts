import { UserPreferences, WalkingRoute } from "../types";

export const generateRoute = async (prefs: UserPreferences): Promise<WalkingRoute> => {
  const res = await fetch('/api/generateRoute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Fehler beim Generieren der Route');
  }

  const data = await res.json();
  return data;
};
