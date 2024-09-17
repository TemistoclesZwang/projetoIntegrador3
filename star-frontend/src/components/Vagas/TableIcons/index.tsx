import { IconButton, useTheme } from "@chakra-ui/react";
import { TimeIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { PaymentDialog } from "../../Vagas/PaymentDialog";
import { UpdateVagaDuration } from "../UpdateVagaDuration";
import { useState } from "react";

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
  duracao, // Valor da duração da vaga
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

  const handleClick = () => {
    if (iconName === "add" && vagaId) {
      console.log("ID da vaga:", vagaId);
      setTriggerUpdate(true); // Dispara a atualização quando o ícone de "add" é clicado
    } else if (iconName === "check") {
      setPaymentDialogOpen(true);
    } else {
      handleAction();
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

      {iconName === "add" && vagaId && (
        <UpdateVagaDuration
          vagaId={vagaId}
          triggerUpdate={triggerUpdate} // Passa o triggerUpdate para disparar a atualização
          initialDuration={duracao} // Passa a duração atual da vaga
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
