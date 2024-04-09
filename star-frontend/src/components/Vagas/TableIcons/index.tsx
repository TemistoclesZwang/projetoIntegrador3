import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { useEndpoint } from "../../../hooks/api/useEndpoint";

type TableIconsProps = {
  iconName: "email" | "add" | "check" | "info";
  vagaId?: number;
  onUpdate?: (updatedVaga: any) => void;
};

const iconMapping = {
  email: <EmailIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />,
};

export function TableIcons({ iconName, vagaId, onUpdate }: TableIconsProps) {
  const { handleAction, isProcessing } = useIconClick(iconName, vagaId, onUpdate);

  useEffect(() => {
    // Verifica se o iconName é "email" para iniciar a atualização automática
    if (iconName === "email") {
      const intervalId = setInterval(() => {
        handleAction();
      }, 6000); // 60000 ms = 1 minuto

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }
  }, [iconName, handleAction, vagaId]); // Inclui vagaId nas dependências, caso ele influencie a ação

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
      onClick={handleAction} // Ainda permite atualizações manuais via clique
    />
  );
}