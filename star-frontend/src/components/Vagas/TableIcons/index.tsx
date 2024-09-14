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
        isLoading={isProcessing}
        icon={iconMapping[iconName]} // Ícone correto baseado no nome
        onClick={handleClick}
        variant="outline" // Define o estilo como outline
        backgroundColor="gray.200" // Cor de fundo padrão
        size="sm" // Tamanho pequeno
        borderColor="gray.500" // Cor da borda
        color="gray.700" // Cor do ícone e do texto
        _hover={{
          bg: "transparent", // No hover, mantém o fundo transparente
          borderColor: "gray.700", // A borda fica mais escura
          color: "gray.700", // O ícone/texto ficam mais escuros
        }}
        _active={{
          bg: "transparent", // No clique, mantém o fundo transparente
          borderColor: "gray.800", // A borda fica mais escura no clique
          color: "gray.800", // O ícone/texto ficam ainda mais escuros
        }} aria-label={""}      />
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
