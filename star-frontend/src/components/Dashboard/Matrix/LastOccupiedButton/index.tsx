// LastOccupiedButton.tsx
import React from 'react';
import { useOccupied } from '../../../../context/Matrix/OccupiedContext';
import { Button } from '@chakra-ui/react';

export function LastOccupiedButton() {
  const { handleLastOccupiedClick } = useOccupied();

  return (
    <Button onClick={handleLastOccupiedClick}>Mostrar Último Ocupado</Button>
    
  );
}
