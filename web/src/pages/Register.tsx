import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Link, Button, Divider, Input } from '@chakra-ui/react';
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';
import { useNavigate } from "react-router-dom"
import axios from "axios";


/**
 * this page display a title and a button to register
 */
export const Register = (): JSX.Element => {
    const navigate = useNavigate()
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [isError, setIsError] = React.useState(false)

    const inputStyle = {
        width: '50%',
    };

    /**
     * this function call the api to register
     * @param mail
     * @param username
     * @param password
     * @returns
     */
    const callApi = async (mail: String, username: String, password: String) => {
        try {
            const mailSend = mail.toString();
            localStorage.setItem('userMail', mailSend);
            const response = await axios.post('http://localhost:8080/auth/signup', {
                mail,
                username,
                password,
            });
            if (response.data) {
                navigate('/login');
            }
            return response.data;
        } catch (error) {
            console.error('Il y a eu une erreur!', error);
            setIsError(true);
            return null;
        }
    }

    /**
     * this function call the api to register
     * @param mail
     * @param username
     * @param password
     * @returns
     */
    const handleSignup = (mail: String, username: String, password: String) => {
        callApi(username, mail, password).then(response => {
        }).catch(error => {
            console.log(error);
        });
    }

    /**
     * this function display a button to register, if the request failed, it display the buttun in red with a message
     * @param name
     * @param mail
     * @param password
     * @returns
     */
    function Display({ name, mail, password }: { name: string, mail: string, password: string; }): JSX.Element {

        let rows = [];
        if (!isError) {
            rows.push(
                <Center mt="160px">
                    <VStack spacing="32px">
                        <Button onClick={() => handleSignup(name, mail, password)} colorScheme='black' variant='outline' >
                            Sign up
                        </Button >
                    </VStack>
                </Center>)
        } else {
            rows = []
            rows.push(
                <Center mt="160px">
                    <VStack spacing="32px">
                        <Button onClick={() => handleSignup(name, mail, password)} colorScheme='red' variant='outline' >
                            Sign up
                        </Button >
                        <Text color={'red'} > can't register</Text>
                    </VStack>
                </Center>)
        }
        return (
            <VStack>
                {rows}
            </VStack>
        );
    }

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>

        <Taskbar></Taskbar>
        <VStack spacing="5px">
            <Text color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Register</Text>
            <Text marginTop={"2%"}></Text>
            <Input
                pr='4.5rem'
                type={"text"}
                color={"black"}
                placeholder={"name"}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
            />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>

            <Input
                pr='4.5rem'
                type={"text"}
                color={"black"}
                placeholder={"Email"}
                onChange={e => setMail(e.target.value)}
                style={inputStyle}
            />

            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>

            <Input
                pr='4.5rem'
                type={"text"}
                color={"black"}
                placeholder={"Password"}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
            />

            <Display name={name} mail={mail} password={password} ></Display>

            <Button colorScheme='black' variant='outline' >
                <Link color='black' href='/login'>
                    Or login here
                </Link>
            </Button >

            {/* <Link color='black' href='/login-with-service'>
                Continue with Google, Facebook or apple
            </Link> */}

        </VStack>
    </div>
}
