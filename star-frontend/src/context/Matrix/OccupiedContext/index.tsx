// OccupiedContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IOccupiedContext {
  occupied: string[];
  setOccupied: React.Dispatch<React.SetStateAction<string[]>>;
  handleLastOccupiedClick: () => void;
}

export const OccupiedContext = createContext<IOccupiedContext>({
  occupied: [],
  setOccupied: () => {},
  handleLastOccupiedClick: () => {},
});

export const useOccupied = () => useContext(OccupiedContext);

interface OccupiedProviderProps {
  children: ReactNode;
}

export const OccupiedProvider: React.FC<OccupiedProviderProps> = ({ children }) => {
  const [occupied, setOccupied] = useState<string[]>([]);

  const handleLastOccupiedClick = () => {
    if (occupied.length > 0) {
      console.log("Último ocupado:", occupied[occupied.length - 1]);
    }
  };

  return (
    <OccupiedContext.Provider value={{ occupied, setOccupied, handleLastOccupiedClick }}>
      {children}
    </OccupiedContext.Provider>
  );
};
