import React, { useState, useRef } from "react";
import { IconButton, Box, Popover, PopoverContent, PopoverArrow, PopoverBody, PopoverHeader, PopoverCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import { TimeIcon, CheckIcon, AddIcon, InfoIcon } from "@chakra-ui/icons";
import { useTutorial } from "../../../context/TutorialPopover";

interface TableIconsProps {
  iconName: string;
  vagaId: number;
  onUpdate: () => void;
  isAutoUpdateEnabled: boolean;
  id?: string;
}

export function TableIcons({ iconName, vagaId, onUpdate, isAutoUpdateEnabled,id }: TableIconsProps) {
  const { steps, addSteps } = useTutorial();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const targetRef = useRef<HTMLButtonElement | null>(null);
  const [isTargetReady, setIsTargetReady] = useState(false);

  // Verifica se o alvo do tutorial está pronto e, se sim, abre o popover
  const handlePopover = () => {
    setIsTargetReady(true);
    onOpen();
  };

  const getIconComponent = (name: string): React.ReactElement => {
    switch (name) {
      case "time":
        return <TimeIcon />;
      case "check":
        return <CheckIcon />;
      case "add":
        return <AddIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return <TimeIcon />; // Retorna um ícone padrão em vez de `null`
    }
  };
  

  const handleClick = () => {
    onUpdate(); // Ação de atualização ao clicar no ícone
  };

  return (
    <Box id={id}>
      <IconButton
        aria-label={`Icon ${iconName}`}
        icon={getIconComponent(iconName)}
        ref={targetRef}
        onClick={handleClick}
      />
      {isTargetReady && (
        <Popover isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur={false}>
          <PopoverArrow />
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Passo {steps.length + 1}</PopoverHeader>
            <PopoverBody>{`Este é o popover para o ícone ${iconName}`}</PopoverBody>
            <Button size="sm" onClick={onClose}>
              Próximo
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </Box>
  );
}
