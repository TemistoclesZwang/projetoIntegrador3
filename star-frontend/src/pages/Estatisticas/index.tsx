import { AbsoluteCenter, Center, color, Flex, Text } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

export function Estatisticas() {
  const theme = useTheme();
  return (
 <Flex
      bgColor="blackAlpha.900"
      h="100vh"
      pt="1rem"
      justifyContent="center"
    //   w="100vw"
      pl="1rem"
      pr="1rem"
    //   overflow="auto"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        gap={{ base: "0.5rem", md: "1rem" }} // Define o gap responsivamente
        h={{ base: "auto", md: "86vh" }}
        flexDirection={{ base: "column", md: "row" }}
        // maxW="10vw"
        alignItems="center"
        overflow="hidden"

      >
        <Flex bgColor="gray.100" w={{ base: "100%", md: "29rem" }} h="38rem"></Flex>
        <Flex bgColor="gray.100" w={{ base: "100%", md: "29rem" }} h="38rem"></Flex>
        <Flex bgColor="gray.100" w={{ base: "100%", md: "29rem" }} h="38rem"></Flex>
      </Flex>
    </Flex>
  );
}
