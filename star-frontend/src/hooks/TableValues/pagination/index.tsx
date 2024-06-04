// hooks/TableValues/usePagination.ts
import { useState } from "react";

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return {
    currentPage,
    setCurrentPage,
  };
}
