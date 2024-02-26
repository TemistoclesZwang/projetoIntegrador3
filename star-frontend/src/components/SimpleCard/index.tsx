import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

interface CardProps {
  showImage: boolean;
  imageSrc: string;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function SimpleCard({
  showImage,
  imageSrc,
  title,
  buttonText,
  onButtonClick,
}: CardProps) {
  const isImageVisible = useBreakpointValue({ base: false, sm: true });

  return (
    <Flex 
    justify="center"
    >

    <Box
      maxW={{ base: "80%", sm: "lg" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      textAlign="center"
      backgroundColor={"white"}
      p={5}
      // ml={5}
      m={5}
      mt={{ base: "-5%", sm: "lg", md: "md" }}
    >
      {showImage && isImageVisible && (
        <Image
          src={imageSrc}
          alt={title}
          borderRadius={"100%"}
          maxH={"100px"}
        />
      )}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        mt={showImage && isImageVisible ? 4 : 0}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          mr={showImage && isImageVisible ? 5 : 0}
          mb={showImage && isImageVisible ? 0 : 3}
        >
          {title}
        </Text>
        <Button backgroundColor="highlights.50" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
    </Flex>
  );
}
