// OccupiedContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useGet } from '../../../hooks/api/useGet';

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

interface VagaPositions {
  [key: string]: string;
}

export const OccupiedProvider: React.FC<OccupiedProviderProps> = ({ children }) => {
  const [occupied, setOccupied] = useState<string[]>([]);
  const { data: response, error, isLoading } = useGet<VagaPositions>({
    url: 'http://localhost:3000/vagas/todas-posicoes'
  });

  useEffect(() => {
    if (response && !Array.isArray(response)) {
      const occupiedArray = Object.values(response) as string[];
      setOccupied(occupiedArray);
    }
  }, [response]);

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
