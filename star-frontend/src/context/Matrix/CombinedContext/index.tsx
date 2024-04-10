import React from "react";
import { Button } from "@chakra-ui/react";
import { useTableInput } from "../../TableInput/TableInputContext";
import { useOccupied } from "../OccupiedContext";

export function CombinedContextButton(
  props: React.PropsWithChildren<React.ComponentProps<typeof Button>>
) {
  const { name, plate, durationHours, durationMinutes } = useTableInput();
  const { occupied } = useOccupied();

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Converter horas e minutos para total de minutos
    const durationInMinutes = durationHours * 60 + durationMinutes;
    const lastOccupied =
      occupied.length > 0 ? occupied[occupied.length - 1] : ""; // Pega a última vaga ocupada, se houver

    // Log para debug
    console.log(name, plate, durationInMinutes, lastOccupied);

    // Preparar o corpo da requisição
    const body = {
      nome: name,
      placa: plate,
      duracao: durationInMinutes,
      vaga: lastOccupied,
    };

    // Enviar a requisição POST
    try {
      const response = await fetch("http://localhost:3000/vagas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);
      // Tratar a resposta aqui
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }

    // Chama o onClick fornecido por props, se existir
    props.onClick?.(event);
  };

  return (
    <Button {...props} onClick={handleButtonClick}>
      {props.children} {/* Renderizando children aqui */}
    </Button>
  );
}
