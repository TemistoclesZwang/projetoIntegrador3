import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
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
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      textAlign="center"
      p={4}
    >
      {showImage && (
        <Image src={imageSrc} alt={title} borderRadius={"100%"} />
      )}
      <Flex justify="space-between" mt={showImage ? 4 : 0}>
        <Text fontSize="xl" fontWeight="bold" mr={5}>
          {title}
        </Text>
        <Button backgroundColor="highlights.50" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
}

