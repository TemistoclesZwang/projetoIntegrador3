import { AddIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Switch,
  Text,
  useTheme,
} from "@chakra-ui/react";

export function GlobalInput() {
  const theme = useTheme();

  return (
    <Flex justifyContent={'space-between'}>
      <Flex
        gap={5}
        direction={"row"}
        maxW={"570"}
        // mb={5}
        mt={5}
        p={5}
        backgroundColor={"gray.100"}
        borderRadius={"lg"}
      >

        <Text fontSize="lg">Quantidade de vagas por seção</Text>
        <NumberInput defaultValue={1} min={1} size="lg" maxW={20}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      
    </Flex>
  );
}
