import React, { useEffect } from "react";
import { useEndpoint } from "../../../hooks/api/useEndpoint";

interface UpdateVagaDurationProps {
  vagaId: number;
  onSuccess?: () => void;
  triggerUpdate?: boolean; // Novo prop para disparar a atualização externamente
}

export function UpdateVagaDuration({
  vagaId,
  onSuccess,
  triggerUpdate = false, // por padrão não dispara até que seja solicitado
}: UpdateVagaDurationProps) {
  const { sendRequest, isLoading, error } = useEndpoint<any, { field: string; value: number }>(
    {
      url: `http://localhost:3000/vagas/atualiza-campo/${vagaId}`,
      method: "POST",
      body: { field: "duracao", value: 147 },
    },
    false
  );

  const handleUpdate = async () => {
    try {
      const response = await sendRequest();
      if (response !== undefined) {
        console.log(`Vaga ${vagaId} atualizada com sucesso!`);
        onSuccess?.();
      } else {
        console.error("Erro ao atualizar a vaga: Nenhuma resposta do servidor");
      }
    } catch (error) {
      console.error("Erro ao atualizar a vaga:", error);
    }
  };

  // Efeito para disparar a atualização quando triggerUpdate mudar para true
  useEffect(() => {
    if (triggerUpdate) {
      handleUpdate();
    }
  }, [triggerUpdate]);

  return null; // Removido o botão de texto
}
