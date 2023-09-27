import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Link, Button, Divider, Box, HStack } from '@chakra-ui/react';
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';


export function DisplayButton({ mail, password }: { mail: string, password: string }): JSX.Element {

    const handleClick = () => {
        console.log("mail = ", mail)
        console.log("password = ", password)
    };

    return (
        <Center mt="160px">
            <VStack spacing="32px">
                <Button onClick={handleClick} colorScheme='black' variant='outline' >
                    <Link color='black' href='/home'>
                        Log in
                    </Link>
                </Button >
            </VStack>
            <Text>{mail}</Text>
        </Center >
    );
}


function Title() {
    // faut trouver comment ajuster vrm la position le mettre ds un VStack c guez en plus jpe pas baisser le text
    return (
        <VStack spacing="0px">
            <Text color="black" fontSize={{ base: '50px' }} >Login</Text>
        </VStack>
    )
}

export const Login = (): JSX.Element => {
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');


    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>
        <Taskbar></Taskbar>
        <Title></Title>
        <VStack spacing="5px">


            <InputText setValue={setMail} placeHolder="mail" type="email" color={'blue'} />

            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setPassword} placeHolder="password" type="password" color={'blue'} />

            <DisplayButton mail={mail} password={password} />
            <Button colorScheme='black' variant='outline' >
                <Link color='black' href='/register'>
                    Create an account
                </Link>
            </Button >

            <Link color='black' href='/login-with-service'>
                Continue with Google, Facebook or apple
            </Link>

        </VStack>
    </div>
}
