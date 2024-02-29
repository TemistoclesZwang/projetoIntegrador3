import React from "react";
import {
  Card,
  Image,
  Box,
  Flex,
  Text,
  useTheme,
  SimpleGrid,
} from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar";
import parking from "../../assets/HomePage/parking.jpg";
import { GoogleMapsCard } from "../../components/GoogleMapsCard";
import { SimpleCard } from "../../components/SimpleCard";

export function HomePage() {
  const theme = useTheme();

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      {/* <NavBar /> */}
      <Flex justify="center" mt={10}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={1} width="100%">
          <Card className="mainCard" m={5}>
            <Box position="relative" mt={10} m={2}>
              <Image
                src={parking}
                alt="Parking"
                borderRadius={"xl"}
                w={"100%"}
                h={"80%"}
              />
              <Text
                textStyle={"titleSize"}
                fontSize={theme.textStyles?.titleSize}
                position="absolute"
                top="-1%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="black"
                w={"100%"}
              >
                Gerencie, lucre, avance
              </Text>
              <Box
              position="absolute"
              top="20%"
              // left="50%"
              // transform="translate(-50%, -50%)"
              // backgroundColor={"white"}
              // border
            >
              <SimpleCard
                showImage={true} // Altere para false para desativar a imagem
                imageSrc="https://via.placeholder.com/300"
                title="Descubra o que podemos fazer juntos"
                buttonText="Click me"
                onButtonClick={handleButtonClick}
              />
            </Box>
            </Box>
          </Card>
          <Card m={5} mb={5}>
            <Flex>
              <GoogleMapsCard />
            </Flex>
          </Card>
        </SimpleGrid>
      </Flex>
    </>
  );
}
