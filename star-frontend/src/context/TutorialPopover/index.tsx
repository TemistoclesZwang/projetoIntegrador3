import React, { createContext, useContext, useState, ReactNode } from "react";

// Definição das etapas do tutorial
interface TutorialStep {
  elementId: string;
  message: string;
  order: number;
}

// Contexto do Tutorial
interface TutorialContextType {
  steps: TutorialStep[];
  currentStep: number;
  addSteps: (newSteps: TutorialStep[]) => void;
  goToNextStep: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Provedor do contexto do Tutorial
// Provedor do contexto do Tutorial
// Provedor do contexto do Tutorial
export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // Gerenciar qual passo está ativo

  const addSteps = (newSteps: TutorialStep[]) => {
    setSteps((prevSteps) => {
      // Verifica se já existe algum passo com o mesmo `order` e `elementId`
      const uniqueSteps = newSteps.filter(
        (newStep) => !prevSteps.some(
          (prevStep) => prevStep.elementId === newStep.elementId || prevStep.order === newStep.order
        )
      );
      return [...prevSteps, ...uniqueSteps].sort((a, b) => a.order - b.order);
    });
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <TutorialContext.Provider value={{ steps, currentStep, addSteps, goToNextStep }}>
      {children}
    </TutorialContext.Provider>
  );
};


// Hook para acessar o contexto do Tutorial
export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
};
