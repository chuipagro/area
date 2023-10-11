import React from 'react';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import { Taskbar } from '../component/Taskbar';

/**
 * This function display a title
 */
function Title() {
    return (
        <VStack spacing="0px">
            <Text color="black" fontSize={{ base: '50px' }} >page developers to make</Text>
        </VStack>
    )
}

/**
 * This function display a page with the title and the taskbar
 * the function is to be completed
 */
export const Developers = (): JSX.Element => {

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>
        <Taskbar></Taskbar>
        <Title></Title>

    </div>
}
