import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from '@chakra-ui/icons';

type TableIconsProps = {
  iconName: 'email' | 'add' | 'check' | 'info';
};

const iconMapping = {
  email: <EmailIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />
};

export function TableIcons({ iconName }: TableIconsProps) {
  return (
    <IconButton
      isRound={true}
      variant="solid"
      colorScheme="teal"
      aria-label="Ação"
      fontSize="20px"
      size="sm"
      ml={1}
      icon={iconMapping[iconName]}
    />
  );
}
