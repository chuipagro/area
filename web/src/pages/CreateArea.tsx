import React from 'react';
import '../app/App.css';
import { Center, Text, HStack, VStack, Link, Button, Divider, Box, Img, Heading } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import leftArrow from '../app/leftArrow.png'


export const CreateArea = (): JSX.Element => {
    const navigate = useNavigate()
    const [isError, setIsError] = React.useState(false)
    const [action, setAction] = React.useState(false)
    const [reaction, setReaction] = React.useState(false)
    const [feurVisible, setFeurVisible] = React.useState(true);

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

    const jsonData: Data = {
        "discord": {
            "logo": "https://www.google.com/url?sa=i&url=https%3A%2F%2Frobots.net%2Ftech%2Fwhat-is-the-discord-logo%2F&psig=AOvVaw0Z3OAC_3iEb3nixFmhkj6P&ust=1696515419834000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiT2MnK3IEDFQAAAAAdAAAAABAI",
            "color": {
                "red": "114",
                "green": "137",
                "blue": "218"
            },
            "actions": {
                "action1": "se faire ping",
                "action2": "recevoir un message"
            },
            "reaction": {
                "reaction1": "ping qq",
                "reaction2": "envoyer un message"
            }
        },
        "youtube": {
            "logo": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.m.wikipedia.org%2Fwiki%2FFichier%3AYouTube_social_white_squircle.svg&psig=AOvVaw0qUR1L0bo8bsFZc-dejkU-&ust=1696515475048000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDb5-PK3IEDFQAAAAAdAAAAABAE",
            "color": {
                "red": "255",
                "green": "0",
                "blue": "0"
            },
            "actions": {
                "action1": "qq poste une video",
                "action2": "en gros y a une 2eme action"
            },
            "reaction": {
                "reaction1": "poster une video",
                "reaction2": "poster un commentaire qui dis first"
            }
        }
    };

    const callApi = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
            });
            return response.data;
        } catch (error) {
            console.error('Il y a eu une erreur!', error);
            setIsError(true);
            return null;
        }
    }

    const handleSignup = () => {
        callApi().then(response => {
        }).catch(error => {
            console.log(error);
            setIsError(true);
        });
    }

    const handleAction = () => {
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



    function Title() {
        return (
            <Text marginTop={10} marginLeft={860} color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Create your AREA</Text>
        );
    }

    function Feature({ title, desc, color, size, data }: { title: string, desc: string, color: string, size: number, data: any }) {
        //console.log(data.key);
        return (
            <Box p={5} shadow='md' borderWidth='1px' boxSize={300} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
                <Heading fontSize='xl'>{title}</Heading>
                <Text mt={4}>{desc}</Text>
            </Box>
        )
    }

    function Feur() {
        const rows = [];
        let numrows = Object.keys(jsonData).length;
        const jsonKeys = Object.keys(jsonData);
        let nb1: number = 600;
        let nb2: number = 300;
        const jsonArray: Data[] = Object.keys(jsonData).map((key) => ({
            [key]: jsonData[key],
        }));
        let i: number = 0;

        const index = 0; // Replace with the desired index
        const element = jsonArray[index];

        // Initialize an empty array to store the converted objects
        const dataArray = [];

        // Iterate through the JSON object and convert each service into an object
        for (const service in jsonData) {
            if (jsonData.hasOwnProperty(service)) {
                const serviceData = jsonData[service];

                // Add each service as an object to the dataArray
                dataArray.push({
                    service: service,
                    logo: serviceData.logo,
                    color: serviceData.color,
                    actions: serviceData.actions,
                    reaction: serviceData.reaction,
                });
            }
        }

        // Now you can iterate over the dataArray with a numeric index
        for (let i = 0; i < dataArray.length; i++) {
            const serviceObject = dataArray[i];
            console.log(`Service: ${serviceObject.service}`);
            console.log(`Logo URL: ${serviceObject.logo}`);
            let color: string = `rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`
            console.log(`Color: ${serviceObject.color.red}, ${serviceObject.color.green}, ${serviceObject.color.blue}`);
            console.log(`Actions: ${serviceObject.actions.action1}, ${serviceObject.actions.action2}`);
            console.log(`Reactions: ${serviceObject.reaction.reaction1}, ${serviceObject.reaction.reaction2}`);
        }


        for (let i = 0; i < dataArray.length; i++) {
            const serviceObject = dataArray[i];
            rows.push(
                <VStack key={i}>
                    <Feature
                        title={`${serviceObject.service}`}
                        desc='The future can be even brighter but a goal without a plan is just a wish'
                        color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
                        size={nb1}
                        data={serviceObject}
                    />
                </VStack>)
            // if (i + 1 >= numrows) {
            //     rows.push(
            //         <VStack key={i}>
            //             <Feature
            //                 title={`${serviceObject.service}`}
            //                 desc='The future can be even brighter but a goal without a plan is just a wish'
            //                 color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
            //                 size={nb1}
            //                 data={serviceObject}

            //             />
            //         </VStack>
            //     );
            // } else {
            //     const pair = (
            //         <HStack key={i} spacing={'10px'} >
            //             <Feature
            //                 title={`${serviceObject.service}`}
            //                 desc='The future can be even brighter but a goal without a plan is just a wish'
            //                 color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
            //                 size={nb2}
            //                 data={serviceObject}
            //             />
            //             {i + 1 < dataArray.length && (
            //                 <Feature
            //                     title={`${serviceObject.service}`}
            //                     desc='The future can be even brighter but a goal without a plan is just a wish'
            //                     color={`rgb(${serviceObject.color.red} ${serviceObject.color.green} ${serviceObject.color.blue})`}
            //                     size={nb2}
            //                     data={serviceObject}
            //                 />
            //             )}
            //         </HStack>
            //     );
            //     rows.push(pair);
            // i++;
            // }
            // i++
        }
        return (
            <VStack>
                <Text>ouais</Text>
                {rows}
            </VStack>
        );
    }

    function Display() {
        let rows = [];

        if (!action && !reaction) (
            rows.push(
                <HStack spacing="500px">
                    <Box onClick={handleAction} marginTop={200} marginLeft={300} boxSize={370} blockSize={500} borderRadius='md' bg='grey' color='white' px={4} h={8}>test</Box>
                    <Box onClick={handleReaction} marginTop={200} boxSize={370} blockSize={500} borderRadius='md' bg='grey' color='white' px={4} h={8}>test</Box>
                </HStack>
            )
        )
        //rows = [];
        if (action) (
            rows.push(
                <div>
                    <img src={leftArrow} onClick={handleAction} width={30} style={{ marginRight: '1800px' }} ></img>
                    <Feur></Feur>
                </div>
            )
        )

        if (reaction) (
            rows.push(
                <div>
                    <img src={leftArrow} onClick={handleReaction} width={30} style={{ marginRight: '1800px' }} ></img>
                    <Text>en gros ouais</Text>
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

        <Display></Display>
    </div>
}
