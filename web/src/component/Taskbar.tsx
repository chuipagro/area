import React from 'react';
import '../app/App.css';
import { Button, Box, HStack, Link } from '@chakra-ui/react';


/**
 * This  component display an horizontal taskbar with button to navigate to :
 *  - login
 *  - register
 *  - partnership
 *  - explore
 *  - developers
 *  - get started
 */
export function Taskbar() {
    return (
        <Box bg='black' w='100%' p={10} color='white'>
            <HStack>
                <Button colorScheme='white' variant='ghost' fontSize={{ base: '35px' }} >
                    <Link color='white' href='/login'>
                        LPPLL
                    </Link>
                </Button>

                {/* <Button colorScheme='white' variant='ghost' fontSize={{ base: '35px' }} left={700} >
                    <Link color='white' href='/partnership'>
                        Partnership
                    </Link>
                </Button>

                <Button colorScheme='white' variant='ghost' fontSize={{ base: '35px' }} left={700}>
                    <Link color='white' href='/explore'>
                        Explore
                    </Link>
                </Button>

                <Button colorScheme='white' variant='ghost' fontSize={{ base: '35px' }} left={700}>
                    <Link color='white' href='/developers'>
                        Developers
                    </Link>
                </Button>

                <Button colorScheme='red' variant='solid' fontSize={{ base: '35px' }} left={750}>
                    <Link color='black' href='/login-with-service'>
                        Get started
                    </Link>
                </Button> */}
            </HStack>
        </Box>
    )
}

