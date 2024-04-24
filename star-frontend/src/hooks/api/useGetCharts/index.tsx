// src/components/UseVagasData.js
import { useEffect } from 'react';
import { useAuth } from '../../../context/Auth/index';

export function useGetCharts({ getEndpoint, setEndpoint }:{getEndpoint: string, setEndpoint: any}) {
  const { accessToken } = useAuth(); // Obtém o accessToken do contexto de autenticação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getEndpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Utiliza o token no cabeçalho Authorization
          }
        });
        const data = await response.json();
        setEndpoint(data); // Atualiza o estado do componente pai com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar dados das vagas:', error);
      }
    };

    fetchData();
  }, [getEndpoint, accessToken]); // Inclui accessToken como dependência para refazer a busca se ele mudar

  return null; // Como é um componente de lógica, não precisa retornar JSX
}
