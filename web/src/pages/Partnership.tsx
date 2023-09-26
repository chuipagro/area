import React from 'react';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import { Taskbar } from '../component/Taskbar';


function Title() {
    // faut trouver comment ajuster vrm la position le mettre ds un VStack c guez en plus jpe pas baisser le text
    return (
        <VStack spacing="0px">
            <Text color="black" fontSize={{ base: '50px' }} >page partnership to make</Text>
        </VStack>
    )
}

export const Partnership = (): JSX.Element => {



    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>
        <Taskbar></Taskbar>
        <Title></Title>

    </div>
}
