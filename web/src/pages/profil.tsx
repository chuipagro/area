import React from 'react';
import '../app/App.css';
import { Text, VStack, Input, Button, Heading, Stack, HStack, Box, list } from '@chakra-ui/react';
import { Taskbar } from '../component/VerticalTaskbar';
import { DisconnectButtun } from '../component/disconnect';
import axios from 'axios';

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
 * interface for the input
 */
interface InputProps {
    setValue: (value: string) => void;
    placeHolder: string;
    type: "text" | "email" | "password" | "file";
    color: string;
    margin: string;
}


/**
 * This function display an input
 * @param setValue
 * @param placeHolder
 * @param type
 * @param color
 * @param margin
 * @returns Input
 */
export function InputText({ setValue, placeHolder, type, color, margin }: InputProps): JSX.Element {

    const inputStyle = {
        width: '50%',
    };

    return (
        <Input
            pr='4.5rem'
            marginLeft={margin}
            type={type}
            color={color}
            placeholder={placeHolder}
            onChange={e => setValue(e.target.value)}
            style={inputStyle}
        />
    );
}


/**
 * This function display a page with the title and the taskbar
 */
export const Profile = (): JSX.Element => {

    type User = {
        auth: {
            oauthName: string;
            token: string;
            refreshToken: string | null;
            _id: string;
        }[];
        mail: string;
        password: string;
        picture: string | null;
        token: string;
        uid: string;
        username: string;
        __v: number;
        _id: string;
    };

    const listOA2 = ["google", "spotify", "github"]

    // const mailRef = React.useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = React.useState("");
    React.useEffect(() => {
        if (email !== "") {
            console.log("email=" + email)
            updateMail()
        }
    }, [email]);


    const [username, setUsername] = React.useState("");
    React.useEffect(() => {
        if (username !== "") {
            console.log("username=" + username)
            updateUsername()
        }
    }, [username]);

    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    React.useEffect(() => {
        if (password !== "" && newPassword !== "") {
            console.log("password=" + password)
            console.log("newPassword=" + newPassword)
            updatePassword()
        }
    }, [password, newPassword]);

    const token = localStorage.getItem("token");
    const [jsonDataUser, setJsonDataUser] = React.useState<User | null>(null);
    const [oauthNames, setOauthNames] = React.useState<string[]>([]);


    React.useEffect(() => {
        if (jsonDataUser !== null) {
            setOauthNames(jsonDataUser.auth.map((authItem) => authItem.oauthName));
        }
    }, [jsonDataUser]);

    /**
     * this function fetch the json data from the api
     */
    const fetchJsonDataOA2 = async () => {
        try {
            console.log('Fetching JSON data...');

            const body = {
                "token": token
            }

            const response = await axios.post('http://localhost:8080/user/getUserInfo', body);
            if (response.status === 200) {
                setJsonDataUser(response.data.user);
            } else {
                console.error('Failed to fetch JSON data');
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    };

    /**
    * called at the launch of the page to fetch the json data
    */
    React.useEffect(() => {
        fetchJsonDataOA2();
    }, []);

    /**
     * this function call the api to update the mail of a user
     */
    const updateMail = async () => {
        try {
            console.log("email=" + email)
            const body = {
                "token": token,
                "mail": email
            }

            const response = await axios.post('http://localhost:8080/user/changeMail', body
            );

            if (response.status === 200) {
                alert("you successfully upadated your email");
            } else {
                alert("you failed to update your email");
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * this function call the api to update the username of a user
     */
    const updateUsername = async () => {
        try {

            if (username == "") {
                alert("you need to enter your new username");
                return;
            }

            const body = {
                "token": token,
                "username": username
            }

            const response = await axios.post('http://localhost:8080/user/changeUsername', body
            );

            if (response.status === 200) {
                alert("you successfully upadated your username");
            } else {
                alert("you failed to update your username");
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * this function call the api to update the password of a user
     */
    const updatePassword = async () => {
        try {

            if (password == "" || newPassword == "") {
                alert("you need to enter your current password and your new password");
                return;
            }

            if (password == newPassword) {
                alert("your new password is the same as the old one");
                return;
            }

            const body = {
                "token": token,
                "password": password,
                "newPassword": newPassword
            }

            const response = await axios.post('http://localhost:8080/user/changePassword', body
            );

            if (response.status === 200) {
                alert("you successfully upadated your password");
            } else {
                alert("you failed to update your password");
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };


    /**
     * this function display a box with the name of the oauth2 connection
     */
    //function DisplayOauthNames() {
    //    const row = [];
//
    //    for (let i = 0; i < listOA2.length; i++) {
    //        if (listOA2.includes(oauthNames[i])) {
    //            console.log(oauthNames[i])
    //            row.push(
    //                <Box p={5}
    //                    // onClick={}
    //                    shadow='md'
    //                    borderRadius={30}
    //                    borderWidth='1px'
    //                    boxSize={100}
    //                    inlineSize={500}
    //                    color={'#CCCCCC'}
    //                    backgroundColor={"black"}>
    //                    {oauthNames[i]}
    //                </Box>
    //            );
    //        } else {
    //            console.log(oauthNames[i])
    //            row.push(
    //                <Box p={5}
    //                    // onClick=()
    //                    shadow='md'
    //                    borderRadius={30}
    //                    borderWidth='1px'
    //                    boxSize={100}
    //                    inlineSize={500}
    //                    color={'#CCCCCC'}
    //                    backgroundColor={"black"}>
    //                    Click to connect to {listOA2[i]}
    //                </Box>
    //            );
    //        }
    //    }
    //    return (
    //        <VStack marginLeft={"-350px"} marginTop={"5%"} spacing="0px">
    //            <Heading marginLeft={"-160px"} size="lg" color="black" marginTop={30} >Your OAuth2 connections</Heading>
    //            {row}
    //        </VStack>
    //    );
    //}

    /**
     * this function display a set of inputs for the user to modify his credencials
     */
    function Account() {

        const inputStyle = {
            width: '50%',
        };

        let placeHolderMail: string = ""
        let placeHolderUsername: string = ""

        if (jsonDataUser !== null) {
            placeHolderMail = jsonDataUser.mail
            placeHolderUsername = jsonDataUser.username
        }

        const [emailTemp, setEmailTemp] = React.useState<string>('');
        const [usernameTemp, setUsernameTemp] = React.useState<string>('');
        const [passwordTemp, setPasswordTemp] = React.useState<string>('');
        const [newPasswordTemp, setNewPasswordTemp] = React.useState<string>('');

        const handleMail = () => {
            setEmail(emailTemp)
        };
        const handleUsername = () => {
            setUsername(usernameTemp)
        }
        const handlePassword = () => {
            setPassword(passwordTemp)
            setNewPassword(newPasswordTemp)
        }

        return (
            <div>
                <Stack marginLeft={500} marginTop={30} spacing="0px">
                    <Heading size="lg" color="black" marginTop={30} >Account</Heading>


                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }}
                            marginTop={30} marginLeft={0}>Change Your Email</Text>
                        <Button color="black" backgroundColor="white"
                            borderColor="black" variant='outline' size="s"
                            marginTop={30} marginLeft={"27%"}
                            onClick={() => handleMail()}>Click To Update</Button>
                    </HStack>
                    <InputText margin="2%" setValue={setEmailTemp}
                        placeHolder={placeHolderMail} type="text" color="black" />


                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }}
                            marginTop={30} marginLeft={0}>Change Your Username</Text>
                        <Button color="black" backgroundColor="white"
                            borderColor="black" variant='outline' size="s"
                            marginTop={30} marginLeft={"23.5%"}
                            onClick={() => handleUsername()}>Click To Update</Button>
                    </HStack>
                    <InputText margin="2%" setValue={setUsernameTemp}
                        placeHolder={placeHolderUsername} type="text" color="black" />


                    <HStack marginLeft={1} marginTop={0} spacing="0px">
                        <Text color="black" fontSize={{ base: '20px' }}
                            marginTop={30} marginLeft={0}>Change Your Password</Text>
                        <Button color="black" backgroundColor="white"
                            borderColor="black" variant='outline' size="s"
                            marginTop={30} marginLeft={"24%"}
                            onClick={() => handlePassword()}>Click To Update</Button>
                    </HStack>
                    <InputText margin="2%" setValue={setPasswordTemp} placeHolder={"enter your current password"}
                        type="text" color="black" />
                    <Text marginTop={"2%"}></Text>
                    <InputText margin="2%" setValue={setNewPasswordTemp} placeHolder={"enter your new password"}
                        type="text" color="black" />

                </Stack>
            </div>
        );
    }

    /**
     * this function display the page
     */
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
