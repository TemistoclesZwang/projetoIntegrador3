import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
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

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}
