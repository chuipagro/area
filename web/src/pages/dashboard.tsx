import React from 'react';
import '../app/App.css';
import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';


function Feature({ title, desc }: { title: string, desc: string }) {
    return (
        <Box p={45} bg={"white"} shadow='md' borderRadius={'12px'} border={"none"} >
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box >
    );
}


function StackEx() {
    return (
        <Stack spacing={8} direction='row'>
            <Feature
                title='reza_s_sercret.txt'
                desc=''
            />
            <Feature
                title='memory_leak_generator.c'
                desc=''
            />
            <Feature
                title='quoi.feur'
                desc=''
            />
        </Stack>
    )
}


export const Home2 = (): JSX.Element => {

    return <div style={{
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/4/45/White_box_55x90.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1920
    }}>

        <VStack spacing="32px">

            <Text color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Dashboard to make</Text>
        </VStack>
    </div>
}

