// Estatisticas.tsx
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import Panel from "../../components/Estatisticas/Panel";
import { MesesMaisMovimentados } from "../../components/Estatisticas/Charts/MesesMaisMovimentados";
import { PlacasMaisUsadas } from "../../components/Estatisticas/Charts/PlacasMaisUsadas";
import { useState } from "react";
import { ValorPorMes } from "../../components/Estatisticas/Charts/ValoresMensais";
import { MediaTempoVaga } from "../../components/Estatisticas/Charts/MediaDeTempo";
import { HorariosDeMovimento } from "../../components/Estatisticas/Charts/HorarioMaiorMovimento";
import { DiasDaSemanaMaisUsados } from "../../components/Estatisticas/Charts/DiasDaSemana";

export function Estatisticas() {
  const theme = useTheme();
  const [selectedChart, setSelectedChart] = useState("");

  const handleMenuClick = (chartName: string) => {
    setSelectedChart(chartName);
  };
  const isSingleColumn = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      bgColor="blackAlpha.900"
      pt="1rem"
      justifyContent="center"
      pl="1rem"
      pr="1rem"
    >
      <Flex
        gap={{ base: "0.5rem", md: "1rem" }}
        flexDirection={"column"}
        align={"center"}
        overflow="hidden"
        w="70%" // Nova linha para ocupar a largura total do container pai
      >
        <Panel >
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%" // Nova linha para garantir que os gráficos ocupem a largura total
          >
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Meses Mais Movimentados</Text>
              <MesesMaisMovimentados endpoint="http://localhost:3000/vagas" />
            </Flex>
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Valor Por Mês</Text>
              <ValorPorMes endpoint="http://localhost:3000/vagas" />
            </Flex>
          </Flex>
        </Panel>

        <Panel >
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%" // Nova linha para garantir que os gráficos ocupem a largura total
          >
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Placas Mais Usadas</Text>
              <PlacasMaisUsadas endpoint="http://localhost:3000/vagas" />
            </Flex>
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Média de Tempo de Vaga</Text>
              <MediaTempoVaga endpoint="http://localhost:3000/vagas" />
            </Flex>
          </Flex>
        </Panel>

        <Panel >
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%" // Nova linha para garantir que os gráficos ocupem a largura total
          >
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Horários de Movimento</Text>
              <HorariosDeMovimento endpoint="http://localhost:3000/vagas" />
            </Flex>
            <Flex flex="1" minW="45%" flexDirection="column" alignItems="center">
              <Text mb="0.5rem">Dias da Semana Mais Usados</Text>
              <DiasDaSemanaMaisUsados endpoint="http://localhost:3000/vagas" />
            </Flex>
          </Flex>
        </Panel>
      </Flex>
    </Flex>
  );
}
