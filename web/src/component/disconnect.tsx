import React from 'react';
import '../app/App.css';
import { Button, Box, HStack, Link, Text } from '@chakra-ui/react';

import { useNavigate } from "react-router-dom"


/**
 * This  component display a vertical taskbar with button to navigate to :
 *  - home
 *  - create area
 *  - profile
 *  - disconnect
 */
export function DisconnectButtun() {
    const navigate = useNavigate()
    return (
        <div>
            <Box
                backgroundColor="black"
                px={100}
                py={17}
                position="fixed"
                top="10"
                right="30"
                boxShadow="md"
                borderRadius={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => navigate('/login')}>
                <Text fontSize="2xl" color="white">Disconnect</Text>
            </Box>

        </div>)

}