import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";
import { useEndpoint } from "../../../hooks/api/useEndpoint";

type TableIconsProps = {
  iconName: "email" | "add" | "check" | "info";
  vagaId?: number;
  onUpdate?: (updatedVaga: any) => void; // Adicionado prop para notificar atualização
};

const iconMapping = {
  email: <EmailIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />,
};
export function TableIcons({ iconName, vagaId, onUpdate }: TableIconsProps) {
  const { handleAction, isProcessing } = useIconClick(iconName, vagaId, onUpdate);

  // Usar `handleAction` no lugar de `handleClick`, removendo useEffect anterior

  return (
    <IconButton
      isLoading={isProcessing} // Adicionado para indicar carregamento
      isRound={true}
      variant="solid"
      colorScheme="teal"
      aria-label="Ação"
      fontSize="sm"
      size="sm"
      ml={1}
      icon={iconMapping[iconName]}
      onClick={handleAction} // Atualizado para usar handleAction
    />
  );
}