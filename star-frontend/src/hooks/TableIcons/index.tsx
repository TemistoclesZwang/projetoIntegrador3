// useIconClick.ts
import { useCallback, useState } from 'react';
import { useEndpoint } from '../api/useEndpoint';

type IconType = 'email' | 'add' | 'check' | 'info';

export function useIconClick(iconName: IconType) {
  // Adicionado para gerenciar a chamada do POST quando o ícone check for clicado
  const [shouldPost, setShouldPost] = useState(false);

  const handleClick = useCallback(() => {
    switch (iconName) {
      case 'email':
        console.log('Email icon clicked');
        break;
      case 'add':
        console.log('Add icon clicked');
        break;
      case 'check':
        console.log('Check icon clicked');
        // Configurar para fazer o POST quando este ícone for clicado
        setShouldPost(true);
        break;
      case 'info':
        console.log('Info icon clicked');
        break;
      default:
        console.log('Unknown icon');
    }
  }, [iconName]);

  // Retornar tanto o manipulador de cliques quanto a flag shouldPost
  return { handleClick, shouldPost };
}

