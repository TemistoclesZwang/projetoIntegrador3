import { FaBars } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

import {
  Text,
  Box,
  Flex,
  IconButton,
  Link,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

// Componente da Navbar
export function NavBar() {
  const theme = useTheme(); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.900"
      color="white"
    >
      <Link href="/login">Logo</Link>
      <Spacer />
      <Box
        display={{ base: "block", md: "none" }}
        className="hamburger"
        onClick={isOpen ? onClose : onOpen}
      >
        <IconButton
          aria-label="Menu"
          color={"highlights.50"}
          icon={<FaBars />}
          bg="transparewhitent"
          _hover={{ bg: "transparent" }}
        />
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        alignItems="flex-end"
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <VStack
          spacing={4}
          alignItems="flex-end"
          textAlign={{ base: "center", md: "right" }}
          flexDirection={{ base: "column", md: "row" }}
          color={"highlights.50"}
          mt={{ base: 4, md: 0 }}
        >
          {/* Adicione aqui os itens do menu */}
          <ChakraLink as={ReactRouterLink} to="/home">
          <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
            Página 1
          </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/home">
          <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
            Página 2
          </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/home">
          <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
            Página 3
          </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/home">
          <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
            Página 4
          </Text>
          </ChakraLink>
        </VStack>
      </Box>
      {/* conteudo abaixo da navbar */}
      <Box className="content" bg="white" position="relative"></Box>
    </Flex>
  );

}
