import { useCallback, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useAutoUpdate } from "../../context/AutoUpdateContext/AutoUpdateContext";

type IconType = "email" | "add" | "check" | "info";

export function useIconClick(
  iconName: IconType,
  vagaId?: number,
  onUpdate?: (updatedVaga: any) => void
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { accessToken } = useAuth();
  const { isAutoUpdateEnabled } = useAutoUpdate();

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
    if (!vagaId) {
      console.error("vagaId está indefinido");
      return;
    }

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
            valorPagar: "valor",
          };
          await updatedThisFields(response, vagaId, camposMapeamentoEmail);
          break;
        case "add":
          response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (response && response.ok) {
            const updatedVaga = await response.json();
            onUpdate?.(updatedVaga);
          } else {
            throw new Error("Falha ao processar ação");
          }
          break;
        case "check":
          response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (response && response.ok) {
            const updatedVaga = await response.json();
            onUpdate?.(updatedVaga);
          } else {
            throw new Error("Falha ao processar ação");
          }
          break;
        case "info":
          response = await fetch(`http://localhost:3000/vagas/${vagaId}/info`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (response && response.ok) {
            const updatedVaga = await response.json();
            onUpdate?.(updatedVaga);
          } else {
            throw new Error("Falha ao processar ação");
          }
          break;
        default:
          console.log("Ação desconhecida");
      }
    } catch (error) {
      console.error('Erro ao processar ação:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [iconName, vagaId, onUpdate, accessToken, isAutoUpdateEnabled]);

  return { handleAction, isProcessing };
}
