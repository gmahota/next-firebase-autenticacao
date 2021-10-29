import {
    Flex,
    chakra,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useToast,
    useColorModeValue,
  } from '@chakra-ui/react';
import router from 'next/router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useMounted from '../hooks/useMounted';
  
  export default function Registo() {
      const [isSubmiting,setIsSubmiting] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [passConfirm, setPassConfirm] = useState('');
      
      //Custom Hooks
      const mounted = useMounted();
      const {signUp} = useAuth();
      const toast = useToast();
      
      
      const handleSignUp = async (e) =>{
          e.preventDefault()
          
          if(!email || !password){
            return alert("Credenciais Invalidas")
          }

          if(password!==passConfirm) {
              return console.log("senhas diferentes")
            }
            
            setIsSubmiting(true)
            signUp(email, password)
            .then((res)=>{
                router.push('/dashboard');
            })
            .catch((err)=>{
                toast({
                    title: "Nao foi possivel criar a conta",
                    description: `Nao criar a conta ${err.message}`,
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

        <chakra.form onSubmit={handleSignUp} w="full">
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Crie uma conta</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                para ter acesso a mais <Link color={'blue.400'}>funcionalidades</Link> ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Endereço de e-mail</FormLabel>
                    <Input 
                        type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Senha</FormLabel>
                    <Input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl id="passwordConfirm">
                    <FormLabel>Confirmar senha</FormLabel>
                    <Input 
                        type="password"
                        value={passConfirm}
                        onChange={(e)=>setPassConfirm(e.target.value)}
                    />
                </FormControl>
                
                <Stack spacing={10}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    </Stack>
                    <Button
                        type="submit"
                        isLoading={isSubmiting}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                    >
                    Criar conta
                    </Button>
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </chakra.form>
      </Flex>
    );
  }