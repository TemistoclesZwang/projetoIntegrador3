import { useEffect, useState } from 'react';

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
  }, [url]);

  return { data, error, isLoading };
}

// .exemplo de uso
function YourComponent() {
    interface Post {
        // essa interface representa a estrutura dos dados enviada pela API
        userId: number;
        id: number;
        title: string;
        body: string;
      }

    const { data, error, isLoading } = useGet<Post>({
      url: 'https://jsonplaceholder.typicode.com/posts',
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!data) {
      return <div>No data available</div>;
    }
  
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
        {/* Renderizar outros campos, se necessário */}
      </div>
    );
  }

    export default YourComponent;