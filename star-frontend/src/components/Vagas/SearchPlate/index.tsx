import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { Vaga } from "../../../context/TableValues/VagasContext";

export function SearchPlate() {
  //! não fazer push dessa modificação antes de testar
  const [searchTerm, setSearchTerm] = useState("");
  const { records, setSearchResults, originalRecords } = useVagas(); // Assumindo que agora temos originalRecords
  const handleInputChange = (e: { target: { value: any; }; }) => {
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
    <InputGroup size="md" maxW={"sm"}>
      <Input
        placeholder="Buscar placa, exemplo: A234-44"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <InputRightElement width="4.5rem">
        <Search2Icon color={'gray.100'}/>
      </InputRightElement>
    </InputGroup>
  );
  
}
