import { useEffect, useState } from 'react';

interface RequestOptions<T> {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  body?: T;
}

interface UsePostResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useEndpoint<T, U>({ url, method, body }: RequestOptions<U>): UsePostResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
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
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, isLoading };
}
