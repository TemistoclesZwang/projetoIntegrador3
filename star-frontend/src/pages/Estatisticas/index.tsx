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
// import BarChart, { LineChart } from "../../components/Estatisticas/Charts";
// import BarChartMeu from "../../components/Estatisticas/Charts";
import Panel from "../../components/Estatisticas/Panel";
import { LineChart } from "../../components/Estatisticas/Charts";
import { LineChart2 } from "../../components/Estatisticas/Charts/Meses_mais_movimentados";

export function Estatisticas() {
  const theme = useTheme();
  return (
    <Flex
      bgColor="blackAlpha.900"
      h={{ base: "2100px", md: "100vh" }}
      pt="1rem"
      justifyContent="center"
      //   w="100vw"
      pl="1rem"
      pr="1rem"
      //   overflow="auto"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        gap={{ base: "0.5rem", md: "1rem" }} // Define o gap responsivamente
        h={{ base: "auto", md: "86vh" }}
        flexDirection={{ base: "column", md: "row" }}
        // maxW="10vw"
        alignItems="center"
        overflow="hidden"
        mb={'5rem'}
      >
        {/* <Flex */}
        <Panel title="Gráficos">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Escolha o gráfico
            </MenuButton>
            <MenuList>
              <MenuItem>Meses mais movimentados</MenuItem>
              <MenuItem>Tempo médio de permanência</MenuItem>
              <MenuItem>Placas mais frequentes</MenuItem>
              <MenuItem>Horários de maior movimento</MenuItem>
              <MenuItem>Horários de menor movimento</MenuItem>
            </MenuList>
          </Menu>
          <LineChart2 endpoint={"http://localhost:3000/vagas"} ></LineChart2>
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

