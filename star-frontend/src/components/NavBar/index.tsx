import { FaBars } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Link as ChakraLink,
  LinkProps,
  WrapItem,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { IoLogOut, IoSparklesSharp } from "react-icons/io5";

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
import { InfoIcon } from "@chakra-ui/icons";
import { AvatarUser } from "./AvatarUser";

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
      padding="0.5rem"
      bg="gray.900"
      color="white"
      position="fixed" // Fixa a navbar no topo
      top={0} // Define o topo da navbar
      left={0} // Alinha a navbar à esquerda
      right={0} // Alinha a navbar à direita
      width="100%" // Garante que a navbar ocupe a largura total
      zIndex={1} // Garante que a navbar fique acima dos outros elementos
      mb={10}
      
    >
      <Flex>
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
          >
            Star
          </Text>
        </Link>
      </Flex>
      {/* <Spacer /> */}
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
          spacing={8}
          alignItems="flex-end"
          textAlign={{ base: "center", md: "right" }}
          flexDirection={{ base: "column", md: "row" }}
          color={"white"}
          mt={{ base: 4, md: 0 }}
        >
          <ChakraLink as={ReactRouterLink} to="/vagas">
            <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
              Vagas
            </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/estatistica">
            <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
              Estatísticas
            </Text>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/incidentes">
            <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}>
              Incidentes
            </Text>
          </ChakraLink>
        </VStack>
      </Box>
      {/* conteudo abaixo da navbar */}
      {/* <Box className="content" bg="white" position="relative"></Box> */}
          <AvatarUser />
    </Flex>
  );
}
