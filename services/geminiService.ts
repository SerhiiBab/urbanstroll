import { UserPreferences, WalkingRoute } from "../types";

export const generateRoute = async (
  prefs: UserPreferences
): Promise<WalkingRoute> => {
  const res = await fetch("/api/generate-route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  });

  if (!res.ok) {
    throw new Error("Route generation failed");
  }

  return res.json();
};
