import React from "react";
import { Button } from "@chakra-ui/react";
import { useTableInput } from "../../TableInput/TableInputContext";
import { useOccupied } from "../OccupiedContext";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import { useAuth } from "../../Auth";

export function BtnSendNewSpace(
  props: React.PropsWithChildren<React.ComponentProps<typeof Button>>
) {
  const { name, plate, durationHours, durationMinutes } = useTableInput();
  const { occupied } = useOccupied();
  const { data, error, isLoading, sendRequest } = useEndpoint<
    { status: string },
    {
      nome: string;
      placa: string;
      duracao: number;
      vaga: string;
      pagamento: string;
    }
  >(
    {
      url: "http://localhost:3000/vagas/criar",
      method: "POST",
      body: {
        placa: plate,
        nome: name,
        duracao: durationHours * 60 + durationMinutes,
        vaga: occupied.length > 0 ? occupied[occupied.length - 1] : "",
        pagamento: "pendente",
      },
    },
    false
  ); // Controle manual do disparo

  React.useEffect(() => {
    if (data) {
      console.log("Resposta do servidor:", data);
    }
    if (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  }, [data, error]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Validar dados antes de enviar
    if (
      plate &&
      name &&
      durationHours != null &&
      durationMinutes != null &&
      (occupied.length > 0 || typeof occupied[occupied.length - 1] === "string")
    ) {
      sendRequest();
    } else {
      console.error("Dados incompletos ou inválidos para enviar a requisição.");
    }
    props.onClick?.(event);
  };

  return (
    <Button {...props} onClick={handleButtonClick} isLoading={isLoading}>
      {props.children}
    </Button>
  );
}
