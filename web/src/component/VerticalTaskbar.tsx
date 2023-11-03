import React from 'react';
import '../app/App.css';
import { Button, Box, HStack, Link, Text } from '@chakra-ui/react';

import { useNavigate, useLocation } from "react-router-dom"
import logo from '../app/logo.png'


/**
 * This  component display a vertical taskbar with button to navigate to :
 *  - home
 *  - create area
 *  - profile
 *  - disconnect
 */
export function Taskbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const isHomePage = location.pathname === "/home";
    const isCreatePage = location.pathname === "/create";
    const isProfilPage = location.pathname === "/profil";


    return (
        <Box
            backgroundColor="black"
            width="140px"
            height="100%"
            position="fixed"
            borderRadius={50}
            top="0"
            left="-10"
            boxShadow="md"
        >
            <img src={logo} width={80} style={{ marginTop: '30px', marginLeft: '50px' }} ></img>
            <Box
                backgroundColor={isHomePage ? "blue" : "white"}
                px={6}
                py={6}
                position="fixed"
                borderRadius={50}
                top="400"
                left="26"
                boxShadow="md"
                onClick={() => navigate('/home')}>

            </Box>
            <Text position="fixed" top="450"
                left="26" color={"white"}>Home</Text>
            <Box
                backgroundColor={isCreatePage ? "blue" : "white"}
                px={6}
                py={6}
                position="fixed"
                borderRadius={50}
                top="500"
                left="26"
                boxShadow="md"
                onClick={() => navigate('/create')}>

            </Box>
            <Text position="fixed" top="550"
                left="26" color={"white"}>Create</Text>
            <Box
                backgroundColor={isProfilPage ? "blue" : "white"}
                px={6}
                py={6}
                position="fixed"
                borderRadius={50}
                top="600"
                left="26"
                boxShadow="md"
                onClick={() => navigate('/profil')}>

            </Box>
            <Text position="fixed" top="650"
                left="26" color={"white"}>Profile</Text>
        </Box>)
}