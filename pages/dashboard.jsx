import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import Loading from '../components/Loading'
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
    const router = useRouter();
    const {currentUser, loading, logout} = useAuth();

    const bg = useColorModeValue('gray.50', 'gray.800')
    

    function handleLogout () {
        logout()
    }

    useEffect(()=>{
        if(!currentUser&&!loading){
            router.push('/');
        }
    })

    if(!currentUser||loading){
        return <Loading/>
    }
    
    return (
        <Flex
        minH={'100vh'}
        flexDir={'column'}
        mb={3}
        align={'center'}
        justify={'center'}
        bg={bg}>
             <PagesList/>
        <Box>
            <Avatar marginBottom="10px" size="2xl" name={currentUser?.email} src={currentUser?.photoURL} />
        </Box>
        <Heading textAlign={'center'} as="h1" size="md" marginBottom="15px">
            Bem Vindo de volta {currentUser?.displayName}
        </Heading>
            Email: {currentUser?.email}
            <Button 
                marginTop="10px"
                colorScheme="blue"
                onClick={handleLogout}
            >Logout</Button>
      </Flex>
    )
}

export default Dashboard
