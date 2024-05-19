import { useEffect, useState, useContext, useCallback } from "react";
import { useAuth } from "../../../context/Auth/index";

interface RequestOptions {
  url: string;
}

interface UseGetResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void; // Adiciona a função refetch à interface
}

export function useGet<T>({ url }: RequestOptions): UseGetResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { accessToken } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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
  }, [url, accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [url, accessToken, fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}
