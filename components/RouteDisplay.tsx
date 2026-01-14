
import React from 'react';
import { WalkingRoute, RouteStep } from '../types';

interface RouteDisplayProps {
  route: WalkingRoute;
  onReset: () => void;
}

const CategoryIcon = ({ category }: { category: RouteStep['category'] }) => {
  switch (category) {
    case 'sight': return '🏛️';
    case 'cafe': return '☕';
    case 'park': return '🌳';
    case 'hidden-gem': return '💎';
    case 'architecture': return '🏢';
    default: return '📍';
  }
};

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ route, onReset }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 fade-in">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="gradient-bg p-8 text-white">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold">{route.name}</h2>
            <button 
              onClick={onReset}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
              title="Neue Suche"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
            {route.summary}
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-2 rounded-lg">📏</span>
              <span>{route.distance} km</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 p-2 rounded-lg">⏱️</span>
              <span>{route.duration}</span>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="p-8 space-y-8 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Dein Weg:
          </h3>
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-100 z-0"></div>

            <div className="space-y-12">
              {route.steps.map((step, index) => (
                <div key={index} className="relative flex gap-6 z-10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-4 border-indigo-50 shadow-md flex items-center justify-center text-xl">
                    <CategoryIcon category={step.category} />
                  </div>
                  <div className="flex-grow pt-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                          {step.estimatedTime}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                      {step.mapsUrl && (
                        <a 
                          href={step.mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Auf Karte anzeigen
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-gray-400 text-sm pb-12">
        <p>Die Route wurde von einer KI basierend auf deinen Vorlieben erstellt. Sei achtsam und genieße deinen Spaziergang!</p>
      </div>
    </div>
  );
};
