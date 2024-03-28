import React, { useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { EmailIcon, AddIcon, CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { useIconClick } from '../../../hooks/TableIcons';
import { useEndpoint } from '../../../hooks/api/useEndpoint';

type TableIconsProps = {
  iconName: 'email' | 'add' | 'check' | 'info';
  vagaId?: number;
};

const iconMapping = {
  email: <EmailIcon />,
  add: <AddIcon />,
  check: <CheckIcon />,
  info: <InfoIcon />
};

//. utilizar o useEnpoint
//. atualizar as informações da respectiva linha atualizada, re renderizar a tabela
export function TableIcons({ iconName, vagaId }: TableIconsProps) {
  const { handleClick, shouldPost } = useIconClick(iconName);
  
  useEffect(() => {
    // Este useEffect agora apenas observa mudanças em shouldPost e iconName
    if (shouldPost && iconName === 'check' && vagaId) {
      postToEndpoint(vagaId);
    }
  }, [shouldPost, iconName, vagaId]);

  // Uma função separada para realizar a requisição POST
  const postToEndpoint = async (vagaId: number) => {
    const url = `http://localhost:3000/vagas/${vagaId}`; // Certifique-se de que a URL está correta
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null, // O POST não envia nenhum corpo neste caso
    });

    if (!response.ok) {
      // Handle response error
      console.error('Network response was not ok');
    } else {
      // Handle success
      const result = await response.json();
      console.log('Success:', result);
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

