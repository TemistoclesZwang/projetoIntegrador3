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
import { AllProviders } from "../../context/AllProviders";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import { BtnSendNewSpace } from "../../context/Matrix/CombinedContext";
import { useEndpoint } from "../../hooks/api/useEndpoint";
import { TiInfo } from "react-icons/ti";

export function Vagas() {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<HTMLInputElement>(null);
  const [isMarkingIncident, setIsMarkingIncident] = useState(false);
  const [selectedIncidents, setSelectedIncidents] = useState<number[]>([]);
  const [refreshTable, setRefreshTable] = useState(false);

  // Configure o hook useEndpoint
  const { data, error, isLoading, sendRequest } = useEndpoint<
    { message: string },
    { vagas: { vagaId: number; incidente: boolean }[] }
  >(
    {
      url: "http://localhost:3000/vagas/incidentes/update-multi-fields",
      method: "PATCH",
      body: {
        vagas: selectedIncidents.map((vagaId) => ({ vagaId, incidente: true })),
      },
    },
    false
  );

  const toggleMarkIncident = async () => {
    if (isMarkingIncident) {
      // Disparar o request usando o hook
      sendRequest();
      setSelectedIncidents([]);
    }
    setIsMarkingIncident((prevState) => !prevState);
  };

  // Efeito para lidar com a resposta do request
  useEffect(() => {
    if (data) {
      console.log("Incidentes atualizados com sucesso:", data);
      setRefreshTable(true); // Atualiza a tabela após o patch
    }
    if (error) {
      console.error("Erro ao atualizar incidentes:", error);
    }
  }, [data, error]);

  const handleRefreshTable = useCallback(() => {
    setRefreshTable(false); // Resetar a flag após a atualização
  }, []);

  return (
    <AllProviders>
      <Flex
        bgColor={"blackAlpha.900"}
        flexDirection={"row"}
        gap={"1rem"}
        justifyContent={"right"}
        pl={"0.5rem"}
        pr={"1.5rem"}
        pt={"1rem"}
        pb={"1rem"}
      >
        <Box>{/* <SearchPlate /> */}</Box>
        <Box>
          <Tooltip
            hasArrow
            label="Criar vaga"
            bg="gray.300"
            color="black"
            placement="bottom"
          >
            <Button
              bg={theme.colors.highlights[50]}
              color={"black"}
              onClick={onOpen}
              _active={{ bg: "gray.800", transform: "scale(0.95)" }}
              w={"xsm"}
              _hover={"black"}
              justifyContent="center" // Centraliza o conteúdo dentro do botão
            >
              {/* Ícone à esquerda exibido apenas em telas maiores */}
              <Box display={{ base: "none", md: "block" }}>
                <AddIcon />
              </Box>
              <Box display={{ base: "block", md: "none" }}>
                <AddIcon />
              </Box>
              <Box display={{ base: "none", md: "block" }}>Criar vaga</Box>
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
              <Stack spacing="24px" color={"gray.100"}>
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
                <Box display={{ base: "none", md: "block" }}>
                  <AddIcon />
                </Box>
                <Box display={{ base: "none", md: "block" }}>Criar</Box>
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
            label={isMarkingIncident ? "Concluir" : "Marcar incidente"}
            bg="gray.300"
            color="black"
            placement="bottom"
          >
            <Button
              size={"md"}
              bg={isMarkingIncident ? "white" : theme.colors.highlights[50]}
              color={"black"}
              onClick={toggleMarkIncident}
              _active={{ bg: "gray.800", transform: "scale(0.95)" }}
              w={"xsm"}
              _hover={"black"}
              justifyContent="center" // Centraliza o conteúdo dentro do botão
            >
              {/* Ícone à esquerda exibido apenas em telas maiores */}
              <Box display={{ base: "none", md: "block" }}>
                <TiInfo size={27} />
              </Box>
              <Box display={{ base: "block", md: "none" }}>
                <TiInfo size={27} />
              </Box>
              <Box display={{ base: "none", md: "block" }}>
                {isMarkingIncident ? "Concluir" : "Marcar incidente"}
              </Box>
            </Button>
          </Tooltip>
        </Box>
      </Flex>

      <Box
        pr={3}
        pl={3}
        overflowY="auto"
        bgColor={"blackAlpha.900"}
      >
        <Box minH="60vh">
          <TableValues
            isMarkingIncident={isMarkingIncident}
            selectedIncidents={selectedIncidents}
            setSelectedIncidents={setSelectedIncidents}
            refreshTable={refreshTable}
            onRefreshTable={handleRefreshTable}
          />
        </Box>
      </Box>
    </AllProviders>
  );
}
