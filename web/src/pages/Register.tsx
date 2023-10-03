import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Link, Button, Divider } from '@chakra-ui/react';
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';
import { useEffect, useState } from 'react';
import axios from "axios";


export const Register = (): JSX.Element => {
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const callApi = async (mail: String, username: String, password: String) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                mail,
                username,
                password,
            });
            return response.data;
        } catch (error) {
            console.error('Il y a eu une erreur!', error);
            return null;
        }
    }

    const handleSignup = (mail: String, username: String, password: String) => {
        callApi(mail, username, password).then(response => {
        }).catch(error => {
            console.log(error);
        });
    }

    function Display({ name, mail, password }: { name: string, mail: string, password: string; }): JSX.Element {

        return (
            <Center mt="160px">
                <VStack spacing="32px">
                    {/* <Text> {name} {surname} {mail} {password} {checkPassword} </Text> */}
                    <Button onClick={() => handleSignup(name, mail, password)} colorScheme='purple' variant='outline' >
                        {/* <Link onClick={handleClick} color='purple' href='/home'>
                            register
                        </Link> */}
                    </Button >
                </VStack>
            </Center>
        );
    }

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>

        <Taskbar></Taskbar>
        <VStack spacing="5px">
            <Text color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Register</Text>

            <InputText setValue={setName} placeHolder="name" type="text" color={'purple'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setMail} placeHolder="email" type="email" color={'purple'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setPassword} placeHolder="password" type="password" color={'purple'} />
            <Display name={name} mail={mail} password={password} ></Display>

            <Button colorScheme='purple' variant='outline' >
                <Link color='purple' href='/login'>
                    Or login here
                </Link>
            </Button >

            <Link color='black' href='/login-with-service'>
                Continue with Google, Facebook or apple
            </Link>

        </VStack>
    </div>
}
