import { useState } from 'react';

interface Vaga {
  // Sua interface Vaga aqui
  pagamento: string;
}

export function useSortByPagamento<T extends Vaga>() {
  const [sortOrderPagamento, setSortOrderPagamento] = useState<'asc' | 'desc' | ''>('');

  const sortByPagamento = (records: T[]): T[] => {
    const sortedRecords = records.sort((a, b) =>
      sortOrderPagamento === 'asc' || sortOrderPagamento === '' ?
        a.pagamento.localeCompare(b.pagamento) :
        b.pagamento.localeCompare(a.pagamento)
    );

    // Alterna o estado da ordenação para a próxima vez que a função for chamada
    setSortOrderPagamento(sortOrderPagamento === 'asc' || sortOrderPagamento === '' ? 'desc' : 'asc');

    return sortedRecords;
  };

  return { sortByPagamento, sortOrderPagamento };
}
