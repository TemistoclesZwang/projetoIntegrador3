import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/Auth';

interface RequestOptions<U> {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  body?: U;
}

interface UsePostResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  sendRequest: () => void;  // Adicionado para permitir disparo manual
}

export function useEndpoint<T, U>({ url, method, body }: RequestOptions<U>, autoFetch: boolean = true): UsePostResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { accessToken } = useAuth();

  const fetchData = useCallback(async () => {
    if (!accessToken) {
      setError(new Error("No access token available."));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });


      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, accessToken]);

  const sendRequest = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Executar automaticamente se autoFetch for true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, error, isLoading, sendRequest };
}
