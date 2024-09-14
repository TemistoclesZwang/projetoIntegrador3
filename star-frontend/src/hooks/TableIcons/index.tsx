import { useCallback, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useAutoUpdate } from "../../context/AutoUpdateContext/AutoUpdateContext";
import { Alert, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";

type IconType = "time" | "add" | "check" | "info";

export function useIconClick(
  iconName: IconType,
  vagaId?: number,
  onUpdate?: (updatedVaga: any) => void
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { accessToken } = useAuth();
  const { isAutoUpdateEnabled } = useAutoUpdate();
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"dinheiro" | "pix" | null>(null);

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

  const handlePaymentDecision = async () => {
    if (selectedPaymentMethod === "pix") {
      // Gerar QR Code
      console.log("Gerando QR Code...");
      // Lógica para gerar e exibir QR Code
    } else {
      // Fazer a requisição normal se for dinheiro
      let response = await fetch(`http://localhost:3000/vagas/${vagaId}`, {
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
    }
    setPaymentDialogOpen(false);  // Fechar o diálogo de pagamento após a escolha
    setSelectedPaymentMethod(null); // Resetar a seleção de pagamento
  };

  const handleAction = useCallback(async () => {
    if (!vagaId) {
      console.error("vagaId está indefinido");
      return;
    }

    if (iconName === "check") {
      setPaymentDialogOpen(true); // Abrir o diálogo de pagamento
      return; // Pausar a ação principal até que o pagamento seja escolhido
    }

    setIsProcessing(true);
    let response;
    try {
      switch (iconName) {
        case "time":
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

  return { handleAction, isProcessing, isPaymentDialogOpen, setSelectedPaymentMethod, handlePaymentDecision };
}
