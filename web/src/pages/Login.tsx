import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Link, Button, Divider } from '@chakra-ui/react';
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

/**
 * this page display a title and a button to login
 */
export const Login = (): JSX.Element => {
    const navigate = useNavigate()
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [isError, setIsError] = React.useState(false)

    /**
     * this function call the api to login
     * @param mail
     * @param password
     * @returns
     */
    const callApi = async (mail: String, password: String) => {
        console.log(mail, password)
        try {
            console.log(mail, password)
            const mailSend = mail.toString();
            localStorage.setItem('userMail', mailSend);
            const response = await axios.post('http://localhost:8080/auth/signin', {
                mail,
                password,
            });
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
            return response.data;
        } catch (error) {
            console.error('Il y a eu une erreur!', error);
            setIsError(true);
            return null;
        }
    }

    /**
     * this function call the api to login
     * @param mail
     * @param password
     * @returns
     */
    const handleSignup = (mail: String, password: String) => {
        callApi(mail, password).then(response => {
        }).catch(error => {
            console.log(error);
            setIsError(true);
        });
    }

    /**
     * this function display a button to login, if the request failed, it display the buttun in red with a message
     * @param mail
     * @param password
     * @returns
     */
    function DisplaySignInButtun({ mail, password }: { mail: string, password: string; }): JSX.Element {

        let rows = [];
        if (!isError) {
            rows.push(
                <Center mt="160px">
                    <VStack spacing="32px">
                        <Button onClick={() => handleSignup(mail, password)} colorScheme='black' variant='outline' >
                            Sign in
                        </Button >
                    </VStack>
                </Center>)
        } else {
            rows.push(
                <Center mt="160px">
                    <VStack spacing="32px">
                        <Button onClick={() => handleSignup(mail, password)} colorScheme='red' variant='outline' >
                            Sign in
                        </Button >
                        <Text color={'red'} > can't login</Text>
                    </VStack>
                </Center>)

        }

        return (
            <VStack>
                {rows}
            </VStack>
        );
    }

    /**
     * This function display a title
     */
    function Title() {
        return (
            <Text marginTop={10} marginLeft={860} color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Login</Text>
        );
    }

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1905
    }}>
        <Taskbar></Taskbar>

        <Title></Title>

        <VStack marginTop={10} marginLeft={550} boxSize={800} spacing="5px">
            <InputText setValue={setMail} placeHolder="mail" type="email" color={'black'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setPassword} placeHolder="password" type="password" color={'black'} />
        </VStack>


        <VStack marginTop={-750} spacing="5px">
            <DisplaySignInButtun mail={mail} password={password} ></DisplaySignInButtun>
            <Button colorScheme='black' variant='outline' >
                <Link color='black' href='/register'>
                    Create an account
                </Link>
            </Button >

            <Link color='black' href='/login-with-service'>
                Continue with Google, Github or Spotify
            </Link>
            <Button colorScheme='black' variant='outline' >
                <Link color='black' href={'/client.apk'} download>
                    Download Android
                </Link>
            </Button >
        </VStack>
    </div>
}
