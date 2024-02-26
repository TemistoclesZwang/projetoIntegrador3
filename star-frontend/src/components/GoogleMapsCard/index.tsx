import {
  Card,
  Image,
  Box,
  Flex,
  Text,
  CardHeader,
  Heading,
  CardBody,
  useTheme,
  theme,
} from "@chakra-ui/react";
import { SimpleCard } from "../../components/SimpleCard";
import { GMaps } from "../../components/GoogleMapsApi";

export function GoogleMapsCard() {
  const theme = useTheme(); // Utilizando o hook useTheme para acessar o tema

  const handleButtonClick = () => {
    // Implement the button click functionality here
    console.log("Button clicked!");
  };
  return (
    <Card m={15}>
        
    <CardHeader m={15}>
    <Text
    textStyle={"titleSize"} // Estilo de texto personalizado
    fontSize={theme.textStyles?.titleSize}
    >
    Os melhores preços
    </Text>
    </CardHeader>
    <Flex w={"200"} align={"center"} m={15}>
      <GMaps ></GMaps>
      <Box
        display="flex"
        
        // justifyContent="center"
        // alignItems="center"
        // h="100vh"
        // w={"50%"}
        // position="absolute"
        backgroundColor={"white"}
      >
        {/* <SimpleCard
          showImage={false} // Altere para false para desativar a imagem
          imageSrc="https://via.placeholder.com/300"
          title="Example Card"
          buttonText="Click me"
          onButtonClick={handleButtonClick}
        /> */}
      </Box>
    </Flex>
    </Card>
  );
}
