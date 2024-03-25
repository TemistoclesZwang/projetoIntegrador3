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
import { VagasProvider } from "../../context/TableValues/VagasContext";
// import { useGet } from "../../hooks/api/useGet";

export function Dashboard() {
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
