import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Megaphone, Smartphone, Home, Gift, Rocket, PartyPopper, TrendingDown, ChevronRight } from 'lucide-react';

const strategies = [
  { id: 'rallies', name: 'Mega Rallies', cost: 30, impact: 'High visibility, low conversion', icon: <Megaphone size={24} /> },
  { id: 'social', name: 'Social Media Ads', cost: 20, impact: 'High youth reach, medium trust', icon: <Smartphone size={24} /> },
  { id: 'door', name: 'Door-to-Door', cost: 40, impact: 'Low reach, high conversion', icon: <Home size={24} /> },
  { id: 'manifesto', name: 'Freebies Promise', cost: 50, impact: 'Mass appeal, high scrutiny', icon: <Gift size={24} /> }
];

export default function SimulationMode() {
  const [budget, setBudget] = useState(100);
  const [selectedStrats, setSelectedStrats] = useState([]);
  const [result, setResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleStrat = (strat) => {
    if (selectedStrats.find(s => s.id === strat.id)) {
      setSelectedStrats(selectedStrats.filter(s => s.id !== strat.id));
      setBudget(b => b + strat.cost);
    } else {
      if (budget >= strat.cost) {
        setSelectedStrats([...selectedStrats, strat]);
        setBudget(b => b - strat.cost);
      }
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      let winChance = 0;
      let feedback = [];
      
      const hasRallies = selectedStrats.find(s => s.id === 'rallies');
      const hasSocial = selectedStrats.find(s => s.id === 'social');
      const hasDoor = selectedStrats.find(s => s.id === 'door');
      const hasFreebies = selectedStrats.find(s => s.id === 'manifesto');

      if (hasDoor && hasSocial) {
        winChance += 70;
        feedback.push("Excellent mix! Door-to-door built trust, while social media mobilized the youth.");
      } else if (hasRallies && hasFreebies) {
        winChance += 50;
        feedback.push("High visibility, but ECI closely scrutinized your freebies. A bit risky, but somewhat effective.");
      } else if (selectedStrats.length === 0) {
        winChance = 5;
        feedback.push("You didn't campaign at all! Hard to win without reaching voters.");
      } else {
        winChance += selectedStrats.length * 20;
        feedback.push("A decent campaign, but your strategy lacked a cohesive mix of grassroots and mass reach.");
      }

      if (hasRallies && hasDoor) {
        winChance += 10;
        feedback.push("Good combination of mass appeal and personal connection.");
      }

      // Add a bit of randomness (-5 to +15)
      const finalScore = Math.min(100, Math.max(0, winChance + (Math.random() * 20 - 5)));
      
      setResult({
        won: finalScore > 50,
        score: finalScore.toFixed(1),
        feedback
      });
      setIsSimulating(false);
    }, 2000);
  };

  const reset = () => {
    setBudget(100);
    setSelectedStrats([]);
    setResult(null);
  };

  return (
    <div className="glass-panel p-6 sm:p-10 min-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-sm shadow-lg shadow-rose-600/30">
            <Gamepad2 size={16} />
          </span>
          Election Simulator
        </h2>
        <div className="bg-slate-900 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="text-slate-400 text-sm font-semibold">Budget:</span>
          <span className={`text-lg font-bold ${budget < 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
            ₹{budget}Cr
          </span>
        </div>
      </div>

      {!result && !isSimulating && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
          <p className="text-slate-300 mb-6">
            You are running for a Lok Sabha seat. Select your campaign strategies wisely. You have a limited budget of ₹100Cr.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {strategies.map(strat => {
              const isSelected = selectedStrats.find(s => s.id === strat.id);
              const canAfford = budget >= strat.cost;

              return (
                <div 
                  key={strat.id}
                  onClick={() => (canAfford || isSelected) && toggleStrat(strat)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                      : canAfford
                        ? 'bg-slate-800/50 border-white/10 hover:border-white/30'
                        : 'bg-slate-900/50 border-white/5 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{strat.icon}</span>
                      <h4 className={`font-semibold ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>{strat.name}</h4>
                    </div>
                    <span className="text-xs font-bold bg-slate-900 px-2 py-1 rounded text-amber-400 border border-white/5">
                      -₹{strat.cost}Cr
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{strat.impact}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex justify-end">
            <button 
              onClick={runSimulation}
              disabled={selectedStrats.length === 0}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Run Election <Rocket size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {isSimulating && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-semibold text-amber-400 animate-pulse">Counting Votes...</h3>
          <p className="text-slate-400 text-sm mt-2">Checking EVMs and VVPAT slips</p>
        </div>
      )}

      <AnimatePresence>
        {result && !isSimulating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-8"
          >
            <div className="text-6xl mb-4 flex justify-center">
              {result.won ? <PartyPopper size={64} className="text-emerald-400" /> : <TrendingDown size={64} className="text-rose-400" />}
            </div>
            <h3 className={`text-3xl font-black mb-2 ${result.won ? 'text-emerald-400' : 'text-rose-400'}`}>
              {result.won ? 'You Won the Election!' : 'You Lost.'}
            </h3>
            <p className="text-slate-300 mb-6 text-lg">
              Voter Support: <strong className="text-white">{result.score}%</strong>
            </p>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 max-w-md w-full mb-8">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Political Analyst Feedback</h4>
              <ul className="text-slate-300 text-sm text-left space-y-2">
                {result.feedback.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500 mt-1"><ChevronRight size={14} /></span> 
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={reset} className="btn-secondary">
              Run Next Term
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
