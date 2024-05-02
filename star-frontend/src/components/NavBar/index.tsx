import { TiChartBarOutline } from "react-icons/ti";
import { TiInfo } from "react-icons/ti";
import { TiLocation } from "react-icons/ti";
import { FaBars } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Link as ChakraLink,
  Icon,
  LinkProps,
  Stack,
  Tooltip,
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
import { SearchPlate } from "../Vagas/SearchPlate";

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
      position="sticky" // Fixa a navbar no topo
      top={0} // Define o topo da navbar
      left={0} // Alinha a navbar à esquerda
      right={0} // Alinha a navbar à direita
      width="100%" // Garante que a navbar ocupe a largura total
      zIndex={1} // Garante que a navbar fique acima dos outros elementos
      // mb={10}
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
      <Flex w={'80%'} justifyContent={'center'} >
      {/* <SearchPlate></SearchPlate> */}
      </Flex>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        alignItems="flex-end"
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <VStack
          spacing={5}
          alignItems="flex-end"
          textAlign={{ base: "center", md: "right" }}
          flexDirection={"row"}
          color={"white"}
          mt={{ base: 4, md: 0 }}
          
        >
          <ChakraLink as={ReactRouterLink} to="/vagas">
          <Tooltip hasArrow label='vagas' bg='gray.300' color='black' placement="bottom">
            {/* <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}> */}
            {/* Vagas */}
            {/* </Text> */}
            <Stack align={"center"}>
              <Icon
                as={TiLocation}
                boxSize={"1.5rem"}
                color={theme.colors.highlights[100]}
                mb={-3}
              />
              {/* <Text fontSize={"sm"}>Incidentes</Text> */}
            </Stack>
              </Tooltip>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/estatisticas">
          <Tooltip hasArrow label='estatísticas' bg='gray.300' color='black' placement="bottom">

            {/* <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}> */}
            {/* Estatísticas */}
            {/* </Text> */}
            <Stack align={"center"}>
              <Icon
                as={TiChartBarOutline}
                boxSize={"1.5rem"}
                color={theme.colors.highlights[100]}
                mb={-3}
              />
              {/* <Text fontSize={"sm"}>Incidentes</Text> */}
            </Stack>
            </Tooltip>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/incidentes">
          <Tooltip hasArrow label='incidentes' bg='gray.300' color='black' placement="bottom">

            {/* <Text textStyle={"linkSize"} fontSize={theme.textStyles.linkSize}> */}
            {/* Incidentes */}
            {/* </Text> */}
            <Stack align={"center"}>
              <Icon
                as={TiInfo}
                boxSize={"1.5rem"}
                color={theme.colors.highlights[100]}
                mb={-3}
              />
              {/* <Text fontSize={"sm"}>Incidentes</Text> */}
            </Stack>
            </Tooltip>
          </ChakraLink>
        </VStack>
      </Box>
      
      <AvatarUser />
    </Flex>
  );
}
