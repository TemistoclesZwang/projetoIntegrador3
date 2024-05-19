import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useVagas } from "../../../context/TableValues/VagasContext";

export function SearchPlate() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResults, originalRecords } = useVagas();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults(originalRecords ?? []);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults(originalRecords ?? []);
    } else {
      const results = originalRecords?.filter((vaga) =>
        vaga.placa.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results ?? []);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={3}
      w={"90%"}
    >
      <InputGroup size="md" maxW={"lg"}>
        <Input
          placeholder="Buscar placa, exemplo: A234-44"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
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
