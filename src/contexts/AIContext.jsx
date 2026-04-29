import React, { createContext, useContext, useState } from 'react';

const AIContext = createContext();

export function AIProvider({ children }) {
  const [currentContext, setCurrentContext] = useState('home');

  return (
    <AIContext.Provider value={{ currentContext, setCurrentContext }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  return useContext(AIContext);
}
