import { IoSparklesSharp } from "react-icons/io5";
import {
  Card,
  Image,
  Box,
  Flex,
  Text,
  CardHeader,
  Heading,
  CardBody,
} from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar";
import parking from "../../assets/HomePage/parking.jpg";
import { SimpleCard } from "../../components/NavBar/SimpleCard";

const fontSizeResponsive = {
  base: "18px",
  sm: "37px",
  md: "50px",
  lg: "75px",
  xl: "100px",
};

export function ExampleCard() {
  const handleButtonClick = () => {
    // Implement the button click functionality here
    console.log("Button clicked!");
  };

  return (
    <Box
      display="flex"
      // justifyContent="center"
      // alignItems="center"
      // h="100vh"
      position="absolute"
      backgroundColor={"white"}
    >
      <SimpleCard
        showImage={false} // Altere para false para desativar a imagem
        imageSrc="https://via.placeholder.com/300"
        title="Example Card"
        buttonText="Click me"
        onButtonClick={handleButtonClick}
      />
    </Box>
  );
}
export function HomePage() {
  return (
    <>
      <NavBar></NavBar>

      <Card className="mainCard" position="relative">
        <CardBody position="relative" zIndex={0} overflow="hidden">
          <Flex>
            <Box position="relative" width="100%" mt={10}>
              <ExampleCard />
              <Image src={parking} alt="Parking" borderRadius={"xl"} />
              <IoSparklesSharp color={"#98FB98"} fontSize={40} />
              <Text
                fontSize={fontSizeResponsive}
                position="absolute"
                top="-1%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="black"
                w={"90%"}
              >
                Gerencie, estacione, avance
              </Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
