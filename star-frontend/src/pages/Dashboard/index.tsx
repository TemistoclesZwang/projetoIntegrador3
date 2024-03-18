import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { TableValues } from "../../components/Dashboard/TableValues";
import { TableInput } from "../../components/Dashboard/TableInput";
import { Matrix } from "../../components/Dashboard/Matrix";
import { MatrixProvider } from "../../context/Matrix/MatrixContext";
import { OccupiedProvider } from "../../context/Matrix/OccupiedContext";
import { TableInputProvider } from "../../context/TableInput/TableInputContext";
import { CombinedContextButton } from "../../context/Matrix/CombinedContext";
import { SearchPlate } from "../../components/Dashboard/SearchPlate";
import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { useGet } from "../../hooks/api/useGet";

export function Dashboard() {
  const theme = useTheme();
  const parkingData = [
    {
      Status: "teste",
      Placa: "ABC1D1",
      Nome: "Ana do Egito",
      Pagamento: "pago",
      Duração: "1h",
      Entrada: "02/02/2024",
      Saída: "02/02/2024",
      Valor: "10,00",
      Vaga: "B3",
    },
    {
      Status: "teste",
      Placa: "ABC1D2",
      Nome: "Aman do Egito",
      Pagamento: "pago",
      Duração: "1h",
      Entrada: "02/02/2024",
      Saída: "02/02/2024",
      Valor: "10,00",
      Vaga: "B4",
    },
    {
      Status: "teste",
      Placa: "ABC1D3",
      Nome: "Breno da Silva",
      Pagamento: "pendente",
      Duração: "2h",
      Entrada: "01/02/2024",
      Saída: "01/02/2024",
      Valor: "20,00",
      Vaga: "A1",
    },
    {
      Status: "teste",
      Placa: "ABC1D4",
      Nome: "Carla Menezes",
      Pagamento: "pago",
      Duração: "3h",
      Entrada: "03/02/2024",
      Saída: "03/02/2024",
      Valor: "30,00",
      Vaga: "C2",
    },
    {
      Status: "teste",
      Placa: "ABC1D5",
      Nome: "David Neres",
      Pagamento: "pago",
      Duração: "45min",
      Entrada: "04/02/2024",
      Saída: "04/02/2024",
      Valor: "8,00",
      Vaga: "D4",
    },
    {
      Status: "teste",
      Placa: "ABC1D6",
      Nome: "Elisa Ramos",
      Pagamento: "pendente",
      Duração: "1h30min",
      Entrada: "05/02/2024",
      Saída: "05/02/2024",
      Valor: "15,00",
      Vaga: "E3",
    },
    {
      Status: "teste",
      Placa: "ABC1D7",
      Nome: "Fábio Gomes",
      Pagamento: "pago",
      Duração: "2h",
      Entrada: "02/02/2024",
      Saída: "02/02/2024",
      Valor: "20,00",
      Vaga: "F1",
    },
    {
      Status: "teste",
      Placa: "ABC1D8",
      Nome: "Gabriela Lopes",
      Pagamento: "pago",
      Duração: "30min",
      Entrada: "06/02/2024",
      Saída: "06/02/2024",
      Valor: "5,00",
      Vaga: "G2",
    },
    {
      Status: "teste",
      Placa: "ABC1D9",
      Nome: "Hélio Castro",
      Pagamento: "pendente",
      Duração: "3h",
      Entrada: "07/02/2024",
      Saída: "07/02/2024",
      Valor: "30,00",
      Vaga: "H4",
    },
    {
      Status: "teste",
      Placa: "ABC2D0",
      Nome: "Igor Santos",
      Pagamento: "pago",
      Duração: "1h",
      Entrada: "08/02/2024",
      Saída: "08/02/2024",
      Valor: "10,00",
      Vaga: "I1",
    },
    {
      Status: "teste",
      Placa: "ABC2D1",
      Nome: "Joana Marques",
      Pagamento: "pago",
      Duração: "2h",
      Entrada: "09/02/2024",
      Saída: "09/02/2024",
      Valor: "20,00",
      Vaga: "J3",
    },
    {
      Status: "teste",
      Placa: "ABC2D2",
      Nome: "Kátia Oliveira",
      Pagamento: "pendente",
      Duração: "1h",
      Entrada: "10/02/2024",
      Saída: "10/02/2024",
      Valor: "10,00",
      Vaga: "K2",
    },
    {
      Status: "teste",
      Placa: "ABC2D3",
      Nome: "Lucas Pereira",
      Pagamento: "pago",
      Duração: "45min",
      Entrada: "11/02/2024",
      Saída: "11/02/2024",
      Valor: "8,00",
      Vaga: "L4",
    },
    {
      Status: "teste",
      Placa: "ABC2D4",
      Nome: "Márcia Freitas",
      Pagamento: "pendente",
      Duração: "2h30min",
      Entrada: "12/02/2024",
      Saída: "12/02/2024",
      Valor: "25,00",
      Vaga: "M1",
    },
    {
      Status: "teste",
      Placa: "ABC2D5",
      Nome: "Nilton Cesar",
      Pagamento: "pago",
      Duração: "3h",
      Entrada: "13/02/2024",
      Saída: "13/02/2024",
      Valor: "30,00",
      Vaga: "N3",
    },
  ];




  return (
    <>
      <MatrixProvider>
        <OccupiedProvider>
          <TableInputProvider>
            <Flex direction={"column"} m={5}>
              <Text
                textStyle={"titleSize"}
                mt={24}
                fontSize={theme.textStyles?.titleSize}
              >
                Dashboard
              </Text>
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  <Text fontSize={theme.textStyles?.linkSize}>
                    Adição de vagas
                  </Text>
                </AbsoluteCenter>
              </Box>

              <Flex
                direction={{ base: "column", md: "row" }}
                mb={5}
                justifyContent={"center"}
              >
                <TableInput></TableInput>
                {/* <GlobalInput></GlobalInput> */}

                <Matrix></Matrix>
              </Flex>
            </Flex>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                <Text fontSize={theme.textStyles?.linkSize}>
                  Vagas Ocupadas
                </Text>
              </AbsoluteCenter>
            </Box>
            <InputGroup size="md" maxW={"lg"}>
              <Input  placeholder="Buscar placa, exemplo: A234-44" />
              <InputRightElement >
                <Button
                  // h="1.75rem"
                  size="sm"
                  fontSize={"lg"}
                  rightIcon={<Search2Icon></Search2Icon>}
                ></Button>
              </InputRightElement>
            </InputGroup>
            <Flex direction={"column"} m={5}>
              <TableValues records={parkingData} />
            </Flex>
          </TableInputProvider>
        </OccupiedProvider>
      </MatrixProvider>
    </>
  );
}
