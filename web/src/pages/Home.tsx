import React from 'react';
import '../app/App.css';
import { Text, VStack, Link, Stack, Button } from '@chakra-ui/react';

// import backgroundImage from '../component/backgroudImage';

/**
 * This function isn't called anywhere and can be deleted, not sure when or why we would use it
 */
export const Head = (): JSX.Element => (
    <div style={{
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/4/45/White_box_55x90.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 5000, width: 1905
    }}>
        <VStack spacing="32px">

            <Stack spacing={1} direction='row'>
                <Text color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>LPPLL</Text>
            </Stack>

            <Stack spacing={50} direction='column' >
                <Button colorScheme='teal' variant='outline' >
                    <Link color='teal.500' href='/register'>
                        Create an account
                    </Link>
                </Button >
                <Button colorScheme='teal' variant='outline' >
                    <Link color='teal.500' href='/login'>
                        Login to your account
                    </Link>
                </Button >
            </Stack>

        </VStack>
    </div>
);

