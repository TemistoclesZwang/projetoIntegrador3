import { useContext, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
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
  useTheme,
  useToast,
} from "@chakra-ui/react";
import usePost from "../../hooks/LoginPage/index";


export function LoginPage() {
  const theme = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postData, isLoading, error } = usePost();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleLogin = async () => {
    const url = "http://localhost:3000/auth/login";
    const data = { email, password };
    const result = await postData(url, data);

    if (error) {
      toast({
        title: "Failed to log in",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (result && result.access_token) {
      
      login(result.access_token, result.role);
      
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/vagas");
    }

  };

//   useEffect(() => {
//     console.log('O estado de isLoggedIn foi atualizado:', isLoggedIn);
//     // Você pode colocar mais lógica aqui que deve ser executada quando isLoggedIn mudar
// }, [isLoggedIn]); 

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bgColor={'blackAlpha.900'}>
      <VStack spacing="35px" width="100%" height="50%">
        <Box
          p={10}
          borderRadius="lg"
          // boxShadow="dark-lg"
          textAlign="center"
          maxWidth={{ base: "90%", sm: "40%", md: "35%", lg: "30%" }}
          width="100%"
          bgColor={'blackAlpha.900'}
        >
          <Heading as="h1" color={theme.colors.highlights[80]} size="lg">
            Login
          </Heading>
          <FormControl id="email">
            <FormLabel color={"white"}>Email</FormLabel>
            <Input
              type="email"
              // Adicione aqui a variável e a função para manipular o email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bgColor={"white"}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color={"white"}>Password</FormLabel>
            <Input
              type="password"
              // Adicione aqui a variável e a função para manipular a senha
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bgColor={"white"}
            />
          </FormControl>
          <VStack spacing="35px">
            <Button
              bg={theme.colors.highlights[100]}
              _hover={{ bg: theme.colors.highlights[50] }}
              onClick={handleLogin}
              width="50%"
              mt="35px"
              // mb="35px"
            >
              Sign in
            </Button>
            <Link color={theme.colors.highlights[80]}>
              <LinkRouter to="/register">Create an account</LinkRouter>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
}
