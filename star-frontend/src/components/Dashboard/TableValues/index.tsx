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
  Placa: string;
  Nome: string;
  Status: string;
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
  const [sortOrderName, setSortOrderName] = useState<"asc" | "desc" | "">("");
  const [sortOrderStatus, setSortOrderStatus] = useState<"asc" | "desc" | "">(
    ""
  );
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

  const sortByStatus = () => {
    if (sortOrderStatus === "asc" || sortOrderStatus === "") {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => a.Status.localeCompare(b.Status))
      );
      setSortOrderStatus("desc");
    } else {
      setSortedRecords(
        [...sortedRecords].sort((a, b) => b.Status.localeCompare(a.Status))
      );
      setSortOrderStatus("asc");
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
        {title === "Status" && (
          <IconButton
            onClick={sortByStatus}
            colorScheme="teal"
            variant="solid"
            size="xs"
            ml={2}
            icon={
              sortOrderStatus === "asc" ? (
                <TriangleUpIcon />
              ) : (
                <TriangleDownIcon />
              )
            }
            aria-label={"Ordenar por status"}
          />
        )}
        {title === "Duração" && (
          <IconButton
            onClick={sortByDuration}
            colorScheme="teal"
            variant="solid"
            size="xs"
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
