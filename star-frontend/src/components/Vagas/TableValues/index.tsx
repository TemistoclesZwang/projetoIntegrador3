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
  Flex,
  Text,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { TableIcons } from "../TableIcons";
import { useVagas } from "../../../context/TableValues/VagasContext";
import { useSortByName } from "../../../hooks/TableValues/useSortByName";
import { useSortByPagamento } from "../../../hooks/TableValues/useSortByPagamento";
import { useSortByValor } from "../../../hooks/TableValues/useSortByValor";
import { useAutoUpdate } from "../../../context/AutoUpdateContext/AutoUpdateContext";
import { useAuth } from "../../../context/Auth";
import { Pagination } from "../../../hooks/TableValues/usePagination";

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



export function TableValues() {
  const { accessToken } = useAuth();
  const { records, isLoading, error, refreshRecords } = useVagas();
  const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Define records per page
  const { isAutoUpdateEnabled } = useAutoUpdate();

  const { sortedByName, sortOrderName } = useSortByName<Vaga>();
  const [sortOrderDuration, setSortOrderDuration] = useState<"asc" | "desc" | "">("");
  const [sortOrderEntrada, setSortOrderEntrada] = useState<"asc" | "desc" | "">("");
  const { sortByValor, sortOrderValor } = useSortByValor<Vaga>();
  const { sortByPagamento, sortOrderPagamento } = useSortByPagamento<Vaga>();

  useEffect(() => {
    if (records) {
      setSortedRecords(records.length > 0 ? records : []);
    }
  }, [records]);

  useEffect(() => {
    const fetchUpdatedValues = async () => {
      const updates = await Promise.all(
        records.map(async (record) => {
          const response = await fetch(
            `http://localhost:3000/vagas/previa-valor/${record.vagaId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          return {
            ...record,
            duracao: data.tempoTotalUsandoVaga,
            valor: data.valorPagar,
          };
        })
      );

      setSortedRecords((prevRecords) => {
        return prevRecords.map((record) => {
          const update = updates.find((u) => u.vagaId === record.vagaId);
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

  const extractTitlesFromRecord = (record: Vaga | undefined): string[] => {
    if (!record) return [];
    return Object.keys(record).filter((key) => key !== "vagaId");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!sortedRecords.length) return <Text color={'white'} fontSize={'lg'}>Nenhum resultado encontrado</Text>

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
    if (isNaN(date.getTime())) {
      return "";
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

  const atualizarInfosVagaLiberada = (updatedVaga: any) => {
    setSortedRecords((records) =>
      records.map((vaga) =>
        vaga.vagaId === updatedVaga.vagaId ? { ...vaga, ...updatedVaga } : vaga
      )
    );
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  return (
    <TableContainer backgroundColor={"gray.300"} borderRadius={"md"}>
      <Flex w={"100%"} justifyContent={"end"} p={6} mb={-59}></Flex>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Registro de Estacionamento</TableCaption>
        <Thead>
          <Tr>{generateTableHeaders(thTitles)}</Tr>
        </Thead>
        <Tbody>
          {currentRecords.map((record, index) => (
            <Tr key={index}>
              {Object.entries(record).map(([key, value], idx) => {
                if (key !== "vagaId") {
                  if (key === "entrada" || key === "saida") {
                    return <Td key={idx}>{formatDate(value)}</Td>;
                  }
                  return <Td key={idx}>{value}</Td>;
                }
                return null;
              })}
              <Td>
                <TableIcons
                  iconName={"email"}
                  vagaId={record.vagaId}
                  onUpdate={atualizarInfosVagaLiberada}
                  isAutoUpdateEnabled={isAutoUpdateEnabled}
                />
                <TableIcons
                  iconName={"add"}
                  vagaId={record.vagaId}
                  onUpdate={() => refreshRecords()}
                  isAutoUpdateEnabled={isAutoUpdateEnabled}
                />
                <TableIcons
                  iconName={"check"}
                  vagaId={record.vagaId}
                  onUpdate={atualizarInfosVagaLiberada}
                />
                <TableIcons iconName={"info"} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>{generateTableHeaders(thTitles)}</Tr>
        </Tfoot>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </TableContainer>
  );
}
