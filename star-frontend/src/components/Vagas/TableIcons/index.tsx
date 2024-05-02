import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { useEndpoint } from "../../../hooks/api/useEndpoint";

interface TableIconsProps {
  iconName: "email" | "add" | "check" | "info";
  vagaId?: number;
  onUpdate?: (updatedVaga: any) => void;
  isAutoUpdateEnabled?: boolean; // Adicione esta linha
}

const iconMapping = {
  email: <EmailIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />,
};
export function TableIcons({ iconName, vagaId, onUpdate, isAutoUpdateEnabled }: TableIconsProps) {
  const { handleAction, isProcessing } = useIconClick(iconName, vagaId, onUpdate);

  useEffect(() => {
    let intervalId: number | undefined;
    if (iconName === "email" && isAutoUpdateEnabled) { // Verifica se a atualização automática está habilitada
      intervalId = setInterval(() => {
        handleAction();
      }, 60000); // Define o intervalo para 1 minuto
    }

    return () => {
      if (intervalId) clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado ou se isAutoUpdateEnabled muda
    };
  }, [iconName, handleAction, isAutoUpdateEnabled]); // Adiciona isAutoUpdateEnabled às dependências

  return (
    
    <IconButton
      isLoading={isProcessing}
      isRound={true}
      variant="solid"
      colorScheme="teal"
      aria-label="Ação"
      fontSize="sm"
      size="sm"
      ml={1}
      icon={iconMapping[iconName]}
      onClick={handleAction}
    />
  );
}