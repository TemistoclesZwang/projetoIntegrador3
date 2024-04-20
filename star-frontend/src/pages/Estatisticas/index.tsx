import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  color,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

export function Estatisticas() {
  const theme = useTheme();
  return (
    <Flex
      bgColor="blackAlpha.900"
      h={{ base: "2100px", md: "100vh" }}
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
        mb={'5rem'}
      >
        <Flex
          bgColor="gray.100"
          w={{ base: "100%", md: "39rem" }}
          h={{ base: "47rem", md: "37rem" }}

          alignItems={"center"}
          borderRadius={"lg"}
          flexDirection={"column"}
        >
          <Text m={"1rem"}> Gráficos</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex
          bgColor="gray.100"
          w={{ base: "100%", md: "39rem" }}
          h={{ base: "47rem", md: "37rem" }}

          borderRadius={"lg"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Text m={"1rem"}> Carros</Text>
        </Flex>

        <Flex
          bgColor="gray.100"
          w={{ base: "100%", md: "39rem" }}
          h={{ base: "47rem", md: "37rem" }}

          borderRadius={"lg"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Text m={"1rem"}> Heatmap</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
