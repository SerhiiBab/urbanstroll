
import React from 'react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 fade-in">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-gray-900 mb-6">Über UrbanStroll KI</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Wir glauben, dass die schönsten Entdeckungen zu Fuß gemacht werden. UrbanStroll KI kombiniert 
          modernste künstliche Intelligenz mit Echtzeit-Geodaten, um dir Wege zu zeigen, die in keinem Reiseführer stehen.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
            🤖
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">KI-Personalisierung</h3>
          <p className="text-gray-600 leading-relaxed">
            Unser System nutzt das <strong>Gemini 2.5 Flash</strong> Modell, um deine Interessen zu verstehen. 
            Egal ob Architektur, Geschichte oder die besten Cafés – jede Route wird individuell für dich generiert.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
            📍
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Google Maps Integration</h3>
          <p className="text-gray-600 leading-relaxed">
            Dank Google Maps Grounding basieren unsere Vorschläge auf echten Orten. Wir liefern dir 
            direkte Links zu Google Maps, damit du dich niemals verläufst.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
            🌿
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nachhaltiges Reisen</h3>
          <p className="text-gray-600 leading-relaxed">
            Spazierengehen ist die umweltfreundlichste Art, eine Stadt zu erkunden. Wir fördern 
            lokale Vielfalt und zeigen dir auch versteckte Viertel abseits des Massentourismus.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
            ✨
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Unser Ziel</h3>
          <p className="text-gray-600 leading-relaxed">
            Wir möchten Technologie nutzen, um Menschen dazu zu inspirieren, ihre Umgebung bewusster 
            wahrzunehmen und die kleinen Details urbaner Schönheit zu entdecken.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-3xl p-10 text-center text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Bereit für dein nächstes Abenteuer?</h3>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Lass die KI für dich planen und entdecke deine Stadt heute noch aus einer völlig neuen Perspektive.
        </p>
        <button 
          onClick={onBack}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition transform hover:scale-105"
        >
          Jetzt Route planen
        </button>
      </div>
    </div>
  );
};
