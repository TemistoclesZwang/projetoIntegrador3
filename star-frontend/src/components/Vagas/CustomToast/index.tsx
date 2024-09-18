import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface CustomToastProps {
  title: string; // Título do toast
  description: string; // Descrição do toast
  status: "info" | "warning" | "success" | "error"; // Tipo do toast (sucesso, erro, etc)
  duration?: number; // Duração opcional (padrão: 3000ms)
  isClosable?: boolean; // Se o toast pode ser fechado manualmente (padrão: true)
  trigger: boolean; // Define quando o toast deve ser disparado
}

export const CustomToast = ({
  title,
  description,
  status,
  duration = 3000,
  isClosable = true,
  trigger,
}: CustomToastProps) => {
  const toast = useToast();

  // Exibe o toast quando o trigger é true
  useEffect(() => {
    if (trigger) {
      toast({
        title,
        description,
        status,
        duration,
        isClosable,
      });
    }
  }, [trigger, title, description, status, duration, isClosable, toast]);

  return null; // Não retorna nenhum elemento visual, só dispara o toast
};
