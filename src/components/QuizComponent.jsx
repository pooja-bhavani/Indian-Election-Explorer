import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Trophy, Medal, BookOpen, Flame } from 'lucide-react';

const quizData = [
  {
    id: 1,
    level: "Beginner",
    question: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1,
    explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years."
  },
  {
    id: 2,
    level: "Intermediate",
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
    correctAnswer: 2,
    explanation: "Under Article 324(2), the President of India appoints the Chief Election Commissioner."
  },
  {
    id: 3,
    level: "Expert",
    question: "What is the maximum limit of expenditure for a Lok Sabha constituency candidate (in major states as of 2024)?",
    options: ["₹40 Lakhs", "₹70 Lakhs", "₹95 Lakhs", "No Limit"],
    correctAnswer: 2,
    explanation: "The ECI revised the election expenditure limit for candidates to ₹95 Lakhs for Lok Sabha constituencies in larger states."
  }
];

export default function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);

  const question = quizData[currentQuestion];

  useEffect(() => {
    if (showScore || selectedOption !== null) return;
    
    if (timeLeft === 0) {
      handleOptionClick(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showScore, selectedOption]);

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    if (index === question.correctAnswer) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setTimeLeft(15);
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 3000); // 3 seconds to read explanation
  };

  const getBadge = () => {
    if (score === quizData.length) return { title: "Election Expert", icon: <Trophy size={32} />, color: "from-amber-400 to-amber-600" };
    if (score > 0) return { title: "First-Time Voter", icon: <Medal size={32} />, color: "from-emerald-400 to-emerald-600" };
    return { title: "Needs Practice", icon: <BookOpen size={32} />, color: "from-slate-400 to-slate-600" };
  };

  if (showScore) {
    const badge = getBadge();
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-black text-white mb-6">Quiz Completed!</h2>
        
        <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${badge.color} p-1 mb-6 shadow-xl`}>
          <div className="w-full h-full bg-slate-900 rounded-full flex flex-col items-center justify-center gap-2">
            <span className="text-white">{badge.icon}</span>
            <span className="text-4xl font-bold text-white">{score}/{quizData.length}</span>
          </div>
        </div>

        <h3 className={`text-2xl font-bold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent mb-8 flex items-center justify-center gap-2`}>
          {badge.title}
        </h3>

        <button 
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setStreak(0);
            setShowScore(false);
            setTimeLeft(15);
          }}
          className="btn-primary"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-10">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm shadow-lg shadow-indigo-600/30">
              <Target size={16} />
            </span>
            Challenge Mode
          </h2>
          <div className="mt-2 flex gap-3">
            <span className="text-xs font-semibold px-2 py-1 bg-slate-800 rounded text-amber-400 border border-white/5">
              Level: {question.level}
            </span>
            {streak > 1 && (
              <motion.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-xs font-semibold px-2 py-1 bg-rose-500/20 text-rose-400 rounded border border-rose-500/30 flex items-center gap-1"
              >
                <Flame size={12} /> {streak} Streak!
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
            <motion.circle 
              cx="32" cy="32" r="28" 
              stroke={timeLeft > 5 ? "#10b981" : "#ef4444"} 
              strokeWidth="4" fill="none" 
              strokeDasharray="175"
              animate={{ strokeDashoffset: 175 - (175 * timeLeft) / 15 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <span className={`absolute text-lg font-bold ${timeLeft > 5 ? 'text-white' : 'text-red-400 animate-pulse'}`}>
            {timeLeft}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-slate-200 mb-8 leading-relaxed min-h-[4rem]">
        {question.question}
      </h3>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          let stateClass = "bg-slate-800/50 border-white/10 hover:border-amber-400 hover:bg-slate-800 text-slate-300";
          if (selectedOption !== null) {
            if (index === question.correctAnswer) {
              stateClass = "bg-emerald-900/40 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]";
            } else if (index === selectedOption) {
              stateClass = "bg-red-900/40 border-red-500 text-red-300";
            } else {
              stateClass = "bg-slate-900 border-white/5 text-slate-600 opacity-50";
            }
          }

          return (
            <button 
              key={index} 
              className={`p-4 rounded-xl border text-left transition-all duration-300 ${stateClass}`}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-black/30 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg text-sm border ${
              selectedOption === question.correctAnswer 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}
          >
            <strong className="block mb-1">{selectedOption === question.correctAnswer ? 'Correct!' : 'Incorrect.'}</strong>
            {question.explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
