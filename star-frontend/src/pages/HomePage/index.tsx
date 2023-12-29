import { IoSparklesSharp } from "react-icons/io5";
import { Image, Box, Flex, Text } from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar";
import parking from "../../assets/HomePage/parking.jpg";

 const fontSizeResponsive={  base: "20px",
  sm: "40px",
  md: "50px",
  lg: "80px",
  xl: "100px",
}
export function HomePage() {
  return (
    <>
      <NavBar></NavBar>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        // bg="gray.50"
        color="white"
        height={"100vh"}
      >
        <Box
          className="content"
          w="100%"
          h="100%"
          bg="white"
          position="relative"
        >
          <Box position="relative" textAlign="start" mt={10}>
            <Image
              boxSize="100%"
              height={"50%"}
              src={parking}
              alt="Dan Abramov"
              borderRadius={"xl"}
              objectFit={"cover"}
            />
            <Box
              position="absolute"
              top="-0.01%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="100%"
            >
              <Flex alignItems="center" justifyContent="start">
                <IoSparklesSharp
                  
                  color={"#98FB98"}
                  //modifique o tamanho do icone aumente 
                  style={{ fontSize: fontSizeResponsive} }
                />
                <Text
                  fontSize={fontSizeResponsive}
                  color={"black"}
                  // fontSize={"100px"}
                  // mt={-9}
                >
                  Gerencie, estacione, avance
                  {/* <Text fontSize={30} color={"white"} ml={10}>
                    {" "}
                    Impulsione seu faturamento aaaaaaaaaaaa
                  </Text> */}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
