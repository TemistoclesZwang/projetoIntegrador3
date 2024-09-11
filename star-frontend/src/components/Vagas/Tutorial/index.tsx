import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useTutorial } from "../../../context/TutorialPopover";

export function TutorialPopover() {
  const { steps, currentStep, goToNextStep } = useTutorial();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isTargetReady, setIsTargetReady] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  
  const maxRetries = 10; // Aumenta o número de tentativas
  let retries = 0;

  // Função para verificar se o alvo da etapa atual está disponível no DOM
  const checkAndSetTarget = () => {
    const currentElement = document.getElementById(steps[currentStep]?.elementId);

    // Adicionando um log detalhado do estado do elemento
    if (currentElement && !tutorialCompleted) {
      console.log(`Elemento alvo encontrado para o passo ${currentStep + 1}`);
      targetRef.current = currentElement as HTMLDivElement;
      currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsTargetReady(true);
      setTimeout(onOpen, 300); // Atraso para garantir a transição suave
    } else {
      console.log(`Elemento alvo não encontrado para o passo ${currentStep + 1}, tentativa ${retries}`);
      setIsTargetReady(false);
      if (retries < maxRetries) {
        retries++;
        setTimeout(checkAndSetTarget, 500); // Repetir a verificação após um tempo
      } else {
        console.error(`Falha ao encontrar o elemento após ${maxRetries} tentativas para o passo ${currentStep + 1}.`);
        // Ação alternativa se o elemento não for encontrado
        alert(`O elemento para o passo ${currentStep + 1} não foi encontrado. Verifique se ele está sendo renderizado corretamente.`);
      }
    }
  };

  useEffect(() => {
    if (!steps.length || tutorialCompleted) return;

    // Sempre tenta encontrar o alvo quando a etapa mudar
    checkAndSetTarget();

    return () => {
      retries = 0; // Reseta as tentativas ao sair do efeito
    };
  }, [currentStep, steps, tutorialCompleted]);

  const handleNextStep = () => {
    onClose(); // Fecha o popover atual
  
    if (currentStep === steps.length - 1) {
      setIsTargetReady(false);
      setTutorialCompleted(true);
    } else {
      goToNextStep();
      setIsTargetReady(false);
      retries = 0; // Reseta o número de tentativas para o próximo passo
      checkAndSetTarget(); // Verifica o alvo do próximo passo
    }
  };

  return (
    <Box>
      {!tutorialCompleted && isTargetReady && targetRef.current && (
        <Popover
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={false}
        >
          <PopoverAnchor>
            <Box ref={targetRef} />
          </PopoverAnchor>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Passo {steps[currentStep]?.order}</PopoverHeader>
            <PopoverBody>{steps[currentStep]?.message}</PopoverBody>
            <PopoverFooter>
              <Button size="sm" onClick={handleNextStep}>
                {currentStep === steps.length - 1 ? "Concluir" : "Próximo"}
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )}
    </Box>
  );
}
