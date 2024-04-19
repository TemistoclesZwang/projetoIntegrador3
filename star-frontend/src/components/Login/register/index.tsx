import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

export function Register() {
  // Estados para cada campo de entrada e mensagens de erro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validador de email
  const validateEmail = (email:string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validador de senha
  const validatePassword = (password:string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  // Função para enviar os dados
  const handleSubmit = async () => {
    // Limpa erros anteriores
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Verifica email
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      isValid = false;
    }

    // Verifica senha
    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres e incluir uma combinação de maiúsculas, minúsculas e números.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Se tudo estiver ok, envia os dados
    const payload = {
      name,
      email,
      password,
      confirmPassword,
    };

    const response = await fetch('https://your-endpoint.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data); // Exibe a resposta do servidor no console
  };

  return (
    <Flex
      justifyContent="center"
      align="center"
      width="100vw"
      height="100vh"
    >
      <Box>
        <FormControl isRequired>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} />
          <FormLabel>Email</FormLabel>
          <Input placeholder="exemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
          {emailError && <Text color="red.500">{emailError}</Text>}
          <FormLabel>Senha</FormLabel>
          <Input placeholder="Senha@123" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {passwordError && <Text color="red.500">{passwordError}</Text>}
          <FormLabel>Confirmar senha</FormLabel>
          <Input placeholder="Senha@123" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button mt={10} colorScheme="teal" onClick={handleSubmit}>
            Enviar
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
