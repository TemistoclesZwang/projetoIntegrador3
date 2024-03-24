import { useState } from 'react';

interface SortableItem {
  nome: string;
  [key: string]: any;
}

export const useSortByName = <T extends SortableItem>() => {
  const [sortOrderName, setSortOrderName] = useState<"asc" | "desc" | "">("");

  const sortByName = (items: T[]): T[] => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrderName === "asc" || sortOrderName === "") {
        return a.nome.localeCompare(b.nome);
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });

    // Alterna o estado da ordenação
    setSortOrderName(sortOrderName === "asc" || sortOrderName === "" ? "desc" : "asc");

    return sortedItems;
  };

  return { sortedByName: sortByName, sortOrderName };
};
