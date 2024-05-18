import { InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  WrapItem,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Icon,
  FormControl,
  FormLabel,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { useAutoUpdate } from "../../../context/AutoUpdateContext/AutoUpdateContext";
import { useAuth } from "../../../context/Auth";

export function AvatarUser() {
  const {logout} = useAuth();
  const { isAutoUpdateEnabled, toggleAutoUpdate } = useAutoUpdate();  // Usando o estado e a função do contexto

  const handleClick = () => {
  };

  const AutoUpdateToggle = () => (
    <Stack direction="row" justifyContent="end" mb={4}>
        <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-update-toggle" mb="0">
                Atualização automática:
            </FormLabel>
            <Switch
                id="auto-update-toggle"
                isChecked={isAutoUpdateEnabled}
                onChange={(event) => toggleAutoUpdate(event.target.checked)} // Pass the checked value as an argument
            />
        </FormControl>
    </Stack>
  );
  

  return (
    <WrapItem>
      <Popover placement="bottom" closeOnBlur={false}>
        <PopoverTrigger>
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </div>
        </PopoverTrigger>
        <PopoverContent color="black" bg="gray.100" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0" textAlign="center">
            Perfil
          </PopoverHeader>
          <PopoverArrow bg="gray.100" />
          <PopoverCloseButton />
          <PopoverBody>
            <Flex>
              <ButtonGroup flexDirection={"column"} gap={5}>
                <Stack direction="row" justifyContent="end">
                  <AutoUpdateToggle />
                </Stack>
                <Flex alignItems={"center"}>
                  <IconButton
                    aria-label="Ajuda"
                    icon={<InfoIcon />}
                    color={"blue"}
                    fontSize={"lg"}
                    variant="solid"
                    size="lg"
                  />
                  <div>Ajuda</div>
                </Flex>
                <Flex alignItems={"center"}>
                  <IconButton
                    aria-label="Sair"
                    icon={<IoLogOut />}
                    color={"red"}
                    fontSize={"lg"}
                    variant="solid"
                    size="lg"
                    onClick={logout}
                  />
                  <div>Sair</div>
                </Flex>
              </ButtonGroup>
            </Flex>
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          />
        </PopoverContent>
      </Popover>
    </WrapItem>
  );
}
