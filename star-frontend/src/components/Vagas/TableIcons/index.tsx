import { useState } from "react";
import { IconButton, useTheme } from "@chakra-ui/react";
import { TimeIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons"; // Importando os ícones
import { useIconClick } from "../../../hooks/TableIcons";
import { PaymentDialog } from "../../Vagas/PaymentDialog";

interface TableIconsProps {
  iconName: "time" | "add" | "check" | "info"; // Tipos permitidos para ícones
  vagaId?: number;
  onUpdate?: (updatedVaga: any) => void;
  isAutoUpdateEnabled?: boolean;
}

const iconMapping = {
  time: <TimeIcon />, // Mapeamento do ícone correto
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />,
};

export function TableIcons({
  iconName,
  vagaId,
  onUpdate,
  isAutoUpdateEnabled,
}: TableIconsProps) {
  const theme = useTheme();
  const { handleAction, isProcessing, handlePaymentDecision } = useIconClick(
    iconName,
    vagaId,
    onUpdate
  );

  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false); // Adicionando o estado correto para o diálogo
  const [isQrCodeVisible, setQrCodeVisible] = useState(false); // Controle para exibir o QR Code

  // Função que controla o fechamento do diálogo
  const handleCloseDialog = () => {
    setPaymentDialogOpen(false); // Fechar o diálogo de pagamento
    setQrCodeVisible(false); // Resetar o QR Code
  };

  const handleConfirmPayment = (method: "dinheiro" | "pix") => {
    if (method === "pix") {
      setQrCodeVisible(true); // Mostra o QR Code quando PIX for selecionado
    } else {
      handlePaymentDecision(); // Processa o pagamento via dinheiro
      setPaymentDialogOpen(false); // Fecha o diálogo após a confirmação do pagamento
    }
  };

  const handleClick = () => {
    if (iconName === "check") {
      // Se for o botão de check, abre o diálogo de pagamento
      setPaymentDialogOpen(true);
    } else {
      // Caso contrário, executa a ação normal do ícone
      handleAction();
    }
  };

  return (
    <>
      <IconButton
        isLoading={isProcessing} // Mostra o estado de carregamento
        isRound={true}
        variant="solid"
        bg={"black"}
        color={"white"}
        aria-label="Ação"
        fontSize="sm"
        size="sm"
        ml={1}
        icon={iconMapping[iconName]} // Ícone correto com base em `iconName`
        onClick={handleClick} // Ação com base no ícone (abre o diálogo ou executa a ação)
      />
      {iconName === "check" && (
        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          onClose={handleCloseDialog} // Função de fechamento
          onConfirm={handleConfirmPayment} // Função de confirmação do pagamento
          isQrCodeVisible={isQrCodeVisible} // Passa a visibilidade do QR Code
        />
      )}
    </>
  );
}
