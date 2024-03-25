import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { Vaga } from "../../../context/TableValues/VagasContext";

export function SearchPlate() {
  const [searchTerm, setSearchTerm] = useState("");
  const { records, setSearchResults, originalRecords } = useVagas(); // Assumindo que agora temos originalRecords

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Quando o campo de busca está vazio, reset para os registros originais
      setSearchResults(null);
    } else {
      // Realiza a busca na lista original sempre
      const results = originalRecords?.filter((vaga) =>
        vaga.placa.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results || null); // Add null check here
    }
  }, [searchTerm, setSearchResults, originalRecords]);

  return (
    <InputGroup size="md" maxW={"sm"}>
      <Input
        placeholder="Buscar placa, exemplo: A234-44"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Search2Icon color={'gray.100'}/>
      </InputRightElement>
    </InputGroup>
  );
}
