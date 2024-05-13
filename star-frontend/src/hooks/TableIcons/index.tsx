import { useCallback, useState, useContext } from "react";
import { useAuth } from "../../context/Auth";
import { useAutoUpdate } from "../../context/AutoUpdateContext/AutoUpdateContext"; // Importando o contexto

type IconType = "email" | "add" | "check" | "info";

export function useIconClick(
  iconName: IconType,
  vagaId?: number,
  onUpdate?: (updatedVaga: any) => void
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { accessToken } = useAuth();
  const { isAutoUpdateEnabled } = useAutoUpdate(); // Usando o estado do contexto

  async function updatedThisFields(
    response: Response,
    vagaId: number,
    camposMapeamento: Record<string, string>
  ) {
    if (response && response.ok) {
      const data = await response.json();
      const dadosAtualizados: Record<string, any> = { vagaId };

      Object.keys(camposMapeamento).forEach((chaveOriginal) => {
        dadosAtualizados[camposMapeamento[chaveOriginal]] = data[chaveOriginal];
      });

      onUpdate?.(dadosAtualizados);
    } else {
      throw new Error("Falha ao processar ação");
    }
  }

  const handleAction = useCallback(async () => {
  
    
    // if (!isAutoUpdateEnabled) return; // Verifica se a atualização automática está habilitada antes de prosseguir

    setIsProcessing(true);
    let response;
    try {
      switch (iconName) {
        case "email":
          response = await fetch(
            `http://localhost:3000/vagas/previa-valor/${vagaId}`,
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
              
            }
          );
          const camposMapeamentoEmail = {
            tempoTotalUsandoVaga: "duracao",
            valorPagar: "valor", //! aqui é passada as informações do backend para o frontend
          };
          await updatedThisFields(response, vagaId || 0, camposMapeamentoEmail);
          break;
        case "add":
          console.log("Chamada API para add", vagaId);
          response = await fetch(`http://localhost:3000/vagas/${vagaId}/add`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          break;
        case "check":
          console.log("Chamada API para check", vagaId);
          response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          break;
        case "info":
          console.log("Chamada API para info", vagaId);
          response = await fetch(`http://localhost:3000/vagas/${vagaId}/info`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          break;
        default:
          console.log("Ação desconhecida");
      }

      if (response && response.ok) {
        const updatedVaga = await response.json();
        onUpdate?.(updatedVaga);
      } else {
        throw new Error("Falha ao processar ação");
      }
    } catch (error) {
      console.error('Erro ao processar ação:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [iconName, vagaId, onUpdate, accessToken, isAutoUpdateEnabled]); // Adicionando isAutoUpdateEnabled às dependências do useCallback

  return { handleAction, isProcessing };
}
