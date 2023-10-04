import React from 'react';
import '../app/App.css';
import { Grid, GridItem, Text, Stack, Box, Heading, Tbody, VStack, HStack } from '@chakra-ui/react';


function Feature({ title, desc, color, size }: { title: string, desc: string, color: string, size: number }) {
    return (
        <Box p={5} shadow='md' borderWidth='1px' boxSize={300} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box>
    )
}


function StackEx() {
    let nb1: number = 1200;
    let nb2: number = 600;
    let numrows: number = 23;
    const rows = [];
    for (let i = 0; i < numrows; i++) {
        if (i % 5 === 0 || i + 1 >= numrows) {
            rows.push(
                <VStack key={i}>
                    <Feature
                        title='Plan Money'
                        desc='The future can be even brighter but a goal without a plan is just a wish'
                        color='rgb(255 255 255)'
                        size={nb1}
                    />
                </VStack>
            );
        } else {
            const pair = (
                <HStack key={i}>
                    <Feature
                        title='Plan Money'
                        desc='The future can be even brighter but a goal without a plan is just a wish'
                        color='rgb(255 255 255)'
                        size={nb2}
                    />
                    {i + 1 < numrows && (
                        <Feature
                            title='Another Feature'
                            desc='Description of another feature'
                            color='rgb(255 255 255)'
                            size={nb2}
                        />
                    )}
                </HStack>
            );
            rows.push(pair);
            i++;
        }
    }
    return (
        <VStack>
            {rows}
        </VStack>
    );
}



export const Dashboard = (): JSX.Element => {

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1920
    }}>
        <StackEx></StackEx>
    </div>
}

