import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, FileText, Megaphone, CheckSquare, BarChart, Play, Pause, Clock } from 'lucide-react';

const stages = [
  { id: 1, name: 'Registration', title: 'Voter Registration', desc: 'Citizens register to vote. The electoral roll is updated and published.', icon: <ClipboardList size={20} /> },
  { id: 2, name: 'Nomination', title: 'Candidate Nomination', desc: 'Candidates file their nomination papers, which are scrutinized for eligibility.', icon: <FileText size={20} /> },
  { id: 3, name: 'Campaigning', title: 'Election Campaigning', desc: 'Political parties and candidates campaign to win voter support. Campaigning stops 48 hours before voting day.', icon: <Megaphone size={20} /> },
  { id: 4, name: 'Voting', title: 'Voting Day', desc: 'Citizens cast their votes securely at designated polling booths.', icon: <CheckSquare size={20} /> },
  { id: 5, name: 'Results', title: 'Counting & Results', desc: 'Votes are counted under strict security, and results are officially declared.', icon: <BarChart size={20} /> }
];

export default function TimelineSlider({ currentStage, setCurrentStage }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStage((prev) => (prev % stages.length) + 1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setCurrentStage]);

  const progressPercentage = ((currentStage - 1) / (stages.length - 1)) * 100;

  return (
    <div className="glass-panel p-6 sm:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-amber-400 font-semibold transition-colors flex items-center gap-2"
        >
          {isPlaying ? <><Pause size={14} /> Pause Journey</> : <><Play size={14} /> Play Journey</>}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-12 text-white flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm shadow-lg shadow-blue-600/30">
          <Clock size={16} />
        </span>
        Election Timeline
      </h2>

      <div className="relative h-2 bg-slate-700/50 rounded-full my-8">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between">
          {stages.map((stage) => {
            const isActive = currentStage === stage.id;
            const isCompleted = currentStage > stage.id;
            
            return (
              <div 
                key={stage.id}
                onClick={() => {
                  setCurrentStage(stage.id);
                  setIsPlaying(false);
                }}
                className="relative cursor-pointer group"
              >
                <motion.div 
                  className={`w-10 h-10 -mt-5 rounded-full border-4 flex items-center justify-center text-lg z-10 relative transition-colors ${
                    isActive 
                      ? 'bg-amber-400 border-white text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.6)]' 
                      : isCompleted
                        ? 'bg-emerald-500 border-slate-800 text-white'
                        : 'bg-slate-800 border-slate-600 text-slate-400'
                  }`}
                  animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                >
                  {isCompleted && !isActive ? '✓' : stage.icon}
                </motion.div>
                
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-400' : isCompleted ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
                }`}>
                  {stage.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/50 border border-white/5 p-6 rounded-xl border-l-4 border-l-amber-400"
          >
            <h3 className="text-xl font-bold text-white mb-2">{stages[currentStage - 1].title}</h3>
            <p className="text-slate-300 leading-relaxed">{stages[currentStage - 1].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
