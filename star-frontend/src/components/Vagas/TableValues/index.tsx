import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  IconButton,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  useTheme,
  background,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { TableIcons } from "../TableIcons";
import { useGet } from "../../../hooks/api/useGet";
import { useSortByName } from "../../../hooks/TableValues/useSortByName";
import { useSortByPagamento } from "../../../hooks/TableValues/useSortByPagamento";
import { useSortByValor } from "../../../hooks/TableValues/useSortByValor";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { CombinedContextButton } from "../../../context/Matrix/CombinedContext";
import { useAutoUpdate } from "../../../context/AutoUpdateContext/AutoUpdateContext";
import { useAuth } from "../../../context/Auth";

interface Vaga {
  //retirar essa interface daqui é usada em mais de um lugar
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

const extractTitlesFromRecord = (record: Vaga): string[] => {
  return Object.keys(record).filter((key) => key !== "vagaId"); // Exclui 'vagaId' da lista de chaves
};

export function TableValues() {
  const theme = useTheme();
  const { accessToken } = useAuth();
  const { records, isLoading, error } = useVagas();

  // lembrar: Inicialize todos os estados antes de qualquer lógica condicional
  const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  const { isAutoUpdateEnabled } = useAutoUpdate();

  const { sortedByName, sortOrderName } = useSortByName<Vaga>();
  const [sortOrderDuration, setSortOrderDuration] = useState<
    "asc" | "desc" | ""
  >("");
  const [sortOrderEntrada, setSortOrderEntrada] = useState<"asc" | "desc" | "">(
    ""
  );

  const { sortByValor, sortOrderValor } = useSortByValor<Vaga>();

  // const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  const { sortByPagamento, sortOrderPagamento } = useSortByPagamento<Vaga>();
  //. todos os estados tem que ser inicializados antes de qualquer lógica de uso

  useEffect(() => {
    if (records) {
      setSortedRecords(records);
    }
  }, [records]);

  useEffect(() => {
    const fetchUpdatedValues = async () => {
      const updates = await Promise.all(records.map(async (record) => {
        const response = await fetch(`http://localhost:3000/vagas/previa-valor/${record.vagaId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        return { ...record, duracao: data.tempoTotalUsandoVaga, valor: data.valorPagar };
      }));

      setSortedRecords(prevRecords => {
        return prevRecords.map(record => {
          const update = updates.find(u => u.vagaId === record.vagaId);
          return update || record;
        });
      });
    };

    if (isAutoUpdateEnabled) {
      console.log("Auto update enabled");
      
      const interval = setInterval(fetchUpdatedValues, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoUpdateEnabled, accessToken, records]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!sortedRecords.length) return <div>No data available</div>;
  const thTitles = extractTitlesFromRecord(records[0]);

  const sortByDuration = () => {
    if (sortOrderDuration === "asc" || sortOrderDuration === "") {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => a.duracao - b.duracao)
      );
      setSortOrderDuration("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => b.duracao - a.duracao)
      );
      setSortOrderDuration("asc");
    }
  };

  const handleSortByName = () => {
    const newSortedRecords = sortedByName(sortedRecords);
    setSortedRecords(newSortedRecords);
  };

  const sortByEntrada = () => {
    if (sortOrderEntrada === "asc" || sortOrderEntrada === "") {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            new Date(a.entrada).getTime() - new Date(b.entrada).getTime()
        )
      );
      setSortOrderEntrada("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            new Date(b.entrada).getTime() - new Date(a.entrada).getTime()
        )
      );
      setSortOrderEntrada("asc");
    }
  };

  type SortableKeys = "nome" | "pagamento" | "duração" | "entrada" | "valor";

  const handleSortByPagamento = () => {
    const newSortedRecords = sortByPagamento(sortedRecords);
    setSortedRecords(newSortedRecords);
  };

  const handleSortByValor = () => {
    const newSortedRecords = sortByValor(sortedRecords);
    setSortedRecords(newSortedRecords);
  };

  const sortActions: Record<SortableKeys, () => void> = {
    nome: handleSortByName,
    pagamento: handleSortByPagamento,
    duração: sortByDuration,
    entrada: sortByEntrada,
    valor: handleSortByValor,
  };

  const sortOrder: Record<SortableKeys, "asc" | "desc" | ""> = {
    nome: sortOrderName,
    pagamento: sortOrderPagamento,
    duração: sortOrderDuration,
    entrada: sortOrderEntrada,
    valor: sortOrderValor,
  };
  function formatDate(dateString: string | number | Date | null) {
    if (dateString === null || dateString === "") {
      // Retorna uma string vazia ou algum outro placeholder se a data for null
      return "";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const date = new Date(dateString);
    // Verifica se a data é inválida antes de tentar formatá-la
    if (isNaN(date.getTime())) {
      return ""; // Retorna string vazia ou placeholder para datas inválidas
    }

    return date.toLocaleDateString("pt-BR", options).replace(",", "");
  }

  const generateTableHeaders = (titles: string[]) => {
    return titles.map((title, index) => (
      <Th key={index}>
        {title}
        {(title as SortableKeys) in sortActions && (
          <IconButton
            onClick={sortActions[title as SortableKeys]}
            aria-label={`Ordenar por ${title}`}
            colorScheme="teal"
            variant="ghost"
            size="xs"
            fontSize="15"
            ml={2}
            icon={
              sortOrder[title as SortableKeys] === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
          />
        )}
      </Th>
    ));
  };
  // const atualizarInfosVagaLiberada = (updatedVaga: any) => {
  //   setSortedRecords(records => records.map(vaga => vaga.vagaId === updatedVaga.vagaId ? updatedVaga : vaga));
  // };

  const atualizarInfosVagaLiberada = (updatedVaga: any) => {
    console.log("toggle:", isAutoUpdateEnabled);

    setSortedRecords((records) =>
      records.map((vaga) =>
        vaga.vagaId === updatedVaga.vagaId ? { ...vaga, ...updatedVaga } : vaga
      )
    );
  };

  return (
    <>
      {/* <Stack
        direction="row"
        justifyContent="end"
        mb={4}
        // position={"fixed"}
        // w={"100%"}
        
      >
        <AutoUpdateToggle />
      </Stack> */}

      <TableContainer backgroundColor={"gray.300"} borderRadius={"md"}>
        <Flex
          w={"100%"}
          justifyContent={"end"}
          p={6}
          // backgroundColor={"gray.100"}
          mb={-59}
          // position={"fixed"}
        >
          {/* <CombinedContextButton
            bg={theme.colors.highlights[50]}
            size={"md"}
            p={"2"}
            gap={2}
            // w={"5rem"}
            position={"fixed"}
            zIndex={1}
            mr={'9.5rem'}
            mt={'5rem'}
          >
            <AddIcon />
            
          </CombinedContextButton> */}
        </Flex>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Registro de Estacionamento</TableCaption>
          <Thead>
            <Tr>{generateTableHeaders(thTitles)}</Tr>
          </Thead>
          <Tbody>
            {sortedRecords.map((record, index) => (
              <Tr key={index}>
                {Object.entries(record).map(([key, value], idx) => {
                  // Filtra a propriedade vagaId para não renderizar na tabela
                  if (key !== "vagaId") {
                    // Verifica se a chave é uma das colunas de data
                    if (key === "entrada" || key === "saida") {
                      return <Td key={idx}>{formatDate(value)}</Td>;
                    }
                    return <Td key={idx}>{value}</Td>;
                  }
                  return null; // Retorna null para a propriedade vagaId, omitindo-a da tabela
                })}
                <Td>
                  <TableIcons
                    iconName={"email"}
                    vagaId={record.vagaId}
                    onUpdate={atualizarInfosVagaLiberada}
                    isAutoUpdateEnabled={isAutoUpdateEnabled}
                  />

                  <TableIcons iconName={"add"} />
                  <TableIcons
                    iconName={"check"}
                    vagaId={record.vagaId}
                    onUpdate={atualizarInfosVagaLiberada}
                  />
                  <TableIcons iconName={"info"} />
                  {/* <button onClick={() => fetchAndUpdateVaga(record.vagaId)}>Atualizar</button> Botão para atualizar */}
                </Td>
              </Tr>
            ))}
          </Tbody>

          <Tfoot>
            <Tr>{generateTableHeaders(thTitles)}</Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
