import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";

export function DataInput() {
  const theme = useTheme();

  return (
    <Stack
      spacing={3}
      direction={"row"}
      maxW={"900"}
      h={"100"}
      p={5}
      mb={35}
      mt={35}
      backgroundColor={"gray.100"}
    >
      <Text fontSize="lg">Nome</Text>
      <Input placeholder="Basic usage" bg={"teal.50"} color={"white"} />
      <Text fontSize="lg">Placa</Text>
      <Input placeholder="Basic usage" bg={"teal.50"} color={"white"} />
      <Text fontSize="lg">Duração</Text>
      <Select
        bg="teal.50"
        // color="white"
        placeholder="Basic usage"
      />
      <Text fontSize="lg">Vaga</Text>
      <Select
        bg="teal.50"
        // color="white"
        placeholder="Basic usage"
      />
      <Flex>
        <Button colorScheme="teal">
          <AddIcon />
        </Button>
      </Flex>
    </Stack>
  );
}
