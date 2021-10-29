import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

function Loading() {
    return (
        <Flex
            minH={'100vh'}
            flexDir={'column'}
            mb={3}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Spinner size="xl"/>
        </Flex>
    )
}

export default Loading
