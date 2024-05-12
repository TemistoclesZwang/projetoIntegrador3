import React, { createContext, useContext, useState, useEffect } from "react";
import { useGet } from "../../../hooks/api/useGet";

// Definição do tipo Vaga
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
  setSearchResults: (results: Vaga[] | null) => void; // Permitir null como argumento
  originalRecords: Vaga[] | null;
}


// Criando o contexto
export const VagasContext = createContext<VagasContextType>({
    records: [],
    isLoading: false,
    error: null,
    setSearchResults: () => {}, // Implementação dummy
    originalRecords:[]
  });

export const useVagas = () => useContext(VagasContext);
export const VagasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: originalRecords, error, isLoading } = useGet<Vaga[]>({
    url: "http://localhost:3000/vagas",
  });
  const [allRecords, setAllRecords] = useState<Vaga[]>([]);

  useEffect(() => {
    setAllRecords(originalRecords ?? []);
  }, [originalRecords]);

  const setSearchResults = (results: Vaga[] | null) => {
    if (results === null) {
      // Reset para mostrar todos os registros se a busca for limpa
      setAllRecords(originalRecords ?? []);
    } else {
      // Atualiza para mostrar resultados da busca
      setAllRecords(results);
    }
  };

  return (
    <VagasContext.Provider value={{ records: allRecords, isLoading, error, setSearchResults, originalRecords }}>
    {children}
  </VagasContext.Provider>
  );
};
