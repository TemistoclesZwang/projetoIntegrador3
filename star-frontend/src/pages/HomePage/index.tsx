import React from "react";
import {
  Card,
  Image,
  Box,
  Flex,
  Text,
  useTheme,
  Link,
} from "@chakra-ui/react";
import { IoSparklesSharp } from "react-icons/io5";
// import { NavBar } from "../../components/NavBar";
import parking from "../../assets/HomePage/parking.jpg";
import { SimpleCard } from "../../components/SimpleCard";

export function HomePage() {
  const theme = useTheme();

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      <style>{`
        body {
          overflow: hidden;
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      {/* <NavBar /> */}
      <Flex bgColor={'black'} p={'1rem'}>
        <Link
          href="/home"
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none" }}
        >
          <IoSparklesSharp color={"#98FB98"} fontSize={40} />
          <Text
            textStyle={"linkSize"}
            fontSize={theme.textStyles.linkSize}
            ml={2}
            color={'white'}
          >
            Star
          </Text>
        </Link>
      </Flex>
      <Flex justify="center" alignItems="center" flex="1">
        <Card className="mainCard" m={5} h={'80vh'} w={'90%'}>
          <Box position="relative" mt={10} m={2} h={'100%'}>
            <Image
              src={parking}
              alt="Parking"
              borderRadius={"xl"}
              w={"100%"}
              h={"auto"}
              maxH={"60vh"}
              objectFit="cover"
            />
            <Text
              textStyle={"titleSize"}
              fontSize={theme.textStyles?.titleSize}
              position="absolute"
              top="-0.5%"
              left="23%"
              transform="translate(-50%, -50%)"
              color="black"
              w={"100%"}
              textAlign="center"
            >
              Gerencie, lucre, avance
            </Text>
            <Box position="absolute" top="80%" left="13%" transform="translate(-50%, -50%)">
              <SimpleCard
                showImage={true}
                imageSrc="https://via.placeholder.com/300"
                title="Descubra o que podemos fazer juntos"
                buttonText="Click me"
                onButtonClick={handleButtonClick}
              />
            </Box>
          </Box>
        </Card>
      </Flex>
    </>
  );
}
