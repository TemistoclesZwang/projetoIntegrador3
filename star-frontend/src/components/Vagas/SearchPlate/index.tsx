import { AddIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { Vaga } from "../../../context/TableValues/VagasContext";
import { CombinedContextButton } from "../../../context/Matrix/CombinedContext";

export function SearchPlate() {
  const [searchTerm, setSearchTerm] = useState("");
  const { records, setSearchResults, originalRecords } = useVagas(); // Assumindo que agora temos originalRecords
  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults(null);
    } else {
      const results = originalRecords?.filter((vaga) =>
        vaga.placa.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results || null);
    }
  };

  return (
    <>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={3}
        
      >
        <InputGroup size="md" maxW={"sm"}>
          <Input
            placeholder="Buscar placa, exemplo: A234-44"
            value={searchTerm}
            onChange={handleInputChange}
            bgColor={"gray.200"}
          />
          <InputRightElement width="4.5rem">
            <Search2Icon color={"gray.500"} />
          </InputRightElement>
        </InputGroup>

      </Flex>
    </>
  );
}
