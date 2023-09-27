import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Stack, Link, Button, Divider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';

export function Display({ name, surname, mail, password, checkPassword }: { name: string, surname: string, mail: string, password: string; checkPassword: string; }): JSX.Element {

    const handleClick = () => {
        console.log("name = ", name)
        console.log("surname = ", surname)
        console.log("mail = ", mail)
        console.log("password = ", password)
        console.log("checkPassword = ", checkPassword)
    };
    const toast = useToast()

    return (
        <Center mt="160px">
            <VStack spacing="32px">
                <Button colorScheme='purple' variant='outline' >
                    <Link color='purple' href='/home'>
                        validate
                    </Link>
                </Button >
            </VStack>
        </Center>
    );
}

export const Register = (): JSX.Element => {
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [checkPassword, setCheckPassword] = React.useState('');

    return <div style={{
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/4/45/White_box_55x90.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>

        <Taskbar></Taskbar>
        <VStack spacing="5px">
            <Text color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Register</Text>

            <InputText setValue={setName} placeHolder="name" type="text" color={'purple'} />
            <InputText setValue={setSurname} placeHolder="surname" type="text" color={'purple'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setMail} placeHolder="email" type="email" color={'purple'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setPassword} placeHolder="password" type="password" color={'purple'} />
            <InputText setValue={setCheckPassword} placeHolder="check password" type="password" color={'purple'} />

            <Display name={name} surname={surname} mail={mail} password={password} checkPassword={checkPassword} />

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

