import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Baby, BrainCircuit, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

const initialFlashcards = [
  { id: 1, term: 'EVM', definition: 'Electronic Voting Machine', technicalDesc: 'EVMs use secure microcontrollers to log votes without network connectivity. It consists of a Control Unit and a Ballot Unit.', eli10Desc: 'A big calculator that safely counts every single vote without making mistakes.' },
  { id: 2, term: 'VVPAT', definition: 'Voter Verifiable Paper Audit Trail', technicalDesc: 'An independent printer system attached to EVMs that allows voters to verify their vote via a paper slip visible for 7 seconds.', eli10Desc: 'A special printer that prints a little receipt to prove you voted for the right person.' },
  { id: 3, term: 'NOTA', definition: 'None of the Above', technicalDesc: 'Introduced by the Supreme Court in 2013, it registers a vote of rejection for all candidates. It does not lead to a re-election.', eli10Desc: 'A button you press when you think all the choices are bad.' },
  { id: 4, term: 'MCC', definition: 'Model Code of Conduct', technicalDesc: 'A set of guidelines issued by the Election Commission to regulate political parties & candidates prior to elections to ensure fairness.', eli10Desc: 'The strict rules that politicians must follow so they don\'t cheat during the game.' },
  { id: 5, term: 'ECI', definition: 'Election Commission of India', technicalDesc: 'Article 324 of the Constitution vests the superintendence, direction and control of elections in the autonomous ECI.', eli10Desc: 'The super-referees who make sure the whole election is played fairly.' },
];

export default function Flashcard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [eli10Mode, setEli10Mode] = useState(false);

  const activeCard = initialFlashcards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % initialFlashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + initialFlashcards.length) % initialFlashcards.length);
    }, 150);
  };

  return (
    <div className="glass-panel p-6 sm:p-10 flex flex-col items-center min-h-[450px]">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm shadow-lg shadow-emerald-600/30">
            <Layers size={16} />
          </span>
          Election Flashcards
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-white/10">
            {currentIndex + 1} / {initialFlashcards.length}
          </span>
          <button 
            onClick={() => setEli10Mode(!eli10Mode)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-2 ${
              eli10Mode 
                ? 'bg-amber-400 text-slate-900 border-amber-400 font-bold shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                : 'bg-transparent text-slate-400 border-slate-600 hover:text-white'
            }`}
          >
            {eli10Mode ? <><Baby size={14} /> ELI10 Mode ON</> : <><BrainCircuit size={14} /> Technical Mode</>}
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-md h-64 mt-4 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full cursor-pointer preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center hover:border-emerald-500/50 transition-colors">
              <h3 className="text-5xl font-black text-white tracking-wider mb-6">{activeCard.term}</h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm uppercase tracking-widest font-semibold bg-emerald-400/10 px-4 py-2 rounded-full">
                <RotateCw size={14} /> Tap to flip
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-800 border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center p-8 text-center rotate-y-180">
              <h4 className="text-xl font-bold text-emerald-400 mb-4">{activeCard.definition}</h4>
              <p className="text-slate-200 text-base leading-relaxed border-t border-white/10 pt-4">
                {eli10Mode ? activeCard.eli10Desc : activeCard.technicalDesc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 w-full max-w-md flex justify-between items-center">
        <button 
          onClick={prevCard}
          className="btn-secondary flex items-center gap-2 hover:bg-slate-700 hover:text-white"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="flex gap-2">
          {initialFlashcards.map((_, idx) => (
            <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-emerald-400' : 'bg-slate-700'}`} />
          ))}
        </div>
        <button 
          onClick={nextCard}
          className="btn-secondary flex items-center gap-2 hover:bg-slate-700 hover:text-white"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
