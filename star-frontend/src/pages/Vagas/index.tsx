import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { TableValues } from "../../components/Vagas/TableValues";
import { TableInput } from "../../components/Vagas/TableInput";
import { Matrix } from "../../components/Vagas/Matrix";
import { MatrixProvider } from "../../context/Matrix/MatrixContext";
import { OccupiedProvider } from "../../context/Matrix/OccupiedContext";
import { TableInputProvider } from "../../context/TableInput/TableInputContext";
import { SearchPlate } from "../../components/Vagas/SearchPlate";
import { VagasProvider } from "../../context/TableValues/VagasContext";

export function Vagas() {
  const theme = useTheme();
  return (
    <>
      <VagasProvider>
        <MatrixProvider>
          <OccupiedProvider>
            <TableInputProvider>
              <Flex direction={"column"} bgColor={'blackAlpha.900'} w={'100%'}>
                {/* <Text
                  textStyle={"titleSize"}
                  mt={24}
                  fontSize={theme.textStyles?.titleSize}
                >
                  Vagas
                </Text> */}
                <Box position="relative" padding="10" mt={10}>
                  <Divider />
                  <AbsoluteCenter bg="white" px="4">
                    <Text fontSize={theme.textStyles?.linkSize}>
                      Adição de vagas
                    </Text>
                  </AbsoluteCenter>
                </Box>
                <Flex
                  direction={{ base: "column", md: "row" }} // Mantém a direção atual
                  mb={5}
                  // alignItems="center" // Assegura o alinhamento vertical ao centro
                  justifyContent="center" // Centraliza os itens horizontalmente em todas as situações
                  // alignContent={'center'}
                  ml={{ base: "auto", md: "28" }}
                  // w="full" // Garante que o Flex ocupe toda a largura disponível
                >
                  <TableInput />
                  {/* Para garantir que os itens tenham espaçamento uniforme entre eles e estejam centralizados, 
  você pode envolver cada um em seu próprio Box ou Flex com padding/margin conforme necessário */}
                  <Box px={{ base: "0", md: "4" }}>
                    {" "}
                    {/* Adiciona um espaçamento horizontal somente em telas md e acima */}
                    <Matrix />
                  </Box>
                </Flex>
              </Flex>
              <Box position="relative" padding="10" bgColor={'blackAlpha.800'}>
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  <Text fontSize={theme.textStyles?.linkSize}>
                    Vagas Ocupadas
                  </Text>
                </AbsoluteCenter>
              </Box>
              <Box
                m={5}
                maxH="80vh"
                overflowY="auto"
                // bgColor={theme.colors.highlights[50]}
                borderRadius={"md"}
                bgColor={'blackAlpha.800'}
                // p={5}
              >
                <SearchPlate />
                <Box minH="60vh">
                  {" "}
                  {/* Garantir um mínimo de altura para TableValues */}
                  <TableValues />
                </Box>
              </Box>
            </TableInputProvider>
          </OccupiedProvider>
        </MatrixProvider>
      </VagasProvider>
    </>
  );
}
