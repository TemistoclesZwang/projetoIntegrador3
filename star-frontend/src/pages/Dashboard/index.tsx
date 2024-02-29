import {
  Card,
  Flex,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { TableValues } from "../../components/Dashboard/TableValues";
import { Data } from "@react-google-maps/api";
import { DataInput } from "../../components/Dashboard/DataInput";
import { GlobalInput } from "../../components/Dashboard/GlobalInput";

export function Dashboard() {
  const theme = useTheme();
  const parkingData = [
      {
          Placa: "ABC1D1",
          Nome: "Ana do Egito",
          Status: "pago",
          Duração: "1h",
          Entrada: "02/02/2024",
          Saída: "02/02/2024",
          Valor: "R$ 10,00",
          Vaga: "B3"
      },
      {
          Placa: "ABC1D2",
          Nome: "Aman do Egito",
          Status: "pago",
          Duração: "1h",
          Entrada: "02/02/2024",
          Saída: "02/02/2024",
          Valor: "R$ 10,00",
          Vaga: "B4"
      },
      {
          Placa: "ABC1D3",
          Nome: "Breno da Silva",
          Status: "pendente",
          Duração: "2h",
          Entrada: "01/02/2024",
          Saída: "01/02/2024",
          Valor: "R$ 20,00",
          Vaga: "A1"
      },
      {
          Placa: "ABC1D4",
          Nome: "Carla Menezes",
          Status: "pago",
          Duração: "3h",
          Entrada: "03/02/2024",
          Saída: "03/02/2024",
          Valor: "R$ 30,00",
          Vaga: "C2"
      },
      {
          Placa: "ABC1D5",
          Nome: "David Neres",
          Status: "pago",
          Duração: "45min",
          Entrada: "04/02/2024",
          Saída: "04/02/2024",
          Valor: "R$ 8,00",
          Vaga: "D4"
      },
      {
          Placa: "ABC1D6",
          Nome: "Elisa Ramos",
          Status: "pendente",
          Duração: "1h30min",
          Entrada: "05/02/2024",
          Saída: "05/02/2024",
          Valor: "R$ 15,00",
          Vaga: "E3"
      },
      {
          Placa: "ABC1D7",
          Nome: "Fábio Gomes",
          Status: "pago",
          Duração: "2h",
          Entrada: "02/02/2024",
          Saída: "02/02/2024",
          Valor: "R$ 20,00",
          Vaga: "F1"
      },
      {
          Placa: "ABC1D8",
          Nome: "Gabriela Lopes",
          Status: "pago",
          Duração: "30min",
          Entrada: "06/02/2024",
          Saída: "06/02/2024",
          Valor: "R$ 5,00",
          Vaga: "G2"
      },
      {
          Placa: "ABC1D9",
          Nome: "Hélio Castro",
          Status: "pendente",
          Duração: "3h",
          Entrada: "07/02/2024",
          Saída: "07/02/2024",
          Valor: "R$ 30,00",
          Vaga: "H4"
      },
      {
          Placa: "ABC2D0",
          Nome: "Igor Santos",
          Status: "pago",
          Duração: "1h",
          Entrada: "08/02/2024",
          Saída: "08/02/2024",
          Valor: "R$ 10,00",
          Vaga: "I1"
      },
      {
          Placa: "ABC2D1",
          Nome: "Joana Marques",
          Status: "pago",
          Duração: "2h",
          Entrada: "09/02/2024",
          Saída: "09/02/2024",
          Valor: "R$ 20,00",
          Vaga: "J3"
      },
      {
          Placa: "ABC2D2",
          Nome: "Kátia Oliveira",
          Status: "pendente",
          Duração: "1h",
          Entrada: "10/02/2024",
          Saída: "10/02/2024",
          Valor: "R$ 10,00",
          Vaga: "K2"
      },
      {
          Placa: "ABC2D3",
          Nome: "Lucas Pereira",
          Status: "pago",
          Duração: "45min",
          Entrada: "11/02/2024",
          Saída: "11/02/2024",
          Valor: "R$ 8,00",
          Vaga: "L4"
      },
      {
          Placa: "ABC2D4",
          Nome: "Márcia Freitas",
          Status: "pendente",
          Duração: "2h30min",
          Entrada: "12/02/2024",
          Saída: "12/02/2024",
          Valor: "R$ 25,00",
          Vaga: "M1"
      },
      {
          Placa: "ABC2D5",
          Nome: "Nilton Cesar",
          Status: "pago",
          Duração: "3h",
          Entrada: "13/02/2024",
          Saída: "13/02/2024",
          Valor: "R$ 30,00",
          Vaga: "N3"
      }
  ];
  
    //. receber do banco de dados

  return (
    <Flex direction={"column"} m={5} >
      <Text
        textStyle={"titleSize"}
        fontSize={theme.textStyles?.titleSize}
      >
        Dashboard
      </Text>
      {/* transformar em compomenten titulo */}
      <Flex direction={"column"} mb={5}>
      <GlobalInput></GlobalInput>
      <DataInput></DataInput>
      </Flex>
      <TableValues records={parkingData} />
    </Flex>
  );
}
