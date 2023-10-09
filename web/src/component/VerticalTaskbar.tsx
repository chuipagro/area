import React from 'react';
import '../app/App.css';
import { Button, Box, HStack, Link } from '@chakra-ui/react';

import { useNavigate } from "react-router-dom"

export function Taskbar() {
    const navigate = useNavigate()
    return (
        <Box
            backgroundColor="black"
            width="100px"
            height="100%"
            position="fixed"
            top="0"
            left="0"
            boxShadow="md"
        >
            <Box
                backgroundColor="blue"
                boxSize={10}
                position="fixed"
                top="500"
                left="30"
                boxShadow="md"
                onClick={() => navigate('/create')}>

            </Box>
            <Box
                backgroundColor="blue"
                boxSize={10}
                position="fixed"
                top="400"
                left="30"
                boxShadow="md"
                onClick={() => navigate('/home')}>

            </Box>
            {/* for the profile */}
            {/* <Box
                backgroundColor="blue"
                boxSize={10}
                position="fixed"
                top="600"
                left="30"
                boxShadow="md" >

            </Box> */}
            <Box
                backgroundColor="red"
                boxSize={10}
                position="fixed"
                top="600"
                left="30"
                boxShadow="md"
                onClick={() => navigate('/login')}>

            </Box>


        </Box>)

}