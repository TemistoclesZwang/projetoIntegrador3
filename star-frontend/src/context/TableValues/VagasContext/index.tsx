import React, { createContext, useContext, useState, useEffect } from "react";
import { useGet } from "../../../hooks/api/useGet";

export interface Vaga {
  vagaId: number;
  status: string;
  placa: string;
  nome: string;
  pagamento: string;
  duracao: number;
  entrada: string;
  saida: string;
  valor: string;
  vaga: string;
}

interface VagasContextType {
  records: Vaga[];
  isLoading: boolean;
  error: Error | null;
  setSearchResults: (results: Vaga[] | null) => void;
  originalRecords: Vaga[] | null;
  refreshRecords: () => void;  // Alterar o nome para refreshRecords para consistência
}

export const VagasContext = createContext<VagasContextType>({
  records: [],
  isLoading: false,
  error: null,
  setSearchResults: () => {},
  originalRecords: [],
  refreshRecords: () => {},  // Alterar o nome para refreshRecords para consistência
});

export const useVagas = () => useContext(VagasContext);

export const VagasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: originalRecords, error, isLoading, refetch } = useGet<Vaga[]>({
    url: "http://localhost:3000/vagas",
  });
  const [allRecords, setAllRecords] = useState<Vaga[]>([]);

  useEffect(() => {
    setAllRecords(originalRecords ?? []);
  }, [originalRecords]);

  const setSearchResults = (results: Vaga[] | null) => {
    if (results === null) {
      setAllRecords(originalRecords ?? []);
    } else {
      setAllRecords(results);
    }
  };

  const refreshRecords = () => {
    refetch();
  };

  return (
    <VagasContext.Provider value={{ records: allRecords, isLoading, error, setSearchResults, originalRecords, refreshRecords }}>
      {children}
    </VagasContext.Provider>
  );
};
