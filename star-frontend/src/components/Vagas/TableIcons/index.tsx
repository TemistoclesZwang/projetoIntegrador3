import { IconButton } from "@chakra-ui/react";
import { TimeIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { PaymentDialog } from "../../Vagas/PaymentDialog";
import { UpdateVagaDuration } from "../UpdateVagaDuration";
import { useState } from "react";
import { CustomToast } from "../CustomToast";
import { Vaga } from "../../../services/Interfaces/Vaga";


interface TableIconsProps {
  iconName: "time" | "add" | "check" | "info";
  vagaId?: number;
  duracao?: number; // Valor da duração da vaga
  onUpdate?: (updatedVaga: Vaga) => void;
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
}: TableIconsProps) {
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

      <CustomToast
        title="Sucesso"
        description={getDescription(iconName)}
        status="success"
        trigger={showToast}
      />

      {iconName === "add" && vagaId && (
        <UpdateVagaDuration
          vagaId={vagaId}
          triggerUpdate={triggerUpdate}
          initialDuration={duracao}
          onSuccess={() => {
            console.log("Duração da vaga atualizada com sucesso!");
            setTriggerUpdate(false);

            if (onUpdate) {
              onUpdate({
                vagaId,
                duracao: duracao ?? 0,
                status: "",
                placa: "",
                nome: "",
                pagamento: "",
                entrada: "",
                saida: "",
                valor: "",
                vaga: "",  // Propriedade vaga está sendo preenchida corretamente
                incidente: false,
              });
            }
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
