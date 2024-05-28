import React, { useState, useEffect } from "react";
import { Input, Flex, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { Search2Icon } from "@chakra-ui/icons";

interface Vaga {
  vagaId: number;
  status: string;
  placa: string;
  nome: string;
  pagamento: string;
  duracao: number;
  entrada: string;
  saida: string;
  valor: string;
  vaga: string;
}

export function SearchInput() {
  const { records } = useVagas();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(records);
    }
  }, [searchTerm, records]);

  const handleSearch = () => {
    const filteredRecords = records.filter(record =>
      record.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredRecords);
  };

  const setSearchResults = (results: Vaga[]) => {
    const event = new CustomEvent('searchResults', { detail: results });
    window.dispatchEvent(event);
  };

  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    //   gap={3}
      // w={"95vw"}
      // bgColor={"red"}
    >
      <InputGroup size="md" maxW={"md"} >
        <Input
          placeholder="Buscar placa, exemplo: A234-44"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bgColor={"gray.200"}
          color={"gray.900"}
        />
        <InputRightElement width="3.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleSearch}
            bgColor={"gray.900"}
            _hover={{ bgColor: "gray.300" }}
          >
            <Search2Icon color={"gray.500"} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
