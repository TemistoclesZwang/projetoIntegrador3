import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IMatrixContext {
  sizeX: number | '';
  setSizeX: React.Dispatch<React.SetStateAction<number | ''>>;
  sizeY: number | '';
  setSizeY: React.Dispatch<React.SetStateAction<number | ''>>;
}

export const MatrixContext = createContext<IMatrixContext>({
  sizeX: 5,
  setSizeX: () => {},
  sizeY: 5,
  setSizeY: () => {},
});

export const useMatrix = () => useContext(MatrixContext);

interface MatrixProviderProps {
  children: ReactNode; // Adicionando a propriedade children
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [sizeX, setSizeX] = useState<number | ''>(5);
  const [sizeY, setSizeY] = useState<number | ''>(5);

  return (
    <MatrixContext.Provider value={{ sizeX, setSizeX, sizeY, setSizeY }}>
      {children}
    </MatrixContext.Provider>
  );
};
