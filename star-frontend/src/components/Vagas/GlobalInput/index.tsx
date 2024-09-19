import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

export function GlobalInput() {

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
