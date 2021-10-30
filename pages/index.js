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
    useToast,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PagesList from '../components/pagesList';
import { useAuth } from '../context/AuthContext';
import useMounted from '../hooks/useMounted';
  
  export default function Registo() {
      const [isSubmiting,setIsSubmiting] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const router = useRouter();
      const toast = useToast();
      
      //Custom Hooks
      const mounted = useMounted();
      const {signIn, currentUser} = useAuth();
      
      
      useEffect(()=>{
        if(currentUser){
            router.push('/dashboard');
        }
    })

      const handleSignIn = async (e) =>{
          e.preventDefault()
          
          if(!email || !password){
            return alert("Credenciais Invalidas")
          }


            setIsSubmiting(true)
            signIn(email, password)
            .then((res)=>{
                console.log(res)
                router.push('/dashboard')
            })
            .catch((err)=>{
                toast({
                    title: "Autenticacao falhou",
                    description: `Nao foi efectuar login ${err.message}`,
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

        <chakra.form onSubmit={handleSignIn}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <PagesList/>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Iniciar sessao na sua conta</Heading>
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
            
                <Stack spacing={10}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Lembar de mim</Checkbox>
                    <Link href="/redefinir-senha" color={'blue.400'}>Esqueceu a sua senha?</Link>
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
                    Iniciar sessão
                    </Button>
                    <Link href="/registo" textAlign={"center"} color={'blue.400'}>Nao tem conta? Crie uma</Link>
                    
                </Stack>
                </Stack>
            </Box>
            </Stack>
        </chakra.form>
      </Flex>
    );
  }