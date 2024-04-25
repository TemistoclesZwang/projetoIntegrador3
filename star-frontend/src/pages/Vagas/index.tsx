import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
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
import { AllProviders } from "../../context/AllProviders";
import { DrawerVagas } from "../../components/Vagas/DrawerVagas";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { CombinedContextButton } from "../../context/Matrix/CombinedContext";

export function Vagas() {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<HTMLInputElement>(null);

  return (
    <AllProviders>
      <Flex
        bgColor={"blackAlpha.900"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        pl={"0.5rem"}
        pr={"1.5rem"}
        pt={"1rem"}
        pb={"1rem"}
      >
        <Box>
          <SearchPlate />
        </Box>
        <Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={onOpen}
            w={"xsm"}
          >
            Criar vaga
          </Button>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent borderRadius={"xl"}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Insira as informações:
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px"></Stack>
              <TableInput />
            </DrawerBody>
            <Matrix></Matrix>
            <DrawerFooter
              borderTopWidth="1px"
              justifyContent={"center"}
              bgColor={"gray.100"}
              gap={"1rem"}
            >
              {/* <Button colorScheme="blue">Submit</Button> */}
              <CombinedContextButton
                colorScheme="teal"
                size={"md"}
                p={"2"}
                gap={2}
                // w={"5rem"}
              >
                <AddIcon />
                Criar
              </CombinedContextButton>
              <Button
                variant="outline"
                mr={3}
                onClick={onClose}
                bgColor={"white"}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>

      <Box
        pr={3}
        pl={3}
        maxH="80vh"
        overflowY="auto"
        // bgColor={theme.colors.highlights[50]}
        // borderRadius={"md"}
        bgColor={"blackAlpha.900"}
        // p={5}
      >
        <Box minH="60vh">
          {" "}
          {/* Garantir um mínimo de altura para TableValues */}
          <TableValues />
        </Box>
      </Box>
    </AllProviders>
  );
}
