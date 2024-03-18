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

// .exemplo de uso
function YourComponent() {
  interface Post {
    // essa interface representa a estrutura dos dados enviada pela API
    vagaId: number;
    status: string;
    placa: string;
    nome: string;
    pagamento: string;
    duracao: number;
    entrada: Date;
    saida: Date;
    valor: string;
    vaga: string;
  }

  const { data, error, isLoading } = useGet<Post>({
    url: "http://localhost:3000/vagas",
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
      <h1>{data.placa}</h1>
      <p>{data.vaga}</p>
      {/* Renderizar outros campos, se necessário */}
    </div>
  );
}

export default YourComponent;
