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
    setSearchResults: (results: Vaga[]) => void; // Defina essa função para aceitar um array de Vaga
  }

// Criando o contexto
export const VagasContext = createContext<VagasContextType>({
    records: [],
    isLoading: false,
    error: null,
    setSearchResults: () => {}, // Implementação dummy
  });

export const useVagas = () => useContext(VagasContext);

export const VagasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: records,
    error,
    isLoading,
  } = useGet<Vaga[]>({
    url: "http://localhost:3000/vagas",
  });
  const [searchResults, setSearchResults] = useState<Vaga[]>([]);

  return (
    <VagasContext.Provider
      value={{
        records: searchResults.length > 0 ? searchResults : records ?? [],
        isLoading,
        error,
        setSearchResults,
      }}
    >
      {children}
    </VagasContext.Provider>
  );
};
