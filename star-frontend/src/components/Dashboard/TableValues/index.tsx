import React, { useState } from "react";
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

type ParkingRecord = {
  Status: string;
  Placa: string;
  Nome: string;
  Pagamento: string;
  Duração: string;
  Entrada: string;
  Saída: string;
  Valor: string;
  Vaga: string;
};

type TableValuesProps = {
  records: ParkingRecord[];
};

const extractTitlesFromRecord = (record: ParkingRecord): string[] => {
  return Object.keys(record) as string[];
};

export function TableValues({ records }: TableValuesProps) {
  const [sortedRecords, setSortedRecords] = useState(records);
  const [sortOrderValor, setSortOrderValor] = useState<"asc" | "desc" | "">("");
  const [sortOrderName, setSortOrderName] = useState<"asc" | "desc" | "">("");
  const [sortOrderEntrada, setSortOrderEntrada] = useState<"asc" | "desc" | "">(
    ""
  );
  const [sortOrderPagamento, setSortOrderPagamento] = useState<
    "asc" | "desc" | ""
  >("");
  const thTitles =
    records.length > 0 ? extractTitlesFromRecord(records[0]) : [];
  const [sortOrderDuration, setSortOrderDuration] = useState<
    "asc" | "desc" | ""
  >("");

  const convertDurationToMinutes = (duration: string) => {
    const hoursMatch = duration.match(/(\d+)h/);
    const minutesMatch = duration.match(/(\d+)min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) * 60 : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    return hours + minutes;
  };

  const sortByDuration = () => {
    if (sortOrderDuration === "asc" || sortOrderDuration === "") {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertDurationToMinutes(a.Duração) -
            convertDurationToMinutes(b.Duração)
        )
      );
      setSortOrderDuration("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertDurationToMinutes(b.Duração) -
            convertDurationToMinutes(a.Duração)
        )
      );
      setSortOrderDuration("asc");
    }
  };

  const sortByName = () => {
    if (sortOrderName === "asc" || sortOrderName === "") {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => a.Nome.localeCompare(b.Nome))
      );
      setSortOrderName("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => b.Nome.localeCompare(a.Nome))
      );
      setSortOrderName("asc");
    }
  };

  const sortByPagamento = () => {
    if (sortOrderPagamento === "asc" || sortOrderPagamento === "") {
      setSortedRecords(
        [...sortedRecords].sort((a, b) =>
          a.Pagamento.localeCompare(b.Pagamento)
        )
      );
      setSortOrderPagamento("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort((a, b) =>
          b.Pagamento.localeCompare(a.Pagamento)
        )
      );
      setSortOrderPagamento("asc");
    }
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
            convertDateFromString(a.Entrada).getTime() -
            convertDateFromString(b.Entrada).getTime()
        )
      );
      setSortOrderEntrada("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertDateFromString(b.Entrada).getTime() -
            convertDateFromString(a.Entrada).getTime()
        )
      );
      setSortOrderEntrada("asc");
    }
  };

  const convertMoneyToNumber = (money: string) => {
    return parseFloat(money.replace(",", "."));
  };

  const sortByValor = () => {
    if (sortOrderValor === "asc" || sortOrderValor === "") {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertMoneyToNumber(a.Valor) - convertMoneyToNumber(b.Valor)
        )
      );
      setSortOrderValor("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort(
          (a, b) =>
            convertMoneyToNumber(b.Valor) - convertMoneyToNumber(a.Valor)
        )
      );
      setSortOrderValor("asc");
    }
  };

  const generateTableHeaders = (titles: string[]) => {
    return titles.map((title, index) => (
      <Th key={index}>
        {title}
        {title === "Nome" && (
          <IconButton
            onClick={sortByName}
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize={"8"}
            ml={2}
            icon={
              sortOrderName === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={"Ordenar por nome"}
          />
        )}
        {title === "Pagamento" && (
          <IconButton
            onClick={sortByPagamento}
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize={"8"}
            ml={2}
            icon={
              sortOrderPagamento === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={"Ordenar por Pagamento"}
          />
        )}
        {title === "Duração" && (
          <IconButton
            onClick={sortByDuration}
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize={"8"}
            ml={2}
            icon={
              sortOrderDuration === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={"Ordenar por duração"}
          />
        )}
        {title === "Entrada" && (
          <IconButton
            onClick={sortByEntrada}
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize={"8"}
            ml={2}
            icon={
              sortOrderEntrada === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={"Ordenar por entrada"}
          />
        )}
        {title === "Valor" && (
          <IconButton
            onClick={sortByValor}
            aria-label="Ordenar por valor"
            icon={
              sortOrderValor === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            ml={2}
            colorScheme="teal"
            variant="solid"
            size="xs"
            fontSize="8"
          />
        )}
      </Th>
    ));
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
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
