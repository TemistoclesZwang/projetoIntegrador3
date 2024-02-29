import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  useTheme,
} from "@chakra-ui/react";

export function GlobalInput() {
  const theme = useTheme();

  return (
    <Stack
      spacing={3}
      direction={"row"}
      maxW={"600"}
      // mb={5}
      mt={5}
      p={5}
      backgroundColor={"gray.100"}
      borderRadius={"md"}

    >
      <Text fontSize="lg">Duração mínima</Text>
      <Select
        bg="teal.50"
        // color="white"
        placeholder="Basic usage"
      />
      <Flex>
        <Switch colorScheme="teal" size="lg" />
      </Flex>
      <Text fontSize="lg">Quantidade de vagas</Text>
      <Select
        bg="teal.50"
        // color="white"
        placeholder="Basic usage"
      />
      <Flex>
        <Switch colorScheme="teal" size="lg" />
      </Flex>
    </Stack>
  );
}
