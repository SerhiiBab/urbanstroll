
import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface RouteInputProps {
  onGenerate: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const INTERESTS = [
  { id: 'history', label: 'Geschichte', icon: '🏛️' },
  { id: 'parks', label: 'Parks & Natur', icon: '🌳' },
  { id: 'cafes', label: 'Cafés & Essen', icon: '☕' },
  { id: 'architecture', label: 'Architektur', icon: '🏢' },
  { id: 'hidden-gems', label: 'Geheimtipps', icon: '💎' },
  { id: 'photo', label: 'Foto-Spots', icon: '📸' },
];

export const RouteInput: React.FC<RouteInputProps> = ({ onGenerate, isLoading }) => {
  const [city, setCity] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    onGenerate({
      city,
      startingPoint,
      duration,
      interests: selectedInterests.length > 0 ? selectedInterests : ['Allgemein'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Wo möchtest du spazieren gehen?</label>
          <input
            type="text"
            required
            placeholder="z.B. Berlin oder München"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Startpunkt (Optional)</label>
          <input
            type="text"
            placeholder="z.B. Alexanderplatz oder Hauptbahnhof"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Dauer: {duration} Minuten</label>
          <input
            type="range"
            min="30"
            max="300"
            step="15"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>30 Min.</span>
            <span>5 Std.</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Was interessiert dich?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INTERESTS.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                  selectedInterests.includes(interest.id)
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                }`}
              >
                <span className="text-2xl mb-1">{interest.icon}</span>
                <span className="text-xs font-medium">{interest.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full gradient-bg text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Route wird erstellt...
            </>
          ) : (
            'Spaziergang planen'
          )}
        </button>
      </div>
    </form>
  );
};
