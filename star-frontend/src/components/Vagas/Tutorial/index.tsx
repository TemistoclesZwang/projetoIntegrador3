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
  const [tutorialCompleted, setTutorialCompleted] = useState(false); // Controle para saber se o tutorial foi finalizado

  // Função para verificar se o alvo da etapa atual está disponível no DOM
  const checkAndSetTarget = () => {
    const currentElement = document.getElementById(steps[currentStep]?.elementId);

    if (currentElement && !tutorialCompleted) {
      targetRef.current = currentElement as HTMLDivElement;
      currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsTargetReady(true); // Marca que o alvo está pronto
      setTimeout(onOpen, 300); // Atraso para garantir a transição suave
    } else {
      setIsTargetReady(false);
    }
  };

  useEffect(() => {
    let observer: MutationObserver | undefined;

    if (!steps.length || tutorialCompleted) return; // Se não houver etapas ou o tutorial foi concluído, não continua

    // Observa mudanças no DOM para detectar quando o elemento alvo estiver disponível
    observer = new MutationObserver(() => {
      checkAndSetTarget();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Verifica se o alvo já está no DOM
    checkAndSetTarget();

    return () => {
      if (observer) observer.disconnect();
    };
  }, [currentStep, steps, tutorialCompleted]);

  // UseEffect para garantir que o popover abra após o próximo passo ser definido
  useEffect(() => {
    if (isTargetReady && !tutorialCompleted) {
      setTimeout(onOpen, 300);
    }
  }, [isTargetReady, onOpen, tutorialCompleted]);

  const handleNextStep = () => {
    onClose(); // Fecha o popover atual

    // Verifica se é o último passo
    if (currentStep === steps.length - 1) {
      // Último passo, fecha o tutorial
      setIsTargetReady(false); // Desativa o estado de alvo pronto
      setTutorialCompleted(true); // Marca o tutorial como concluído
    } else {
      // Vai para o próximo passo normalmente
      setTimeout(() => {
        goToNextStep(); // Vai para o próximo passo
        setIsTargetReady(false); // Reinicia o estado do alvo
      }, 300); // Pequeno atraso para garantir a transição suave
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
