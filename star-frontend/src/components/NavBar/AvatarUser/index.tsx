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

export function AvatarUser() {
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(false);
  const toggleAutoUpdate = () => setIsAutoUpdateEnabled(!isAutoUpdateEnabled);

  const handleClick = () => {
    console.log("Avatar clicked");
    // Implemente a lógica do clique aqui
  };
  const initialFocusRef = React.useRef();
  const AutoUpdateToggle = () => (
    <FormControl
      display="flex"
      alignItems="center"
      // bgColor={"gray.200"}
      w={"15rem"}
      // borderRadius={"md"}
      // p={"0.5rem"}
      justifyContent={"center"}

      // alignSelf={'flex-start'}
    >
      <FormLabel htmlFor="auto-update-toggle" mb="0" color="black">
        {" "}
        {/* Altere a cor conforme necessário */}
        Atualização automática:
      </FormLabel>
      <Switch
        id="auto-update-toggle"
        isChecked={isAutoUpdateEnabled}
        onChange={toggleAutoUpdate}
      />
    </FormControl>
  );
  return (
    <WrapItem>
      <Popover
        // initialFocusRef={initialFocusRef}
        placement="bottom"
        closeOnBlur={false}
      >
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
                <Stack
                  direction="row"
                  justifyContent="end"
                  // mb={4}
                  // position={"fixed"}
                  // w={"100%"}
                >
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
          ></PopoverFooter>
        </PopoverContent>
      </Popover>
    </WrapItem>
  );
}
