import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import Loading from '../components/Loading'
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function dashboard() {
    const router = useRouter();
    const {currentUser, loading, logout} = useAuth();
    

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
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box>
            <Avatar size="2xl" name="user" src={currentUser?.photoURL} />
        </Box>
        <Heading textAlign={'center'} as="h1" size="md">
            Bem Vindo de volta {currentUser?.displayName}
        </Heading>
            Email: {currentUser?.email}
            <Button 
                colorScheme="blue"
                onClick={handleLogout}
            >Logout</Button>
      </Flex>
    )
}

export default dashboard
