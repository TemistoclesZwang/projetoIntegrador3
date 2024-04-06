// useIconClick.ts
import { useCallback, useState } from 'react';
import { useEndpoint } from '../api/useEndpoint';

type IconType = 'email' | 'add' | 'check' | 'info';

export function useIconClick(iconName: IconType, vagaId?: number, onUpdate?: (updatedVaga: any) => void) {
  const [isProcessing, setIsProcessing] = useState(false);

  async function updatedThisFields(response: Response, vagaId: number, camposMapeamento: Record<string, string>) {
    if (response && response.ok) {
      const data = await response.json();
      const dadosAtualizados: Record<string, any> = { vagaId };
  
      // Itera sobre o mapeamento de campos para construir o objeto com os dados atualizados
      Object.keys(camposMapeamento).forEach(chaveOriginal => {
        const novaChave = camposMapeamento[chaveOriginal];
        dadosAtualizados[novaChave] = data[chaveOriginal];
      });
  
      // Chama o callback onUpdate com os dados atualizados
      onUpdate?.(dadosAtualizados);
    } else {
      throw new Error('Falha ao processar ação');
    }
  }

  const handleAction = useCallback(async () => {
    setIsProcessing(true);
    try {
      let response;
      switch (iconName) {
        case 'email':
          // Chamar endpoint específico para email
          console.log('Chamada API para email', vagaId);
          // Simulação de chamada API
          response = await fetch(`http://localhost:3000/vagas/previa-valor/${vagaId}`, { method: "GET" });
          // if (response && response.ok) {
            const camposMapeamento = {
              tempoTotalUsandoVaga: 'duracao',
              valorPagar: 'valor',
            };
    
            // Agora você chama updatedThisFields com a resposta, vagaId, e o mapeamento dos campos
            await updatedThisFields(response, vagaId || 0, camposMapeamento);
          
          break;
        case 'add':
          // Chamar endpoint específico para add
          console.log('Chamada API para add', vagaId);
          // Simulação de chamada API
          response = await fetch(`http://localhost:3000/vagas/${vagaId}/add`, { method: "POST" });
          break;
        case 'check':
          console.log('Chamada API para check', vagaId);
          await fetch(`http://localhost:3000/vagas/${vagaId}`, { method: "POST" }); //atualiza vaga
          response = await fetch(`http://localhost:3000/vagas/${vagaId}`); // pega a vaga atualizada
          break;
        case 'info':
          // Chamar endpoint específico para info
          console.log('Chamada API para info', vagaId);
          // Simulação de chamada API
          response = await fetch(`http://localhost:3000/vagas/${vagaId}/info`, { method: "POST" });
          break;
        default:
          console.log('Ação desconhecida');
      }
      if (response && response.ok) {
        const updatedVaga = await response.json();
        onUpdate?.(updatedVaga);//envia resposta para aparecer na interface
      } else {
        throw new Error('Falha ao processar ação');
      }
    } catch (error) {
      console.error('Erro ao processar ação:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [iconName, vagaId, onUpdate]);

  // Retorna o manipulador de ação e o estado de processamento
  return { handleAction, isProcessing };
}

