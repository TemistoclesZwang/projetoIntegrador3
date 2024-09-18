import { Box, Flex, Text } from "@chakra-ui/react";

interface StatusTagProps {
  value: string;
  column: "status" | "pagamento";
}

export function StatusTag({ value, column }: StatusTagProps) {
  let backgroundColor = ""; // Define a cor da bolinha

  // Definindo a cor baseada no status e no pagamento
  if (column === "status") {
    backgroundColor = value === "ocupado" ? "red.500" : "green.400"; // Vermelho para "ocupado", verde para outros status
  } else if (column === "pagamento") {
    backgroundColor = value === "pendente" ? "yellow.400" : "blue.400"; // Laranja para "pendente", azul para outros pagamentos
  }

  return (
    <Flex alignItems="center">
      {/* Bolinha colorida com borda preta */}
      <Box
        width="16px"
        height="16px"
        borderRadius="50%" // Torna o box circular
        backgroundColor={backgroundColor} // Cor da bolinha inicial
        border="3px solid black" // Borda preta ao redor da bolinha
        mr={2} // Margem direita para separar a bolinha do texto
      />
      {/* Texto em preto e sem peso extra */}
      <Text color="black">
        {value}
      </Text>
    </Flex>
  );
}
