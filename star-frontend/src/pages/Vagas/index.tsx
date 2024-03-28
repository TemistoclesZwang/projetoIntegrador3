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
            <Flex direction={"column"} m={5}>
              <Text
                textStyle={"titleSize"}
                mt={24}
                fontSize={theme.textStyles?.titleSize}
              >
                Vagas
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
            <SearchPlate></SearchPlate>
            <Flex direction={"column"} m={5}>
              <TableValues/>
            </Flex>
          </TableInputProvider>
        </OccupiedProvider>
      </MatrixProvider>
      </VagasProvider>
    </>
  );
}
