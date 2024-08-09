import React from "react";
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
  Text,
  Box,
  Flex,
  IconButton,
  VStack,
  Link,
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { IoLogOut, IoSparklesSharp } from "react-icons/io5";
import { AvatarUser } from "./AvatarUser";
import { SearchPlate } from "../Vagas/SearchPlate";
import { AllProviders } from "../../context/AllProviders";
import { SearchInput } from "../Vagas/SearchInput";

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
        pr={"1.3rem"}
        pl={"1.3rem"}
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
        <Flex
          
          justifyContent={"center"}
          // display={{ base: "none", md: "flex" }}
          w={"15vw"} //!bug
          // bgColor={"green"}
          position={"absolute"}
          // flex={'1'}
          left={"43%"}
        >
          <SearchInput />
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

        <Box display={{ base: "none", md: "flex" }}  justifyContent={'end'} w={'100%'}>
          <VStack
            spacing={5}
            alignItems="flex-end"
            textAlign="right"
            flexDirection={"row"}
            color={"white"}
            mt={{ base: 4, md: 0 }}
            mr={"1rem"}
          >
            <NavLink 
            to="/vagas" 
            label="Vagas" 
            icon={TiLocation} />

            <NavLink
              to="/estatisticas"
              label="Estatísticas"
              icon={TiChartBarOutline}
            />
          </VStack>
        </Box>

        <AvatarUser />

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent borderRadius={"xl"} bgColor={"gray.800"}>
              <DrawerCloseButton color={"white"} />
              <DrawerHeader color={"white"}>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={5} alignItems="flex-start" w="100%">
                  <SearchInput />
                  <NavLink
                    to="/vagas"
                    label="Vagas"
                    icon={TiLocation}
                    onClick={onClose}
                    color={"white"}
                  />
                  <NavLink
                    to="/estatisticas"
                    label="Estatísticas"
                    icon={TiChartBarOutline}
                    onClick={onClose}
                    color={"white"}
                  />
                  <NavLink
                    to="/incidentes"
                    label="Incidentes"
                    icon={TiInfo}
                    onClick={onClose}
                    color={"white"}
                  />
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
        <Stack direction="row" align="center">
          <Icon
            as={icon}
            boxSize={"1.5rem"}
            color={theme.colors.highlights[100]}
          />
          <Text ml={2}>{label}</Text>
        </Stack>
      </Tooltip>
    </ChakraLink>
  );
};
