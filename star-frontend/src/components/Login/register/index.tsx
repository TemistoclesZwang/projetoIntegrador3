import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from "@chakra-ui/react";
import { useEndpoint } from "../../../hooks/api/useEndpoint";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  IdRole: string;
  emailError: string;
  passwordError: string;
  role: string;
}

export function Register() {
  const [formState, setFormState] = useState<RegisterFormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    IdRole: "",
    emailError: "",
    passwordError: "",
    role: "guest", //valor padrão
  });

  const handleChange = (key: keyof RegisterFormState, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { data, error, isLoading, sendRequest } = useEndpoint<
    { status: string },
    RegisterFormState
  >(
    {
      url: "http://localhost:3000/cadastro/novo-usuario",
      method: "POST",
      body: formState,
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

  const handleSubmit = async () => {
    let isValid = true;

    if (!validateEmail(formState.email)) {
      setFormState(prevState => ({
        ...prevState,
        emailError: "Por favor, insira um e-mail válido."
      }));
      isValid = false;
    } else {
      setFormState(prevState => ({
        ...prevState,
        emailError: ""
      }));
    }

    if (!validatePassword(formState.password)) {
      setFormState(prevState => ({
        ...prevState,
        passwordError: "A senha deve ter pelo menos 8 caracteres e incluir uma combinação de maiúsculas, minúsculas e números."
      }));
      isValid = false;
    } else {
      setFormState(prevState => ({
        ...prevState,
        passwordError: ""
      }));
    }

    if (!isValid) {
      return;
    }

    sendRequest();
  };
  const RoleOptions = ({ role, setRole }: { role: string, setRole: (role: string) => void }) => {
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
  

  return (
    <Flex
      justifyContent="center"
      align="center"
      width="100vw"
      height="100vh"
      // background={(textureFloor)}
    >
      
      <Box width="500px" bgColor="gray.800" p="5rem" h="auto" borderRadius="xl">
        <FormControl isRequired>
          <FormLabel color="white">Nome</FormLabel>
          <Input
            placeholder="Nome completo"
            value={formState.username}
            onChange={(e) => handleChange("username", e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          <FormLabel color="white" mt={4}>
            Email
          </FormLabel>
          <Input
            placeholder="exemplo@gmail.com"
            value={formState.email}
            onChange={(e) => handleChange("email", e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          {formState.emailError && (
            <Text color="red.500" mt={2}>
              {formState.emailError}
            </Text>
          )}
          <FormLabel color="white" mt={4}>
            Senha
          </FormLabel>
          <Input
            placeholder="Senha@123"
            type="password"
            value={formState.password}
            onChange={(e) => handleChange("password", e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          {formState.passwordError && (
            <Text color="red.500" mt={2}>
              {formState.passwordError}
            </Text>
          )}
          <FormLabel color="white" mt={4}>
            Confirmar senha
          </FormLabel>
          <Input
            placeholder="Senha@123"
            type="password"
            value={formState.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            width="100%"
            bgColor="white"
            color="black"
          />
          <FormLabel color="white" mt={4}>
            Role
          </FormLabel>

          <RoleOptions role={formState.role} setRole={(role) => handleChange("role", role)} />

          {(formState.role === "Admin" || formState.role === "Manager") && (
            <>
              <FormLabel color="white" mt={4}>
                Id da role
              </FormLabel>
              <Input
                placeholder="ID12345A"
                type="text"
                value={formState.IdRole}
                onChange={(e) => handleChange("IdRole", e.target.value)}
                width="100%"
                bgColor="white"
                color="white"
              />
            </>
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

