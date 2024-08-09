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
import parking from "../../assets/HomePage/parking2.jpg";

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

  return (
    <Flex
      height="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bgColor="blackAlpha.900"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        bgImage={`url(${parking})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={0.2}
      />

      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={1}
        flexDirection="column"
        p={5}
      >
        <VStack
          spacing="35px"
          width={{ base: "90%", md: "50%", lg: "30%" }}
          p={{ base: 5, md: 10 }}
          borderRadius="lg"
          bgColor="blackAlpha.900"
        >
          <Heading as="h1" color={theme.colors.highlights[80]} size="lg">
            Login
          </Heading>
          <FormControl id="email">
            <FormLabel color={"white"}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bgColor={"white"}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color={"white"}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bgColor={"white"}
            />
          </FormControl>
          <VStack spacing="35px" width="100%">
            <Button
              bg={theme.colors.highlights[100]}
              _hover={{ bg: theme.colors.highlights[50] }}
              onClick={handleLogin}
              width="50%"
              mt="35px"
            >
              Sign in
            </Button>
            <Link color={theme.colors.highlights[80]}>
              <LinkRouter to="/register">Create an account</LinkRouter>
            </Link>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
