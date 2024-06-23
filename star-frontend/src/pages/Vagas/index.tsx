import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Tooltip,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { TableValues } from "../../components/Vagas/TableValues";
import { TableInput } from "../../components/Vagas/TableInput";
import { Matrix } from "../../components/Vagas/Matrix";
import { SearchPlate } from "../../components/Vagas/SearchPlate";
import { AllProviders } from "../../context/AllProviders";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { BtnSendNewSpace } from "../../context/Matrix/CombinedContext";

export function Vagas() {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<HTMLInputElement>(null);

  return (
    <AllProviders>
      <Flex
        bgColor={"blackAlpha.900"}
        flexDirection={"row"}
        gap={'1rem'}
        justifyContent={"right"}
        pl={"0.5rem"}
        pr={"1.5rem"}
        pt={"1rem"}
        pb={"1rem"}
        // h={'1vh'}
      >
        <Box>{/* <SearchPlate /> */}</Box>
        {/* <SearchPlate></SearchPlate> */}
        <Box>
          <Tooltip
            hasArrow
            label="Criar vaga"
            bg="gray.300"
            color="black"
            placement="bottom"
          >
            <Button
              leftIcon={<AddIcon />}
              // colorScheme="teal"
              bg={theme.colors.highlights[50]}
              color={"black"}
              onClick={onOpen}
              _active={{ bg: "gray.800", transform: "scale(0.95)" }}
              w={"xsm"}
              _hover={"black"}
            >
              Criar vaga
            </Button>
          </Tooltip>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent borderRadius={"xl"} bgColor={"gray.800"}>
            <DrawerCloseButton color={"white"} />
            <DrawerHeader borderBottomWidth="1px" color={"white"}>
              Insira as informações:
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px" color={"gray.300"}>
                <TableInput />
              </Stack>
            </DrawerBody>
            <Matrix />
            <DrawerFooter
              borderTopWidth="1px"
              justifyContent={"center"}
              bgColor={"gray.800"}
              gap={"1rem"}
            >
              <BtnSendNewSpace
                colorScheme="teal"
                size={"md"}
                p={"2"}
                gap={2}
                onClose={onClose}
              >
                <AddIcon />
                Criar
              </BtnSendNewSpace>
              <Button
                variant="outline"
                mr={3}
                onClick={onClose}
                bgColor={"gray.700"}
                color={"white"}
              >
                Cancelar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Box>
          <Tooltip
            hasArrow
            label="Marcar incidente"
            bg="gray.300"
            color="black"
            placement="bottom"
          >
            <Button
              leftIcon={<AddIcon />}
              // colorScheme="teal"
              bg={theme.colors.highlights[50]}
              color={"black"}
              onClick={onOpen}
              _active={{ bg: "gray.800", transform: "scale(0.95)" }}
              w={"xsm"}
              _hover={"black"}
            >
              Marcar incidente
            </Button>
          </Tooltip>
        </Box>
      </Flex>

      <Box
        pr={3}
        pl={3}
        // maxH="80vh"
        h={"100vh"}
        overflowY="auto"
        // bgColor={theme.colors.highlights[50]}
        // borderRadius={"md"}
        bgColor={"blackAlpha.900"}
        // p={5}
      >
        <Box minH="60vh">
          {/* {" "} */}
          {/* Garantir um mínimo de altura para TableValues */}
          <TableValues />
        </Box>
      </Box>
    </AllProviders>
  );
}
