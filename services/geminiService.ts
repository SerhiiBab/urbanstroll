// services/geminiService.ts
import { UserPreferences, WalkingRoute } from '../types';

export async function generateRoute(prefs: UserPreferences): Promise<WalkingRoute> {
  const res = await fetch('/api/generate-route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prefs),
  });

  if (!res.ok) throw new Error('AI error');

  return res.json();
}
