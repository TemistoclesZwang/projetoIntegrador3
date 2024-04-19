import React, { useState } from "react";
import { Link as LinkRouter} from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="35px" width="100%" height="50%">
        <Box
          p={10}
          borderRadius="lg"
          boxShadow="dark-lg"
          textAlign="center"
          maxWidth={{ base: "90%", sm: "40%", md: "35%", lg: "30%" }}
          width="100%"
        >
          <Heading as="h1" color="gray.50" size="lg">
            Login
          </Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              // Adicione aqui a variável e a função para manipular o email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              // Adicione aqui a variável e a função para manipular a senha
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <VStack spacing="35px">
            <Button
              colorScheme="primary"
              onClick={handleLogin}
              width="50%"
              mt="35px"
              // mb="35px"
            >
              Sign in
            </Button>
            <LinkRouter to="/register">Create an account</LinkRouter>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
}
