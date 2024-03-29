import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { TableIcons } from "../TableIcons";

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

interface TableRowProps {
  record: Vaga;
  handleUpdate: (updatedVaga: any) => void;
  formatDate: (dateString: string | number | Date) => string;
}

export const TableRow: React.FC<TableRowProps> = React.memo(
  ({ record, handleUpdate, formatDate }) => {
    return (
      <Tr>
        {Object.entries(record).map(([key, value], idx) => {
          if (key !== "vagaId") {
            // Verifica se a chave é 'placa' e transforma o valor em maiúsculas
            const displayValue = key === "placa" ? value.toUpperCase() : value;

            // Verifica se a chave é uma das colunas de data e formata a data
            const cellValue =
              key === "entrada" || key === "saida"
                ? formatDate(displayValue)
                : displayValue;

            return <Td key={idx}>{cellValue}</Td>;
          }
          return null;
        })}
        <Td>
          <TableIcons iconName={"email"} />
          <TableIcons iconName={"add"} />
          <TableIcons
            iconName={"check"}
            vagaId={record.vagaId}
            onUpdate={handleUpdate}
          />
          <TableIcons iconName={"info"} />
        </Td>
      </Tr>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.record.vagaId === nextProps.record.vagaId;
  }
);
