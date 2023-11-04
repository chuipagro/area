import React from 'react';
import '../app/App.css';
import { Text, VStack, Input, Button, Heading, Stack } from '@chakra-ui/react';
import { Taskbar } from '../component/VerticalTaskbar';
import { DisconnectButtun } from '../component/disconnect';

/**
 * This function display a title
 */
function Title() {
    return (
        <VStack marginTop={30} spacing="0px">
            <Text color="black" fontSize={{ base: '50px' }}>profile</Text>
        </VStack>
    )
}


/**
 * This function display a page with the title and the taskbar
 * the function is to be completed
 */
export const Profile = (): JSX.Element => {

    function Account() {

        const inputStyle = {
            width: '30%', // Adjust the width as needed
        };

        return (
            <div>
                <VStack marginLeft={1} marginTop={30} spacing="0px">
                    <Heading size="lg" color="black" marginTop={30} marginLeft={30}>Account</Heading>
                    <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={0}>Username</Text>
                    <Input
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                    <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={30}>Email</Text>
                    <Input
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                    <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={30}>Change Your Password</Text>
                    <Input
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                </VStack>
            </div>
        );
    }

    function Display() {
        return (
            <div>
                <VStack marginLeft={1} marginTop={30} spacing="0px">
                    <Taskbar></Taskbar>
                    <DisconnectButtun />
                    <Title></Title>
                </VStack>
                <Account />
            </div>

        );
    }

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>

        <Display />

    </div>
}
