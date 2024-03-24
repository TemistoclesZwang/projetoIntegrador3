import { useState } from 'react';

interface Vaga {
  // Definição da interface Vaga aqui
  valor: string; // Garantir que valor é parte da interface
}

export function useSortByValor<T extends Vaga>() {
  const [sortOrderValor, setSortOrderValor] = useState<'asc' | 'desc' | ''>('');

  const convertMoneyToNumber = (money: string) => parseFloat(money.replace(",", "."));

  const sortByValor = (records: T[]): T[] => {
    const sortedRecords = records.sort((a, b) =>
      sortOrderValor === 'asc' || sortOrderValor === '' ?
        convertMoneyToNumber(a.valor) - convertMoneyToNumber(b.valor) :
        convertMoneyToNumber(b.valor) - convertMoneyToNumber(a.valor)
    );

    // Alterna o estado da ordenação para a próxima vez que a função for chamada
    setSortOrderValor(sortOrderValor === 'asc' || sortOrderValor === '' ? 'desc' : 'asc');

    return sortedRecords;
  };

  return { sortByValor, sortOrderValor };
}
