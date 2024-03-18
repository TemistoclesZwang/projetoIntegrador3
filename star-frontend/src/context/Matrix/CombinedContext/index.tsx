import React from 'react';
import { Button } from '@chakra-ui/react'; // Supondo que você está usando o Chakra UI
import { useTableInput } from "../../TableInput/TableInputContext"; // Ajuste o caminho conforme necessário
import { useOccupied } from "../OccupiedContext"; // Ajuste o caminho conforme necessário

// Extendendo as props para incluir children usando React.PropsWithChildren
export function CombinedContextButton(props: React.PropsWithChildren<React.ComponentProps<typeof Button>>) {
  const { name, plate, durationHours, durationMinutes } = useTableInput();
  const { occupied } = useOccupied();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(name, plate, durationHours, durationMinutes, occupied);
    // Chama o onClick fornecido por props, se existir
    props.onClick?.(event);
  };

  return (
    <Button {...props} onClick={handleButtonClick}>
      {props.children} {/* Renderizando children aqui */}
    </Button>
  );
}
