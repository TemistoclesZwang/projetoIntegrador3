import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import {
    Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { Vaga } from "../../../context/TableValues/VagasContext";

// . a busca deve retornar todos os elementos do item achado
//. quem deve exibir o resultado da busca é o table values
//. a busca está sendo feita pela placa

export function SearchPlate() {
  const [searchTerm, setSearchTerm] = useState('');
  const { records, setSearchResults } = useVagas();

  const handleSearch = () => {
      const results = records.filter(vaga =>
          vaga.placa.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results); // Atualiza o contexto com os resultados da busca
  };

  return (
      <InputGroup size="md" maxW={"lg"}>
          <Input
              placeholder="Buscar placa, exemplo: A234-44"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement width="4.5rem">
              <Button
                  size="sm"
                  fontSize={"lg"}
                  onClick={handleSearch}
                  rightIcon={<Search2Icon />}
              >
                  Buscar
              </Button>
          </InputRightElement>
      </InputGroup>
  );
}