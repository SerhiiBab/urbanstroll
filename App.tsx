import React, { useState } from 'react';
import { RouteInput } from './components/RouteInput';
import { RouteDisplay } from './components/RouteDisplay';
import { About } from './components/About';
import { generateRoute } from './services/geminiService';
import { UserPreferences, WalkingRoute } from './types';

type View = 'home' | 'about' | 'route';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState<WalkingRoute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');

  const handleGenerate = async (prefs: UserPreferences) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateRoute(prefs);
      setRoute(result);
      setCurrentView('route');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Hoppla! Da ist etwas schiefgelaufen beim Erstellen der Route. Bitte versuche es mit anderen Einstellungen erneut.');
    } finally {
      setLoading(false);
    }
  };

  const goToHome = () => {
    setRoute(null);
    setError(null);
    setCurrentView('home');
  };

  const goToAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation / Header */}
      <header className="w-full py-6 px-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={goToHome}>
            <div className="gradient-bg p-2 rounded-lg text-white font-black text-xl">U</div>
            <span className="text-2xl font-black text-gray-900 tracking-tight hidden sm:inline">
              Urban<span className="text-indigo-600">Stroll</span>
            </span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={goToAbout}
              className={`text-sm font-medium transition ${currentView === 'about' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Über uns
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4">
        {currentView === 'about' ? (
          <About onBack={goToHome} />
        ) : !route ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                Entdecke die Stadt neu
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Personalisierte Spaziergänge, erstellt von KI. 
                Verrate uns deine Interessen und wir planen dein perfektes Abenteuer.
              </p>
            </div>
            
            <RouteInput onGenerate={handleGenerate} isLoading={loading} />

            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        ) : (
          <RouteDisplay route={route} onReset={goToHome} />
        )}
      </main>

      {/* Hero Background Elements */}
      {currentView !== 'route' && (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} UrbanStroll KI. Mit Liebe für Städte und Entdecker.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
