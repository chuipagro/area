import React from 'react';
import '../app/App.css';
import { Center, Text, HStack, VStack, Link, Button, Divider, Box, Img, Heading } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import leftArrow from '../app/leftArrow.png'
import { Taskbar } from '../component/VerticalTaskbar';

export const CreateArea = (): JSX.Element => {
    const navigate = useNavigate()
    const [isError, setIsError] = React.useState(false)
    const [action, setAction] = React.useState(false)
    const [reaction, setReaction] = React.useState(false);

    const [actionVisibility, setactionVisibility] = React.useState(true);
    const [reactionVisibility, setReactionVisibility] = React.useState(true);


    //for the json
    const [serviceActionJson, setServiceActionJson] = React.useState("");
    const [serviceReactionJson, setServiceReactionJson] = React.useState("");
    const [actionJson, setActionJson] = React.useState("");
    const [reactionJson, setReactionJson] = React.useState("");

    const [jsonAREA, setJsonAREA] = React.useState({});
    const storedUsername = localStorage.getItem("userMail");

    const updateJsonAREA = () => {
        setJsonAREA({
            reaction_service: serviceReactionJson,
            action_service: serviceActionJson,
            reaction_type: reactionJson,
            action_type: actionJson,
        });
    };

    React.useEffect(() => {
        console.log(jsonAREA);
        console.log(storedUsername);
    }, [jsonAREA]);




    //for the colors
    const [ActionColor, setActionColor] = React.useState("");
    const [ReactionColor, setReactionColor] = React.useState("");

    const [defaultActionColor, setDefaultActionColor] = React.useState("grey");
    const [defaultReactionColor, setDefaultReactionColor] = React.useState("grey");

    //for the title and description
    const [defaultActionTitle, setDefaultActionTitle] = React.useState("click here to choose an action");
    const [defaultReactionTitle, setDefaultReactionTitle] = React.useState("click here to choose a reaction");
    const [defaultActionDesc, setDefaultActionDesc] = React.useState("");
    const [defaultReactionDesc, setDefaultReactionDesc] = React.useState("");

    const [ActionTitle, setActionTitle] = React.useState("");
    const [ReactionTitle, setReactionTitle] = React.useState("");



    type Data = {
        [key: string]: {
            logo: string;
            color: {
                red: string;
                green: string;
                blue: string;
            };
            actions: {
                [actionKey: string]: string;
            };
            reaction: {
                [reactionKey: string]: string;
            };
        };
    };

    const [jsonData, setJsonData] = React.useState<Data | {}>({});

    const fetchJsonData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/AREA');
            if (response.status === 200) {
                setJsonData(response.data);
            } else {
                console.error('Failed to fetch JSON data');
                // navigate('/home');
                navigate('/create');
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    };

    React.useEffect(() => {
        fetchJsonData();
    }, []);

    // const jsonData: Data = {
    //     "discord": {
    //         "logo": "https://www.google.com/url?sa=i&url=https%3A%2F%2Frobots.net%2Ftech%2Fwhat-is-the-discord-logo%2F&psig=AOvVaw0Z3OAC_3iEb3nixFmhkj6P&ust=1696515419834000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiT2MnK3IEDFQAAAAAdAAAAABAI",
    //         "color": {
    //             "red": "114",
    //             "green": "137",
    //             "blue": "218"
    //         },
    //         "actions": {
    //             "action1": "se faire ping",
    //             "action2": "recevoir un message"
    //         },
    //         "reaction": {
    //             "reaction1": "ping qq",
    //             "reaction2": "envoyer un message"
    //         }
    //     },
    //     "youtube": {
    //         "logo": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.m.wikipedia.org%2Fwiki%2FFichier%3AYouTube_social_white_squircle.svg&psig=AOvVaw0qUR1L0bo8bsFZc-dejkU-&ust=1696515475048000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDb5-PK3IEDFQAAAAAdAAAAABAE",
    //         "color": {
    //             "red": "255",
    //             "green": "0",
    //             "blue": "0"
    //         },
    //         "actions": {
    //             "action1": "qq poste une video",
    //             "action2": "en gros y a une 2eme action"
    //         },
    //         "reaction": {
    //             "reaction1": "poster une video",
    //             "reaction2": "poster un commentaire qui dis first"
    //         }
    //     }
    // };

    const callApi = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedUsername}`,
            };

            const requestBody = {
                jsonAREA: jsonAREA,
            };

            const response = await axios.post('http://localhost:3000/create', requestBody, { headers });

            console.log('Response:', response.data);
            if (response.status === 200) {
                alert("AREA created successfully");
                navigate('/home');
            } else {
                alert("AREA not created");
                navigate('/home');
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleSignup = () => {
        callApi().then(response => {
        }).catch(error => {
            console.log(error);
            setIsError(true);
        });
    }

    const handleAction = () => {
        if (!actionVisibility)
            setactionVisibility(true);
        if (!action)
            setAction(true);
        if (action)
            setAction(false)
    }

    const handleReaction = () => {
        if (!reaction)
            setReaction(true);
        if (reaction)
            setReaction(false)
    }

    const handleActionsVisibility = () => {
        if (!actionVisibility)
            setactionVisibility(true);
        if (actionVisibility)
            setactionVisibility(false)
    }

    const handleReactionsVisibility = () => {
        if (!reactionVisibility)
            setReactionVisibility(true);
        if (reactionVisibility)
            setReactionVisibility(false)
    }


    function Title() {
        return (
            <Text marginTop={10} marginLeft={790} color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Create your AREA</Text>
        );
    }


    //-----------------[REACTION]-------------------------

    function CallEndReactions({ reactionKey }: { reactionKey: string; }) {

        setReactionJson(reactionKey);
        console.log(`title in call action = ${reactionKey}`)
        handleReactionsVisibility();
        handleReaction();
        setDefaultReactionColor(ReactionColor);

        setDefaultReactionDesc(reactionKey);
        setDefaultReactionTitle(ReactionTitle);
    }

    function DisplayReactions({ title, reaction, color }: { title: string; reaction: { [reactionKey: string]: string }; color: string }) {
        const reactionBoxes: JSX.Element[] = [];
        Object.keys(reaction).forEach((reactionKey) => {
            const reactionDescription = reaction[reactionKey];
            const reactionBox = (
                <Box
                    key={reactionKey}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    boxSize={300}
                    inlineSize={300}
                    color={"#CCCCCC"}
                    backgroundColor={color}
                    onClick={() => CallEndReactions({ reactionKey })}
                >
                    <Heading fontSize="xl">{reactionKey}</Heading>
                    <Text mt={4}>{reactionDescription}</Text>
                </Box>
            );
            reactionBoxes.push(reactionBox);
        });
        return <VStack>
            {reactionBoxes}
        </VStack>;
    }

    function CallReactions({ title, color }: { title: string; color: string }) {
        if (reactionJson.length != 0) {
            setReactionJson("");
        }
        console.log(`title in call reaction = ${title}`)
        handleReactionsVisibility();
        setServiceReactionJson(title);
        setReactionColor(color);

        setReactionTitle(title);
    }


    function DisplayServiceReaction({ title, desc, color, size, data, key }: { title: string, desc: string, color: string, size: number, data: any, key: number }) {
        const rows = [];

        if (serviceReactionJson === title && reactionJson.length === 0) {
            console.log({ serviceReactionJson });
            rows.push(
                <DisplayReactions title={title} reaction={data.reaction} color={color} />
            )
        } else if (reactionVisibility) {
            rows.push(
                <Box onClick={() => CallReactions({ title, color })} p={5} shadow='md' borderWidth='1px' marginLeft={200} boxSize={300} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
                    <Heading fontSize='xl'>{title}</Heading>


                    <Text mt={4}>{desc}</Text>
                </Box>
            )
        }
        return (
            <VStack>{rows}</VStack>
        )
    }

    function ServicesReaction() {
        const rows = [];
        let numrows = Object.keys(jsonData).length;
        const jsonKeys = Object.keys(jsonData);
        let nb1: number = 600;
        let nb2: number = 300;
        const jsonArray: Data[] = Object.keys(jsonData).map((key) => ({
            [key]: (jsonData as Data)[key],
        }));
        let i: number = 0;

        const index = 0;
        const element = jsonArray[index];

        const dataArray = [];
        let y: number = 0;
        for (const service in jsonData) {
            if (jsonData.hasOwnProperty(service)) {
                const serviceData = (jsonData as Data)[service];

                dataArray.push({
                    service: service,
                    logo: serviceData.logo,
                    color: serviceData.color,
                    actions: serviceData.actions,
                    reaction: serviceData.reaction,
                });
            }
            y++;
        }


        for (let i = 0; i < dataArray.length; i++) {
            const serviceObject = dataArray[i];
            rows.push(
                <VStack key={i}>
                    <DisplayServiceReaction
                        title={`${serviceObject.service}`}
                        desc=""
                        color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
                        size={nb1}
                        data={serviceObject}
                        key={i}
                    />
                </VStack>);
        }
        return (
            <VStack>

                {rows}
            </VStack>
        );
    }

    //-----------------[ACTION]-------------------------

    function CallEndActions({ actionKey }: { actionKey: string; }) {

        setActionJson(actionKey);

        handleActionsVisibility();
        handleAction();

        setDefaultActionColor(ActionColor);

        setDefaultActionTitle(ActionTitle);
        setDefaultActionDesc(actionKey);

        console.log(`title in call action = ${actionKey}`)
    }

    function DisplayActions({ title, actions, color }: { title: string; actions: { [actionKey: string]: string }; color: string }) {
        const actionBoxes: JSX.Element[] = [];
        Object.keys(actions).forEach((actionKey) => {
            const actionDescription = actions[actionKey];
            const actionBox = (
                <Box
                    key={actionKey}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    boxSize={300}
                    inlineSize={300}
                    color={"#CCCCCC"}
                    backgroundColor={color}
                    onClick={() => CallEndActions({ actionKey })}
                >
                    <Heading fontSize="xl">{actionKey}</Heading>
                    <Text mt={4}>{actionDescription}</Text>
                </Box>
            );
            actionBoxes.push(actionBox);
        });
        return <VStack>
            {actionBoxes}
        </VStack>;
    }

    function CallActions({ title, color }: { title: string; color: string }) {
        if (actionJson.length != 0) {
            setActionJson("");
        }

        handleActionsVisibility();
        setServiceActionJson(title);
        setActionColor(color);
        setActionTitle(title);
        console.log(`title in call action = ${title}`)
    }


    function DisplayService({ title, desc, color, size, data, key }: { title: string, desc: string, color: string, size: number, data: any, key: number }) {
        const rows = [];

        if (serviceActionJson === title && actionJson.length === 0) {
            rows.push(
                <DisplayActions title={title} actions={data.actions} color={color} />
            )
        } else if (actionVisibility) {
            rows.push(
                <Box onClick={() => CallActions({ title, color })} p={5} shadow='md' borderWidth='1px' boxSize={300} marginLeft={200} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
                    <Heading fontSize='xl'>{title}</Heading>


                    <Text mt={4}>{desc}</Text>
                </Box>
            )
        }
        return (
            <VStack>{rows}</VStack>
        )
    }

    function Services() {
        const rows = [];
        let numrows = Object.keys(jsonData).length;
        const jsonKeys = Object.keys(jsonData);
        let nb1: number = 600;
        let nb2: number = 300;
        const jsonArray: Data[] = Object.keys(jsonData).map((key) => ({
            [key]: (jsonData as Data)[key],
        }));
        let i: number = 0;

        const index = 0;
        const element = jsonArray[index];

        const dataArray = [];
        let y: number = 0;
        for (const service in jsonData) {
            if (jsonData.hasOwnProperty(service)) {
                const serviceData = (jsonData as Data)[service];

                dataArray.push({
                    service: service,
                    logo: serviceData.logo,
                    color: serviceData.color,
                    actions: serviceData.actions,
                    reaction: serviceData.reaction,
                });
            }
            y++;
        }


        for (let i = 0; i < dataArray.length; i++) {
            const serviceObject = dataArray[i];
            rows.push(
                <VStack key={i}>
                    <DisplayService
                        title={`${serviceObject.service}`}
                        desc=""
                        color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
                        size={nb1}
                        data={serviceObject}
                        key={i}
                    />
                </VStack>);
        }
        return (
            <VStack>

                {rows}
            </VStack>
        );
    }

    //-----------------[DISPLAY]-------------------------

    function Display() {

        let rows = [];
        if (!action && !reaction) (
            rows.push(
                <HStack spacing="500px">
                    <Box onClick={handleAction} marginTop={50} marginLeft={200} boxSize={370} blockSize={500} borderRadius='md' bg={defaultActionColor} color='white' px={4} h={8}>
                        <Heading fontSize='xl'>{defaultActionTitle}</Heading>
                        <Text mt={4}>{defaultActionDesc}</Text>
                    </Box>
                    <Box onClick={handleReaction} marginTop={50} boxSize={370} blockSize={500} borderRadius='md' bg={defaultReactionColor} color='white' px={4} h={8}>
                        <Heading fontSize='xl'>{defaultReactionTitle}</Heading>
                        <Text mt={4}>{defaultReactionDesc}</Text>
                    </Box>
                </HStack>
            )
        )
        if (action) (
            rows.push(
                <div>
                    <img src={leftArrow} onClick={handleAction} width={30} style={{ marginRight: '1800px' }} ></img>
                    <Services />
                </div>
            )
        )
        if (reaction) (
            rows.push(
                <div>
                    <img src={leftArrow} onClick={handleReaction} width={30} style={{ marginRight: '1800px' }} ></img>
                    <ServicesReaction />
                </div>
            )
        )
        if (serviceActionJson.length != 0 && serviceReactionJson.length != 0 && actionJson.length != 0 && reactionJson.length != 0 && !action && !reaction) (
            rows.push(
                <div>
                    <Button onClick={updateJsonAREA} marginTop={100} marginLeft={200} boxSize={370} blockSize={50} borderRadius='md' bg='black' color='white' px={4} h={8}>
                        <Heading fontSize='xl'>Create your AREA</Heading>
                    </Button>
                </div>
            )
        )

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
        <Title />
        <Display></Display>
    </div>
}
