import React from 'react';
import { TiChartBarOutline, TiInfo, TiLocation } from "react-icons/ti";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { IoLogOut, IoSparklesSharp } from "react-icons/io5";
import { Text, Box, Flex, IconButton, Link, VStack } from "@chakra-ui/react";
import { AvatarUser } from "./AvatarUser";
import { SearchPlate } from "../Vagas/SearchPlate";
import { AllProviders } from '../../context/AllProviders';

export function NavBar() {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AllProviders>

    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="0.5rem"
      bg="gray.900"
      color="white"
      position="sticky"
      top={0}
      left={0}
      right={0}
      width="100%"
      zIndex={1}
      pr={'1.3rem'}
      pl={'1.3rem'}
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

      <Box
        display={{ base: "block", md: "none" }}
        className="hamburger"
        onClick={onOpen}
      >
        <IconButton
          aria-label="Menu"
          color={"highlights.50"}
          icon={<FaBars />}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </Box>

      <Flex w={"80%"} justifyContent={"center"} display={{ base: "none", md: "flex" }}>
        <SearchPlate />
      </Flex>

      <Box display={{ base: "none", md: "flex" }} alignItems="flex-end">
        <VStack
          spacing={5}
          alignItems="flex-end"
          textAlign="right"
          flexDirection={"row"}
          color={"white"}
          mt={{ base: 4, md: 0 }}
          mr={'1rem'}
        >
          <NavLink to="/vagas" label="Vagas" icon={TiLocation} />
          <NavLink to="/estatisticas" label="Estatísticas" icon={TiChartBarOutline} />
          <NavLink to="/incidentes" label="Incidentes" icon={TiInfo} />
        </VStack>
      </Box>

      <AvatarUser />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
        <DrawerOverlay >
          <DrawerContent borderRadius={"xl"} bgColor={'gray.900'}>
            <DrawerCloseButton />
            <DrawerHeader >Menu</DrawerHeader>
            <DrawerBody >
              <VStack spacing={5} alignItems="flex-start" w="100%">
                <SearchPlate />
                <NavLink to="/vagas" label="Vagas" icon={TiLocation} onClick={onClose} />
                <NavLink to="/estatisticas" label="Estatísticas" icon={TiChartBarOutline} onClick={onClose} />
                <NavLink to="/incidentes" label="Incidentes" icon={TiInfo} onClick={onClose} />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
    </AllProviders>

  );
}

interface NavLinkProps extends LinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}

const NavLink = ({ to, label, icon, onClick, ...props }: NavLinkProps) => {
  const theme = useTheme();
  return (

    <ChakraLink as={ReactRouterLink} to={to} onClick={onClick} {...props}>
      <Tooltip
        hasArrow
        label={label}
        bg="gray.300"
        color="black"
        placement="bottom"
      >
        <Stack align={"center"}>
          <Icon
            as={icon}
            boxSize={"1.5rem"}
            color={theme.colors.highlights[100]}
            mb={-3}
          />
        </Stack>
      </Tooltip>
    </ChakraLink>
    

  );
};
