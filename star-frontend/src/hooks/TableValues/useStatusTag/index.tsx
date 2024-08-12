import { Tag } from "@chakra-ui/react";

interface StatusTagProps {
  value: string;
  column: "status" | "pagamento";
}

export function StatusTag({ value, column }: StatusTagProps) {
  let backgroundColor = "";
  let textColor = "white"; // Cor do texto branco

  if (column === "status") {
    backgroundColor = value === "ocupado" ? "red.600" : "green.600"; // Cores mais saturadas
  } else if (column === "pagamento") {
    backgroundColor = value === "pendente" ? "orange.500" : "blue.500"; // Cores mais saturadas
  }

  return (
    <Tag
      size="lg"
      backgroundColor={backgroundColor}
      color={textColor}
      textAlign="center" // Centraliza o texto na tag
      justifyContent="center" // Alinha o conteúdo no centro
      display="flex" // Flexbox para ajudar no alinhamento central
      alignItems="center" // Garante que o texto esteja centralizado verticalmente
    >
      {value}
    </Tag>
  );
}
