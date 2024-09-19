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
  initialDuration?: number; // Valor inicial da duração
  onSuccess?: () => void;
  triggerUpdate?: boolean;
}

export function UpdateVagaDuration({
  vagaId,
  initialDuration = 0, // Valor padrão se não for fornecido
  onSuccess,
  triggerUpdate = false,
}: UpdateVagaDurationProps) {
  const [inputValue, setInputValue] = useState<number>(initialDuration); // Inicializa com a duração atual

  const { sendRequest, isLoading } = useEndpoint<any, { field: string; value: number }>(
    {
      url: `http://localhost:3000/vagas/atualiza-campo/${vagaId}`,
      method: "POST",
      body: { field: "duracao", value: inputValue }, // Body configurado dinamicamente
    },
    false
  );

  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla a abertura e fechamento do modal

  // Efeito para abrir o modal e inicializar o valor do input quando triggerUpdate for true
  useEffect(() => {
    if (triggerUpdate && initialDuration !== undefined) {
      setInputValue(initialDuration); // Atualiza o valor do input com a duração passada
      onOpen(); // Abre o modal
    }
  }, [triggerUpdate, initialDuration, onOpen]);

  const handleSubmit = async () => {
    try {
      const response = await sendRequest(); // Envia a requisição
      if (response !== undefined) {
        console.log(`Vaga ${vagaId} atualizada com sucesso!`);
        onSuccess?.();
        onClose(); // Fecha o modal após a atualização bem-sucedida
      } else {
        console.error("Erro ao atualizar a vaga: Nenhuma resposta do servidor");
        onClose(); // Fecha o modal mesmo em caso de erro
      }
    } catch (error) {
      console.error("Erro ao atualizar a vaga:", error);
      onClose(); // Fecha o modal mesmo em caso de erro
    }
  };

  return (
    <>
      {/* Modal para o input do valor */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Duração da Vaga</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              placeholder="Insira a nova duração"
              value={inputValue} // Exibe o valor atual da duração
              onChange={(e) => setInputValue(Number(e.target.value))} // Atualiza o valor do input
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
    </>
  );
}
