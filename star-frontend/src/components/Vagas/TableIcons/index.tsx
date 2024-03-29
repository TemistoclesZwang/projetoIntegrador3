import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { useIconClick } from "../../../hooks/TableIcons";

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
  const { handleClick, shouldPost } = useIconClick(iconName);

  useEffect(() => {
    if (shouldPost && iconName === "check" && vagaId) {
      postAndFetchVaga(vagaId);
    }
  }, [shouldPost, iconName, vagaId]);

  const postAndFetchVaga = async (vagaId: number) => {
    try {
      // POST
      await fetch(`http://localhost:3000/vagas/${vagaId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      const response = await fetch(`http://localhost:3000/vagas/${vagaId}`);
      if (!response.ok) {
        throw new Error("Falha ao obter vaga atualizada");
      }
      const updatedVaga = await response.json();
      if (onUpdate) {
        onUpdate(updatedVaga); // Chama função de atualização passada via props
      }
    } catch (error) {
      console.error("Erro ao atualizar a vaga:", error);
    }
  };

  return (
    <IconButton
      isRound={true}
      variant="solid"
      colorScheme="teal"
      aria-label="Ação"
      fontSize="sm"
      size="sm"
      ml={1}
      icon={iconMapping[iconName]}
      onClick={handleClick}
    />
  );
}
