import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useTableInput } from "../../TableInput/TableInputContext";
import { useOccupied } from "../OccupiedContext";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import { useVagas } from "../../../context/TableValues/VagasContext";

interface BtnSendNewSpaceProps extends ButtonProps {
  onClose: () => void; // Adicionando a prop onClose
}

export function BtnSendNewSpace(
  props: React.PropsWithChildren<BtnSendNewSpaceProps>
) {
  const { name, plate, durationHours, durationMinutes } = useTableInput();
  const { occupied } = useOccupied();
  const { refreshVagas } = useVagas();

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
  );

  React.useEffect(() => {
    if (data) {
      console.log("Resposta do servidor:", data);
      props.onClose(); // Fechar o Drawer quando a resposta é recebida
      setTimeout(() => {
        refreshVagas();
      }, 1000); // Espera 1 segundo antes de atualizar as vagas
    }
    if (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  }, [data, error, refreshVagas, props]); // Adicionando props para evitar dependências incompletas

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
    props.onClick?.(event); // Garantindo que props.onClick exista antes de chamá-lo
  };

  return (
    <Button {...props} onClick={handleButtonClick} isLoading={isLoading}>
      {props.children}
    </Button>
  );
}
