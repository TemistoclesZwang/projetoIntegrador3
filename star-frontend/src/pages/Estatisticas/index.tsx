import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  color,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import Panel from "../../components/Estatisticas/Panel";
import { MesesMaisMovimentados } from "../../components/Estatisticas/Charts/MesesMaisMovimentados";
import {PlacasMaisUsadas} from "../../components/Estatisticas/Charts/PlacasMaisUsadas";
import { useState } from "react";
import { ValorPorMes } from "../../components/Estatisticas/Charts/ValoresMensais";

export function Estatisticas() {
  const theme = useTheme();
  const [selectedChart, setSelectedChart] = useState("");

  const handleMenuClick = (chartName: string) => {
    setSelectedChart(chartName);
  };

  return (
    <Flex
      bgColor="blackAlpha.900"
      h={{ base: "2100px", md: "100vh" }}
      pt="1rem"
      justifyContent="center"
      pl="1rem"
      pr="1rem"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        gap={{ base: "0.5rem", md: "1rem" }}
        h={{ base: "auto", md: "86vh" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        overflow="hidden"
        mb={'5rem'}
      >
        <Panel title="Gráficos">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Escolha o gráfico
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleMenuClick("mesesMovimentados")}>Meses mais movimentados</MenuItem>
              <MenuItem onClick={() => handleMenuClick("tempoPermanencia")}>Tempo médio de permanência</MenuItem>
              <MenuItem onClick={() => handleMenuClick("placasFrequentes")}>Placas mais frequentes</MenuItem>
              <MenuItem onClick={() => handleMenuClick("horarioMaiorMovimento")}>Horários de maior movimento</MenuItem>
              <MenuItem onClick={() => handleMenuClick("horarioMenorMovimento")}>Horários de menor movimento</MenuItem>
            </MenuList>
          </Menu>
          {selectedChart === "mesesMovimentados" && <MesesMaisMovimentados endpoint="http://localhost:3000/vagas" />}
          {selectedChart === "placasFrequentes" && <PlacasMaisUsadas endpoint="http://localhost:3000/vagas" />}
          <ValorPorMes endpoint="http://localhost:3000/vagas" />
        </Panel>

        <Panel title="Carros" children={undefined}>
          
        </Panel>
        <Panel title="Heatmap" children={undefined}>
          
        </Panel>
      </Flex>
    </Flex>
  );
}

//gráficos
    // meses mais movimentados
    // tempo médio de permanência
    // placas mais frequentes
    // horário de maior movimento
    
    //gráfico duplo para desempenho financeiro

    //top 10 modelos de carros mais usados

    //heatmap das vagas mais usadas

// opções
    //exportar dados

