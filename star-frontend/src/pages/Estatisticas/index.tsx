// Estatisticas.tsx
import React, { useState } from "react";
import { Box, Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Panel from "../../components/Estatisticas/Panel";
import { MesesMaisMovimentados } from "../../components/Estatisticas/Charts/MesesMaisMovimentados";
import { PlacasMaisUsadas } from "../../components/Estatisticas/Charts/PlacasMaisUsadas";
import { ValorPorMes } from "../../components/Estatisticas/Charts/ValoresMensais";
import { MediaTempoVaga } from "../../components/Estatisticas/Charts/MediaDeTempo";
import { HorariosDeMovimento } from "../../components/Estatisticas/Charts/HorarioMaiorMovimento";
import { DiasDaSemanaMaisUsados } from "../../components/Estatisticas/Charts/DiasDaSemana";
import { ExportAllCSVButton } from "../../components/Estatisticas/BtnExportacao";

export function Estatisticas() {
  const [dataDiasSemana, setDataDiasSemana] = useState<Record<string, number>>({});
  const [dataPlacas, setDataPlacas] = useState<Record<string, number>>({});
  const [dataHorarios, setDataHorarios] = useState<Record<string, number>>({});
  const [dataValorPorMes, setDataValorPorMes] = useState<Record<string, number>>({});
  const [dataMediaTempoVaga, setDataMediaTempoVaga] = useState<Record<string, number>>({});
  const [dataMesesMaisMovimentados, setDataMesesMaisMovimentados] = useState<Record<string, number>>({}); // Novo estado

  const datasets = {
    "Dias da Semana": dataDiasSemana,
    "Placas Mais Usadas": dataPlacas,
    "Horários de Movimento": dataHorarios,
    "Valor por Mês": dataValorPorMes,
    "Média de Tempo por Vaga": dataMediaTempoVaga,
    "Meses Mais Movimentados": dataMesesMaisMovimentados, // Adiciona o novo estado
  };

  const isSingleColumn = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      bgColor="blackAlpha.900"
      pt="1rem"
      justifyContent="center"
      pl="1rem"
      pr="1rem"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        gap={{ base: "0.5rem", md: "1rem" }}
        flexDirection={"column"}
        align={"center"}
        overflow="hidden"
        w="70%"
      >
        <Panel>
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%"
          >
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Meses Mais Movimentados</Text>
              <MesesMaisMovimentados endpoint="http://localhost:3000/vagas" onDataUpdate={setDataMesesMaisMovimentados}/> 
            </Flex>
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Valor Por Mês</Text>
              <ValorPorMes endpoint="http://localhost:3000/vagas" onDataUpdate={setDataValorPorMes} />
            </Flex>
          </Flex>
        </Panel>

        <Panel>
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%"
          >
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Placas Mais Usadas</Text>
              <PlacasMaisUsadas endpoint="http://localhost:3000/vagas" onDataUpdate={setDataPlacas} />
            </Flex>
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Média de Tempo de Vaga</Text>
              <MediaTempoVaga endpoint="http://localhost:3000/vagas" onDataUpdate={setDataMediaTempoVaga} />
            </Flex>
          </Flex>
        </Panel>

        <Panel>
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDirection={isSingleColumn ? "column" : "row"}
            gap="1rem"
            w="100%"
          >
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Horários de Movimento</Text>
              <HorariosDeMovimento endpoint="http://localhost:3000/vagas" onDataUpdate={setDataHorarios} />
            </Flex>
            <Flex
              flex="1"
              minW="45%"
              flexDirection="column"
              alignItems="center"
            >
              <Text mb="0.5rem">Dias da Semana Mais Usados</Text>
              <DiasDaSemanaMaisUsados
                endpoint="http://localhost:3000/vagas"
                onDataUpdate={setDataDiasSemana}
              />
            </Flex>
          </Flex>
        </Panel>
      </Flex>

      <ExportAllCSVButton datasets={datasets} filename="estatisticas_completas" />
    </Flex>
  );
}
