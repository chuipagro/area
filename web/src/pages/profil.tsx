import React from 'react';
import '../app/App.css';
import { Text, VStack, Input, Button, Heading, Stack, HStack } from '@chakra-ui/react';
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
            width: '50%', // Adjust the width as needed
        };

        return (
            <div>
                <Stack marginLeft={500} marginTop={30} spacing="0px">
                    <Heading size="lg" color="black" marginTop={30} >Account</Heading>
                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={0}>Change Your Email</Text>
                        <Button color="black" backgroundColor="white" borderColor="black" variant='outline' size="s" marginTop={30} marginLeft={"27%"} onClick={() => { }}>Click To Update</Button>
                    </HStack>
                    <Input
                        marginLeft={"2%"}
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={0}>Change Your Email</Text>
                        <Button color="black" backgroundColor="white" borderColor="black" variant='outline' size="s" marginTop={30} marginLeft={"27%"} onClick={() => { }}>Click To Update</Button>
                    </HStack>
                    <Input
                        marginLeft={"2%"}
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }} marginTop={30} marginLeft={0}>Change Your Email</Text>
                        <Button color="black" backgroundColor="white" borderColor="black" variant='outline' size="s" marginTop={30} marginLeft={"27%"} onClick={() => { }}>Click To Update</Button>
                    </HStack>
                    <Input
                        marginLeft={"2%"}
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        style={inputStyle}
                    />
                </Stack>
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
