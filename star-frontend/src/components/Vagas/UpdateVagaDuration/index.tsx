import { useState, useEffect } from "react";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

interface UpdateVagaDurationProps {
  vagaId: number;
  initialDuration?: number;
  onSuccess?: () => void;
  triggerUpdate?: boolean;
}

interface Vaga {
  vagaId: number;
  status: string;
  placa: string;
  nome: string;
  pagamento: string;
  duracao: number;
  entrada: string;
  saida: string;
  valor: string;
  vaga: string;
  incidente?: boolean;
}


export function UpdateVagaDuration({
  vagaId,
  initialDuration = 0,
  onSuccess,
  triggerUpdate = false,
}: UpdateVagaDurationProps) {
  const [inputValue, setInputValue] = useState<number>(initialDuration);

  // Usando Vaga como tipo de resposta e { field: string; value: number } como tipo de body
  const { sendRequest, isLoading } = useEndpoint<Vaga, { field: string; value: number }>(
    {
      url: `http://localhost:3000/vagas/atualiza-campo/${vagaId}`,
      method: "POST",
      body: { field: "duracao", value: inputValue },
    },
    false
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (triggerUpdate && initialDuration !== undefined) {
      setInputValue(initialDuration);
      onOpen();
    }
  }, [triggerUpdate, initialDuration, onOpen]);

  const handleSubmit = async () => {
    try {
      const response = await sendRequest();
      if (response !== undefined) {
        console.log(`Vaga ${vagaId} atualizada com sucesso!`);
        onSuccess?.();
        onClose();
      } else {
        console.error("Erro ao atualizar a vaga: Nenhuma resposta do servidor");
        onClose();
      }
    } catch (error) {
      console.error("Erro ao atualizar a vaga:", error);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualizar Duração da Vaga</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="number"
            placeholder="Insira a nova duração"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Atualizar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
