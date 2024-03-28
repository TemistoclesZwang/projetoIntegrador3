import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useTheme,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Badge,
  Box,
} from "@chakra-ui/react";
import { DisableInput } from "../Matrix/DisableInputs";
import { useTableInput } from "../../../context/TableInput/TableInputContext";
import { CombinedContextButton } from "../../../context/Matrix/CombinedContext";

export function TableInput() {
  const {
    name,
    plate,
    durationHours,
    durationMinutes,
    setName,
    setPlate,
    setDurationHours,
    setDurationMinutes,
    // handleSubmitTableInputContext,
  } = useTableInput();
  // const theme = useTheme();
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  // function handleButtonClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <Flex
      gap={5}
      direction={"column"}
      maxW={"1300"}
      borderRadius={"lg"}
      p={5}
      mb={35}
      mt={5}
      backgroundColor={"gray.100"}
    >
      <Text fontSize="lg">Nome</Text>
      <Input
        placeholder="Digite o nome"
        bg={"teal.50"}
        color={"white"}
        maxW={"80"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Text fontSize="lg">Placa</Text>
      <Input
        placeholder="Digite a placa"
        bg={"teal.50"}
        color={"white"}
        maxW={"80"}
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <Flex gap={5} direction={"row"}>
        <Text fontSize="lg">Duração</Text>
        <NumberInput
          value={durationHours}
          onChange={(valueString) => setDurationHours(parseInt(valueString))}
          min={0}
          max={23}
          size="md"
          maxW={20}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput
          value={durationMinutes}
          onChange={(valueString) => setDurationMinutes(parseInt(valueString))}
          min={0}
          max={59}
          size="md"
          maxW={20}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <DisableInput></DisableInput>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2} justifyContent={'center'}>
      Status:
      <Badge borderRadius={'lg'} variant='solid' colorScheme='gray'>Ocupado</Badge>
      Entrada:
      <Badge borderRadius={'lg'} variant='solid' colorScheme='gray'>{date}</Badge>
      </Flex>
      <Flex flexDirection={'row'}  alignItems={'center'} justifyContent={'space-between'} gap={3}>
      <Box>
      Valor:
      <Badge fontSize={'md'} borderRadius={'lg'} variant='solid' colorScheme='green' ml={2}>R$23,00</Badge>
      </Box>
      <CombinedContextButton colorScheme="teal" size={'lg'} p={'2'} gap={2}>
        Add
        <AddIcon />
      </CombinedContextButton>
      </Flex>
    </Flex>
  );
}
