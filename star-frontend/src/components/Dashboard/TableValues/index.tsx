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
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { TableIcons } from "../TableIcons";
import { useGet } from "../../../hooks/api/useGet";
import { useSortByName } from "../../../hooks/TableValues/useSortByName";
import {useSortByPagamento} from "../../../hooks/TableValues/useSortByPagamento";
import {useSortByValor} from "../../../hooks/TableValues/useSortByValor";
import { useVagas } from "../../../context/TableValues/VagasContext";

interface Vaga { //retirar essa interface daqui é usada em mais de um lugar
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
  return Object.keys(record) as string[];
};

export function TableValues() {

  const { records, isLoading, error } = useVagas();


  // lembrar: Inicialize todos os estados antes de qualquer lógica condicional
  const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  
  // const [sortOrderValor, setSortOrderValor] = useState<"asc" | "desc" | "">("");
  // const [sortOrderName, setSortOrderName] = useState<"asc" | "desc" | "">("");
  const { sortedByName, sortOrderName } = useSortByName<Vaga>();
  const [sortOrderDuration, setSortOrderDuration] = useState<
    "asc" | "desc" | ""
  >("");
  const [sortOrderEntrada, setSortOrderEntrada] = useState<"asc" | "desc" | "">(
    ""
  );
  // const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  const { sortByValor, sortOrderValor } = useSortByValor<Vaga>();


  // const [sortedRecords, setSortedRecords] = useState<Vaga[]>([]);
  const { sortByPagamento, sortOrderPagamento } = useSortByPagamento<Vaga>();
  //. todos os estados tem que ser inicializados antes de qualquer lógica de uso

  useEffect(() => {
    if (records) {
      setSortedRecords(records);
    }
  }, [records]);

  if (isLoading) { //colocar skeleton e erros chakra
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!records || records.length === 0) {
    return <div>No data available</div>;
  }

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
    const convertDateFromString = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    if (sortOrderEntrada === "asc" || sortOrderEntrada === "") {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertDateFromString(a.entrada).getTime() -
            convertDateFromString(b.entrada).getTime()
        )
      );
      setSortOrderEntrada("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertDateFromString(b.entrada).getTime() -
            convertDateFromString(a.entrada).getTime()
        )
      );
      setSortOrderEntrada("asc");
    }
  };



  type SortableKeys = 'nome' | 'pagamento' | 'duração' | 'entrada' | 'valor';
  
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
  
  const generateTableHeaders = (titles: string[]) => {
    return titles.map((title, index) => (
      <Th key={index}>
        {title}
        {(title as SortableKeys) in sortActions && (
          <IconButton
            onClick={sortActions[title as SortableKeys]} // Casting 'title' como 'SortableKeys'
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize="8"
            ml={2}
            icon={
              sortOrder[title as SortableKeys] === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={`Ordenar por ${title}`}
          />
        )}
      </Th>
    ));
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Registro de Estacionamento</TableCaption>
        <Thead>
          <Tr>{generateTableHeaders(thTitles)}</Tr>
        </Thead>
        <Tbody>
          {sortedRecords.map((record, index) => (
            <Tr key={index}>
              {Object.values(record).map((value, idx) => (
                <Td key={idx}>{value}</Td>
              ))}
              <Td>
                <TableIcons iconName={"email"} />
                <TableIcons iconName={"add"} />
                <TableIcons iconName={"check"} />
                <TableIcons iconName={"info"} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>{generateTableHeaders(thTitles)}</Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
