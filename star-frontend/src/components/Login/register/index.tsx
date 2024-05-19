import { useState, useEffect } from "react";
import textureFloor from "/home/temistocles/IFPI/5 periodo/projeto 3/github/projetoIntegrador3/star-frontend/src/assets/textureFloor.jpg";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  filter,
} from "@chakra-ui/react";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IdRole, setIdRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState("guest"); 

  // Hook useEndpoint para gerenciar a solicitação
  const { data, error, isLoading, sendRequest } = useEndpoint<
    { status: string },
    {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      role:string;
    }
  >(
    {
      url: "http://localhost:3000/cadastro/novo-usuario",
      method: "POST",
      body: {
        username,
        email,
        password,
        confirmPassword,
        role,
      },
    },
    false // autoFetch é false para permitir envio manual
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const TextureBg = () => {
    return (
      <Image
        src={textureFloor}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="-1"
        objectFit="cover">
      </Image>
    )
  }
  const RoleOptions = () => {
    return (
      <Flex w={'100%'} direction="column">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            borderRadius={'md'}
            textAlign="left"
            color="gray.500" // Definindo a cor cinza semelhante a um placeholder
            fontWeight="normal"
          >
            {role}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setRole("guest")}>Guest</MenuItem>
            <MenuItem onClick={() => setRole("admin")}>Admin</MenuItem>
            <MenuItem onClick={() => setRole("manager")}>Manager</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };
  
  const handleSubmit = async () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres e incluir uma combinação de maiúsculas, minúsculas e números."
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    sendRequest();
    
  };

  return (
    <Flex
      justifyContent="center"
      align="center"
      width="100vw"
      height="100vh"
      // bgColor="black"
      background={(textureFloor)}
    >
      <TextureBg />
      <Box width="500px" bgColor="gray.800" p="5rem" h="auto" borderRadius="xl">
        <FormControl isRequired>
          <FormLabel color="white">Nome</FormLabel>
          <Input
            placeholder="Nome completo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          <FormLabel color="white" mt={4}>
            Email
          </FormLabel>
          <Input
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          {emailError && (
            <Text color="red.500" mt={2}>
              {emailError}
            </Text>
          )}
          <FormLabel color="white" mt={4}>
            Senha
          </FormLabel>
          <Input
            placeholder="Senha@123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          {passwordError && (
            <Text color="red.500" mt={2}>
              {passwordError}
            </Text>
          )}
          <FormLabel color="white" mt={4}>
            Confirmar senha
          </FormLabel>
          <Input
            placeholder="Senha@123"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          <FormLabel color="white" mt={4}>
            Role
          </FormLabel>

          <RoleOptions></RoleOptions>
          
          {(role === "Admin" || role === "Manager") && (
  <>
    <FormLabel color="white" mt={4}>
      Id da role
    </FormLabel>
    <Input
      placeholder="ID12345A"
      type="text"
      value={IdRole}
      onChange={(e) => setIdRole(e.target.value)}
      width="100%"
      bgColor="white"
      color="white"
    />
  </>
)}

          {passwordError && (
            <Text color="red.500" mt={2}>
              {passwordError}
            </Text>
          )}
          <Button
            mt={10}
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Enviar
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
