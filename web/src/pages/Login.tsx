import React from 'react';
import '../app/App.css';
import { Center, Text, VStack, Link, Button, Divider } from '@chakra-ui/react';
import { InputText } from '../component/TexInput';
import { Taskbar } from '../component/Taskbar';
import { useNavigate } from "react-router-dom"
import axios from 'axios';


export const Login = (): JSX.Element => {
    const navigate = useNavigate()
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState('')
    const [isError, setIsError] = React.useState(false)


    const callApi = async (mail: String, password: String) => {
        try {
            const mailSend = mail.toString();
            localStorage.setItem('userMail', mailSend);
            // console.log(mailSend);
            const response = await axios.post('http://localhost:3000/auth/signup', {
                mail,
                password,
            });
            if (response.data) {
                navigate('/home');
            }
            return response.data;
        } catch (error) {
            console.error('Il y a eu une erreur!', error);
            setIsError(true);
            return null;
        }
    }

    const handleSignup = (mail: String, password: String) => {
        callApi(mail, password).then(response => {
        }).catch(error => {
            console.log(error);
            setIsError(true);
        });
    }

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
        }
        rows = [];
        rows.push(
            <Center mt="160px">
                <VStack spacing="32px">
                    <Button onClick={() => handleSignup(mail, password)} colorScheme='red' variant='outline' >
                        Sign in
                    </Button >
                    <Text color={'red'} > can't login</Text>
                </VStack>
            </Center>)



        return (
            <VStack>
                {rows}
            </VStack>
        );
    }

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
            <InputText setValue={setMail} placeHolder="mail" type="email" color={'blue'} />
            <Center height='50px'>
                <Divider orientation='vertical' />
            </Center>
            <InputText setValue={setPassword} placeHolder="password" type="password" color={'blue'} />
        </VStack>


        <VStack marginTop={-750} spacing="5px">
            <DisplaySignInButtun mail={mail} password={password} ></DisplaySignInButtun>
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
