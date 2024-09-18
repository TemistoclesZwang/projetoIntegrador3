import React from "react";
import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { useTableInput } from "../../TableInput/TableInputContext";
import { useOccupied } from "../OccupiedContext";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { CustomToast } from "../../../components/Vagas/CustomToast";
import { AddIcon } from "@chakra-ui/icons";

interface BtnSendNewSpaceProps extends ButtonProps {
  onClose: () => void; // Adicionando a prop onClose
}

export function BtnSendNewSpace(
  props: React.PropsWithChildren<BtnSendNewSpaceProps>
) {
  const { name, plate, durationHours, durationMinutes } = useTableInput();
  const { occupied } = useOccupied();
  const { refreshVagas } = useVagas();
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);

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
      setShowSuccessToast(true); // Ativa o toast de sucesso
      props.onClose(); // Fecha o modal
      setTimeout(() => {
        refreshVagas();
      }, 1000);
    }
    if (error) {
      setShowErrorToast(true); // Ativa o toast de erro
    }
  }, [data, error, refreshVagas, props]);
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
    <>
      <Button {...props} onClick={handleButtonClick} isLoading={isLoading}>
        <>
          <AddIcon />
          <Box display={{ base: "none", md: "block" }}>Criar vaga</Box>
        </>
      </Button>

      {/* Toasts para sucesso e erro */}
      <CustomToast
        title="Sucesso"
        description="Vaga criada com sucesso!"
        status="success"
        trigger={showSuccessToast}
      />
      <CustomToast
        title="Erro"
        description="Erro ao criar a vaga."
        status="error"
        trigger={showErrorToast}
      />
    </>
  );
}
