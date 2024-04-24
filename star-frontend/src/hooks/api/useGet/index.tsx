import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../../context/Auth/index";

interface RequestOptions {
  url: string;
}

interface UseGetResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useGet<T>({ url }: RequestOptions): UseGetResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Utilizando useAuth para acessar o token
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Inclui o token Bearer no cabeçalho
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) { // Garante que o token esteja disponível antes de fazer a requisição
      fetchData();
    }
  }, [url, accessToken]); // Dependência adicionada para refazer a requisição se o token mudar

  return { data, error, isLoading };
}
