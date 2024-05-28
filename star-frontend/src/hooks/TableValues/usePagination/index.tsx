import React from "react";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex justifyContent="center" mt={4} m={'1rem'}>
      <ButtonGroup isAttached variant="outline">
        <Button onClick={handlePrevious} isDisabled={currentPage === 1} bgColor={"white"}>
          Previous
        </Button>
        <Button bgColor={"white"}>{`Page ${currentPage} of ${totalPages}`} </Button>
        <Button onClick={handleNext} isDisabled={currentPage === totalPages} bgColor={"white"}>
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
