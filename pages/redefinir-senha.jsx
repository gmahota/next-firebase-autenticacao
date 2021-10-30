import React, { useState } from 'react'

import {
  Button,
  Flex,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { useAuth } from '../context/AuthContext';
import useMounted from '../hooks/useMounted';
import PagesList from '../components/pagesList';


export default function ResetPasswordForm(){

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const mounted = useMounted();
  const toast = useToast();

  const {resetPassword} = useAuth();

  async function handlePassReset(e){
      e.preventDefault();
  
      console.log("Works!")
      setMessage('')
      setIsSubmiting(true)
      resetPassword(email)
      .then((res)=>{
          setEmail('')
          toast({
            title: "Email enviado",
            description: `Aceda o seu email para redefinir a senha`,
            status: "success",
            duration: 4000,
            isClosable: true,
          })
      })
      .catch((err)=>{
          console.log(err)
          setMessage(JSON.stringify(err.message))
          toast({
            title: "Email nao enviado",
            description: `Nao foi possiver enviar o email! ${err.message}`,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
      })
      .finally(()=>mounted.current&&setIsSubmiting(false))
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <chakra.form w={'full'} display="flex" justifyContent="center" onSubmit={handlePassReset}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
               <PagesList/>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                  Redefinir a senha
                </Heading>
                <FormControl id="email" isRequired>
                  <FormLabel>Insira seu endereco de email</FormLabel>
                  <Input
                    value={email}
                    onChange={(e)=>setEmail(e.currentTarget.value)}
                    placeholder="seu-email@exemplo.com"
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                  />
                </FormControl>
                {/*<FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" />
                  </FormControl>*/}
                <Stack spacing={6}>
                  <Button
                    isLoading={isSubmiting}
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Solicitar Redefinicao
                  </Button>
                </Stack>
          </Stack>
          
      </chakra.form>
    </Flex>
  );
}