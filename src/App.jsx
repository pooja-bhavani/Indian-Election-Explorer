import React, { useState, useEffect } from 'react';
import TimelineSlider from './components/TimelineSlider';
import Flashcard from './components/Flashcard';
import QuizComponent from './components/QuizComponent';
import SimulationMode from './components/SimulationMode';
import FloatingChat from './components/FloatingChat';
import { AIProvider, useAIContext } from './contexts/AIContext';
import { Clock, Layers, Target, Gamepad2 } from 'lucide-react';

function AppContent() {
  const [currentStage, setCurrentStage] = useState(1);
  const [activeTab, setActiveTab] = useState('timeline');
  const { setCurrentContext } = useAIContext();

  // Update AI context when tab changes
  useEffect(() => {
    setCurrentContext(activeTab);
  }, [activeTab, setCurrentContext]);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8 max-w-5xl mx-auto gap-8 relative pb-24">
      <header className="text-center pb-6 border-b border-white/10 mt-4">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 via-white to-emerald-400 bg-clip-text text-transparent mb-4 tracking-tight">
          INDIAN ELECTION EXPLORER
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          An interactive, intelligent guide to understanding the world's largest democratic exercise.
        </p>
      </header>

      <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
        {[
          { id: 'timeline', label: 'Timeline', icon: <Clock size={20} /> },
          { id: 'flashcards', label: 'Flashcards', icon: <Layers size={20} /> },
          { id: 'quiz', label: 'Quiz', icon: <Target size={20} /> },
          { id: 'simulation', label: 'Simulation', icon: <Gamepad2 size={20} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105' 
                : 'bg-slate-800/50 text-slate-400 border border-white/10 hover:bg-slate-700/50 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <main className="w-full relative">
        {activeTab === 'timeline' && <TimelineSlider currentStage={currentStage} setCurrentStage={setCurrentStage} />}
        {activeTab === 'flashcards' && <Flashcard />}
        {activeTab === 'quiz' && <QuizComponent />}
        {activeTab === 'simulation' && <SimulationMode />}
      </main>

      <FloatingChat />
    </div>
  );
}

function App() {
  return (
    <AIProvider>
      <AppContent />
    </AIProvider>
  );
}

export default App;
