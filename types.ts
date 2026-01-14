
export interface Location {
  lat: number;
  lng: number;
}

export interface RouteStep {
  title: string;
  description: string;
  estimatedTime: string;
  mapsUrl?: string;
  category: 'sight' | 'cafe' | 'park' | 'hidden-gem' | 'architecture';
}

export interface WalkingRoute {
  name: string;
  summary: string;
  distance: string;
  duration: string;
  steps: RouteStep[];
  sources: { title: string; uri: string }[];
}

export interface UserPreferences {
  city: string;
  interests: string[];
  duration: number; // in minutes
  startingPoint?: string;
}
