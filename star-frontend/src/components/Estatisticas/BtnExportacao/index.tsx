// ExportAllCSVButton.tsx
import React from "react";
import { Button } from "@chakra-ui/react";

interface ExportCSVButtonProps {
  datasets: Record<string, Record<string, number>>;
  filename: string;
}

export function ExportAllCSVButton({ datasets, filename }: ExportCSVButtonProps) {
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Categoria", "Valor"];
    csvRows.push(headers.join(","));

    Object.entries(datasets).forEach(([chartName, data]) => {
      csvRows.push(`\n${chartName}`); // Adiciona uma nova linha com o nome do gráfico
      Object.entries(data).forEach(([key, value]) => {
        csvRows.push(`${key},${value}`);
      });
    });

    const csvString = csvRows.join("\n");

    // Criar um blob para baixar o arquivo CSV
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button colorScheme="teal" onClick={exportToCSV}>
      Exportar Todos os Dados para CSV
    </Button>
  );
}
