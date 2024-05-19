import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const AutoUpdateContext = createContext({
  isAutoUpdateEnabled: false,
  toggleAutoUpdate: (checked: boolean) => {}
});

// Componente Provider
import { ReactNode } from 'react';

export const AutoUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(false);

  const toggleAutoUpdate = () => {
    setIsAutoUpdateEnabled(prev => {
      console.log("Toggling state from", prev, "to", !prev); // Adicionando log para depuração
      return !prev;
    });
  };
  

  return (
    <AutoUpdateContext.Provider value={{ isAutoUpdateEnabled, toggleAutoUpdate }}>
      {children}
    </AutoUpdateContext.Provider>
  );
};

// Hook para facilitar o uso do contexto
export const useAutoUpdate = () => {
  const context = useContext(AutoUpdateContext);
  if (context === undefined) {
    throw new Error('useAutoUpdate must be used within an AutoUpdateProvider');
  }
  return context;
};
