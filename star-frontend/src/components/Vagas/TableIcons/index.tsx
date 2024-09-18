import { IconButton, useTheme } from "@chakra-ui/react";
import { TimeIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { PaymentDialog } from "../../Vagas/PaymentDialog";
import { UpdateVagaDuration } from "../UpdateVagaDuration";
import { useState } from "react";
import { CustomToast } from "../CustomToast"; // Importa o componente de Toast

interface TableIconsProps {
  iconName: "time" | "add" | "check" | "info";
  vagaId?: number;
  duracao?: number; // Valor da duração da vaga
  onUpdate?: (updatedVaga: any) => void;
  isAutoUpdateEnabled?: boolean;
}

const iconMapping = {
  time: <TimeIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />,
};

export function TableIcons({
  iconName,
  vagaId,
  duracao,
  onUpdate,
  isAutoUpdateEnabled,
}: TableIconsProps) {
  const theme = useTheme();
  const { handleAction, isProcessing, handlePaymentDecision } = useIconClick(
    iconName,
    vagaId,
    onUpdate
  );

  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isQrCodeVisible, setQrCodeVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false); // Controla o triggerUpdate para o UpdateVagaDuration
  const [showToast, setShowToast] = useState(false); // Controla quando mostrar o toast

  const handleCloseDialog = () => {
    setPaymentDialogOpen(false);
    setQrCodeVisible(false);
  };

  const handleConfirmPayment = (method: "dinheiro" | "pix") => {
    if (method === "pix") {
      setQrCodeVisible(true);
    } else {
      handlePaymentDecision();
      setPaymentDialogOpen(false);
    }
  };

  const handleClick = async () => {
    if (iconName === "add" && vagaId) {
      console.log("ID da vaga:", vagaId);
      setTriggerUpdate(true); // Dispara a atualização quando o ícone de "add" é clicado
    } else if (iconName === "check") {
      setPaymentDialogOpen(true);
    } else {
      try {
        await handleAction(); // Executa a ação
        setShowToast(true); // Dispara o toast
      } catch (error) {
        console.error("Erro ao processar a ação:", error);
      }
    }
  };

  // Função para definir a descrição dinâmica para cada ícone
  const getDescription = (iconName: "time" | "add" | "check" | "info") => {
    switch (iconName) {
      case "time":
        return "A duração foi calculada com sucesso.";
      case "add":
        return "A duração foi atualizada com sucesso.";
      case "check":
        return "O pagamento foi confirmado com sucesso.";
      case "info":
        return "As informações da vaga foram obtidas com sucesso.";
      default:
        return "";
    }
  };

  return (
    <>
      <IconButton
        ml={1}
        isLoading={isProcessing}
        icon={iconMapping[iconName]}
        onClick={handleClick}
        variant="outline"
        backgroundColor="white"
        size="sm"
        borderColor="gray.500"
        color="gray.700"
        _hover={{
          bg: "gray.400",
          borderColor: "gray.700",
          color: "gray.700",
        }}
        _active={{
          bg: "gray.400",
          borderColor: "gray.800",
          color: "gray.800",
        }}
        aria-label={""}
      />

      {/* Exibe o Toast usando o componente CustomToast */}
      <CustomToast
        title="Sucesso"
        description={getDescription(iconName)} // Descrição dinâmica baseada no ícone
        status="success"
        trigger={showToast} // Controla quando o toast deve ser exibido
      />

      {iconName === "add" && vagaId && (
        <UpdateVagaDuration
          vagaId={vagaId}
          triggerUpdate={triggerUpdate} // Passa o triggerUpdate para disparar a atualização
          initialDuration={duracao} // Passa a duração atual
          onSuccess={() => {
            console.log("Duração da vaga atualizada com sucesso!");
            setTriggerUpdate(false); // Reseta o triggerUpdate após a atualização
            onUpdate?.(vagaId);
          }}
        />
      )}

      {iconName === "check" && (
        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmPayment}
          isQrCodeVisible={isQrCodeVisible}
        />
      )}
    </>
  );
}
