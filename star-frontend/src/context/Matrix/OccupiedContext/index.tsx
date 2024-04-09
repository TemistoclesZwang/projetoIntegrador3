// OccupiedContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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

async function fetchOccupied(): Promise<string[]> {
  const response = await fetch('http://localhost:3000/vagas/todas-posicoes');
  const data = await response.json();
  // Converter o objeto para um array de valores
  const occupiedArray = Object.values(data) as string[];
  return occupiedArray;
}

export const OccupiedProvider: React.FC<OccupiedProviderProps> = ({ children }) => {
  const [occupied, setOccupied] = useState<string[]>([]);
  useEffect(() => {
    // Função assíncrona dentro do useEffect para buscar os dados
    const initializeOccupied = async () => {
      const occupiedData = await fetchOccupied();
      setOccupied(occupiedData);
    };
    
    // Chamando a função assíncrona
    initializeOccupied();
  }, []);

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
