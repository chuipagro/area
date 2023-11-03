import React from 'react';
import '../app/App.css';
import { Input, Text, HStack, VStack, Button, Box, Heading, Alert, Grid, Stack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import leftArrow from '../app/leftArrow.png'
import ArrowArea from '../app/ArrowArea.png'
import { Taskbar } from '../component/VerticalTaskbar';
import { DisconnectButtun } from '../component/disconnect';

/**
 * interface for the props of the create area page
 */
interface CreateAreaProps {
    PUpdate: boolean;
    PNameArea: string;
    PUsername: string;
    PActive: boolean;
    PServiceAType: number;
    PActionType: number;
    PServiceRType: number;
    PReactionType: number;
    PActionsNeeds: { key: string; data: any }[];
    PReactionsNeeds: { key: string; data: any }[];
}

/**
 * This page display the create area page with the services and the actions/reactions
 */
export const CreateArea = (props: CreateAreaProps): JSX.Element => {
    const {
        PUpdate,
        PNameArea,
        PUsername,
        PActive,
        PServiceAType,
        PActionType,
        PServiceRType,
        PReactionType,
        PActionsNeeds,
        PReactionsNeeds,
    } = props;

    const navigate = useNavigate()

    const areaName = React.useRef<HTMLInputElement | null>(null);

    const [areaReceived, setAreaReceived] = React.useState(false);
    const [isErrorReceived, setIsErrorReceived] = React.useState(false)

    const [isError, setIsError] = React.useState(false)
    const [action, setAction] = React.useState(false)
    const [reaction, setReaction] = React.useState(false);

    const [actionVisibility, setactionVisibility] = React.useState(true);
    const [reactionVisibility, setReactionVisibility] = React.useState(true);

    const [actionNeedDisplay, setActionNeedDisplay] = React.useState(false);
    const [reactionNeedDisplay, setReactionNeedDisplay] = React.useState(false);


    //for the json
    const [name, setName] = React.useState("");

    const [serviceActionJson, setServiceActionJson] = React.useState("");
    const [serviceReactionJson, setServiceReactionJson] = React.useState("");
    const [actionJson, setActionJson] = React.useState("");
    const [reactionJson, setReactionJson] = React.useState("");

    const [jsonAREA, setJsonAREA] = React.useState({});
    const storedUsername = localStorage.getItem("userMail");
    const token = localStorage.getItem("token");
    const [readyToCreate, setReadyToCreate] = React.useState(false);

    const [NeedActions, setNeedActions] = React.useState<{ [key: string]: string }>({});
    const [NeedReactions, setNeedReactions] = React.useState<{ [key: string]: string }>({});



    //for the colors
    const [ActionColor, setActionColor] = React.useState("");
    const [ReactionColor, setReactionColor] = React.useState("");

    const [defaultActionColor, setDefaultActionColor] = React.useState("grey");
    const [defaultReactionColor, setDefaultReactionColor] = React.useState("grey");

    //for the title and description of the services
    const [defaultActionTitle, setDefaultActionTitle] = React.useState("click here to choose an action");
    const [defaultReactionTitle, setDefaultReactionTitle] = React.useState("click here to choose a reaction");
    const [defaultActionDesc, setDefaultActionDesc] = React.useState("");
    const [defaultReactionDesc, setDefaultReactionDesc] = React.useState("");

    const [ActionTitle, setActionTitle] = React.useState("");
    const [actionDesc, setActionDesc] = React.useState("");

    const [ReactionTitle, setReactionTitle] = React.useState("");
    const [reactionDesc, setReactionDesc] = React.useState("");

    //for the id of the services of the actions/reactions
    const [ASid, setASid] = React.useState(-1);
    const [Aid, setAid] = React.useState(-1);
    const [RSid, setRSid] = React.useState(-1);
    const [Rid, setRid] = React.useState(-1);



    /**
     * Types use to parse the json received from the server (services/getAllServices call)
     */
    type Data = {
        [key: string]: {
            name: string;
            logo: string;
            color: {
                red: string;
                green: string;
                blue: string;
            };
            actions: {
                [actionKey: number]: ActionData;
            };
            reactions: {
                [reactionKey: number]: ReactionData;
            };
        };
    };
    /**
     * Types use in type Data which is used to parse the json received from the server (services/getAllServices call)
     */
    type ActionData = string | ActionObject;
    /**
     * Types use in type Data which is used to parse the json received from the server (services/getAllServices call)
     */
    type ReactionData = string | ReactionObject;
    /**
     * Types use in type Data which is used to parse the json received from the server (services/getAllServices call)
    */
    type ActionObject = {
        description: string;
        id: number;
        need: {
            [key: string]: {
                type: string;
                required: boolean;
            };
        };
    };
    /**
     * Types use in type Data which is used to parse the json received from the server (services/getAllServices call)
    */
    type ReactionObject = {
        description: string;
        id: number;
        need: {
            [key: string]: {
                type: string;
                required: boolean;
            };
        };
    };

    const [jsonData, setJsonData] = React.useState<Data | {}>({});

    /**
     * This function fetch the json data from the server in order to display the services and the actions/reactions available
     */
    const fetchJsonData = async () => {
        try {
            console.log('Fetching JSON data...');
            const response = await axios.get('http://localhost:8080/services/getAllServices');
            if (response.status === 200) {
                console.log('list service json');
                console.log(response.data.services)
                setJsonData(response.data.services);
                setAreaReceived(true);
            } else {
                setIsErrorReceived(true);
                console.error('Failed to fetch JSON data');
                // navigate('/home');
                navigate('/create');
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    };

    /**
     * called at the launch of the page to fetch the json data
     */
    React.useEffect(() => {
        fetchJsonData();
    }, []);

    /**
     * called at the launch of the page to check the arguments
     */
    React.useEffect(() => {

        if (
            PUpdate &&
            PNameArea !== '' &&
            PUsername !== '' &&
            PServiceAType > 0 &&
            PActionType > 0 &&
            PServiceRType > 0 &&
            PReactionType > 0 &&
            Array.isArray(PActionsNeeds) &&
            Array.isArray(PReactionsNeeds) &&
            PActionsNeeds.length > 0 &&
            PReactionsNeeds.length > 0
        ) {
            console.log('All values are filled');
        } else {
            console.log('All values are not filled');
        }
    }, [
        PUpdate,
        PNameArea,
        PUsername,
        PServiceAType,
        PActionType,
        PServiceRType,
        PReactionType,
        PActionsNeeds,
        PReactionsNeeds,
    ]);

    /**
     * This function call the api to create the AREA
     */
    const callApiCreate = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedUsername} `,
            };

            const test1 = defaultActionTitle.trim()
            const test2 = defaultReactionTitle.trim()

            const data = {
                [test1]: NeedActions,
                [test2]: NeedReactions,
            };
            console.log("data =" + test1 + ".")

            const body = {
                "title": name,
                "active": true,
                "createdBy": token,
                "action": { "type": Aid, "service": ASid },
                "reaction": { "type": Rid, "service": RSid },
                "launchType": "manual",
                "data": data
            };

            const response = await axios.post('http://localhost:8080/area/createArea', body
            );

            if (response.status == 200) {
                alert("AREA created successfully");
                navigate('/home');
            } else {
                alert("AREA not created");
                navigate('/create');
            }

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;

        }
    };

    /**
     * the name variable is set when the user click on the button to create an area
     */
    React.useEffect(() => {
        console.log(`title = ${name}`)
        console.log(`crated by = ${token}`)
        console.log("active = true")
        console.log(`action = { type: ${Aid} service: ${ASid} }`)
        console.log(`reaction = { type: ${Rid} service: ${RSid} }`)
        const data = {
            [defaultActionTitle]: NeedActions,
            [defaultReactionTitle]: NeedReactions,
        };
        console.log(`data = ${data}`);
        console.log("now calling api");
        if (name !== "")
            callApiCreate();
    }, [name]);


    /**
     * This function handle what to display when the user click on the action button
     */
    const handleAction = () => {
        if (!actionVisibility)
            setactionVisibility(true);
        if (!action)
            setAction(true);
        if (action)
            setAction(false)
        if (defaultActionDesc === "") {
            setServiceActionJson("")
        }
    }

    /**
     * This function handle what to display when the user click on the reaction button
     */
    const handleReaction = () => {
        if (!reactionVisibility)
            setReactionVisibility(true);
        if (!reaction)
            setReaction(true);
        if (reaction)
            setReaction(false)
        if (defaultReactionDesc === "") {
            setServiceReactionJson("")
        }
    }

    /**
     * This function handle what to display when the user click on the action button
     */
    const handleActionsVisibility = () => {
        if (!actionVisibility)
            setactionVisibility(true);
        if (actionVisibility)
            setactionVisibility(false)
    }

    /**
     * This function handle the what to display when the user click on the reaction button
     */
    const handleReactionsVisibility = () => {
        if (!reactionVisibility)
            setReactionVisibility(true);
        if (reactionVisibility)
            setReactionVisibility(false)
    }

    /**
     * This function display the title which is "Create your AREA"
     */
    function Title() {
        return (
            <Text marginTop={10} marginLeft={790} color="black" fontSize={{ base: '20px', md: '30px', lg: '60px' }}>Create your AREA</Text>
        );
    }


    //-----------------[REACTION]-------------------------

    /**
     * This function is used in the reaction part.
     * it is called when the user click on a reaction and set the json of the reaction of the action or when a user set the needs of an action
     **/
    function CallEndReactions({ reactionDescription, id }: { reactionDescription: string, id: number }) {

        setReactionJson(reactionDescription);
        console.log(`title in call action = ${reactionDescription} `)
        handleReactionsVisibility();
        if (!reaction)
            setReaction(true);
        if (reaction)
            setReaction(false)
        setDefaultReactionColor(ReactionColor);

        setDefaultReactionDesc(reactionDescription);
        setDefaultReactionTitle(ReactionTitle);
        setRid(id);
        setReactionNeedDisplay(false)
    }

    /**
    * This function is used in the action part.
    * it is called when the user click on a action and set the json of the action
    **/
    function setReactions({ reactionDescription }: { reactionDescription: string; }) {
        setReactionNeedDisplay(true);
        setReactionDesc(reactionDescription);
    }

    /**
     * This function is used in the reaction part.
     * it display the needs available for a reaction
     */
    function DisplayReactionNeed({ need, reactionDescription, id, color }: { need: { [key: string]: { type: string; required: boolean } }, reactionDescription: string, id: number, color: string }) {

        const [inputs, setInputs] = React.useState<{ [key: string]: string }>({});

        const handleInputChange = (key: string, value: string) => {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [key]: value,
            }));
        };

        const handleAddNeeds = () => {
            console.log(inputs);
            for (const key in inputs) {
                if (inputs.hasOwnProperty(key)) {
                    const element = inputs[key];
                    setNeedReactions((prevNeedReactions) => ({
                        ...prevNeedReactions,
                        [key]: element,
                    }));
                }
            }
            CallEndReactions({ reactionDescription, id });
        };
        return (
            <div>
                <Box p={5}
                    shadow='md'
                    borderRadius={30}
                    borderWidth='1px'
                    boxSize={800}
                    marginLeft={150}
                    inlineSize={1000}
                    color={'#CCCCCC'}
                    backgroundColor={color}>
                    {Object.keys(need).map((key) => (
                        <div key={key}>
                            <Input
                                marginTop={15}
                                type="text"
                                color="black"
                                backgroundColor={"white"}
                                borderColor={"black"}
                                placeholder={key}
                                value={inputs[key] || ''}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddNeeds} marginTop={100} marginLeft={"30%"} boxSize={370} blockSize={50} borderColor={"black"} borderRadius='md' bg='white' color='black' px={4} h={8}>
                        <Heading fontSize='xl'>Add Needs</Heading>
                    </Button>
                </Box>
            </div>
        );
    }

    /**
     * This function is used in the reaction part.
     * it display the reactions available for a service
     */
    function DisplayReactions({ title, reactions, color }: { title: string; reactions: { [reactionKey: string]: string }; color: string }) {
        const rows: JSX.Element[] = [];
        const reactionBoxes: JSX.Element[] = [];

        Object.keys(reactions).forEach((reactionKey) => {
            const reactionDescription = reactions[reactionKey];
            let reactionBox: JSX.Element | null = null;
            if (typeof reactionDescription === 'object') {
                if (reactionNeedDisplay) {
                    const reactionObject = reactionDescription as ReactionObject;
                    const desc = reactionObject.description;
                    const need = reactionObject.need;

                    if (desc !== "" && desc !== reactionDesc) {
                        rows.push(
                            <div />
                        )
                        return (
                            <VStack>
                                {rows}
                            </VStack>
                        )
                    }

                    rows.push(
                        <VStack>
                            <DisplayReactionNeed need={need} reactionDescription={desc} id={reactionObject.id} color={color} />
                        </VStack>
                    )
                    return (
                        <VStack>
                            {rows}
                        </VStack>
                    )
                }
                const reactionObject = reactionDescription as ReactionObject;
                const desc = reactionObject.description;
                const need = reactionObject.need;
                console.log("need = ")
                console.log(need);
                reactionBox = (
                    <Box
                        key={reactionKey}
                        p={5}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius={30}
                        boxSize={300}
                        inlineSize={300}
                        color={"#CCCCCC"}
                        backgroundColor={color}
                        onClick={() => setReactions({ reactionDescription: desc })}
                    >
                        <Heading fontSize="xl">{desc}</Heading>
                    </Box>
                );
            }
            if (reactionBox !== null)
                reactionBoxes.push(reactionBox);
        });

        if (rows.length != 0) {
            return (
                <VStack>
                    {rows}
                </VStack>
            )
        } else {
            return (
                <Grid marginTop="90px" marginLeft={0} templateColumns="repeat(4, 1fr)" gap={4}>
                    {reactionBoxes}
                </Grid>)
        }
    }

    /**
     * This function is used in the reaction part.
     * it is called when the user click on a service and set the json of the service
     **/
    function CallReactions({ title, color, id }: { title: string; color: string, id: number }) {
        if (reactionJson.length != 0) {
            setReactionJson("");
        }
        console.log(`title in call reaction = ${title} `)
        handleReactionsVisibility();
        setServiceReactionJson(title);
        setReactionColor(color);

        setReactionTitle(title);
        let nb: number = Number(id) + 1
        setRSid(nb);
    }

    /**
     * This function is used in the reaction part.
     * it display the services available
     */
    function DisplayServiceReaction({ title, desc, size, data, key }: { title: string, desc: string, size: number, data: any, key: number }) {

        const rows = [];
        let color = data.color;

        if (title === '_id')
            return (<VStack></VStack>)

        if (data.reactions.length === 0) {
            return (<VStack></VStack>)
        }

        if (serviceReactionJson === title && reactionJson.length === 0) {
            console.log({ serviceReactionJson });
            rows.push(
                <DisplayReactions title={title} reactions={data.reactions} color={color} />
            )
        } else if (reactionVisibility) {
            rows.push(
                <Box onClick={() => CallReactions({ title, color, id: data.service_id })} p={5} shadow='md' borderRadius={30} borderWidth='1px' marginLeft={200} boxSize={300} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
                    <Heading fontSize='xl'>{title}</Heading>
                    <Text mt={4}>{desc}</Text>
                </Box>
            )
        }
        return (
            <VStack>{rows}</VStack>
        )
    }

    /**
     * This function is used in the reaction part.
     * it parse the json received and display the services available
     */
    function ServicesReaction() {
        let nb1: number = 600;

        const dataArray = [];
        let y: number = 0;
        for (const service in jsonData) {
            if (jsonData.hasOwnProperty(service)) {
                const serviceData = (jsonData as Data)[service];

                dataArray.push({
                    service_id: service,
                    logo: serviceData.logo,
                    name: serviceData.name,
                    color: `rgb(${serviceData.color.red}, ${serviceData.color.green}, ${serviceData.color.blue})`,
                    actions: serviceData.actions,
                    reactions: serviceData.reactions,
                });
            }
            y++;
        }


        return (
            <div>
                {dataArray.map((serviceObject, i) => (
                    <VStack key={i} display="inline-block">
                        <DisplayServiceReaction
                            title={`${serviceObject.name} `}
                            desc=""
                            size={nb1}
                            data={serviceObject}
                            key={i}
                        />
                    </VStack>
                ))}
            </div>
        );
    }


    //-----------------[ACTION]-------------------------

    /**
     * This function is used in the action part.
     * it is called when the user click on a action and set the json of the action or when a user set the needs of an action
     **/
    function CallEndActions({ actionDescription, id }: { actionDescription: string, id: number }) {

        setActionJson(actionDescription);

        handleActionsVisibility();
        if (!action)
            setAction(true);
        if (action)
            setAction(false)

        setDefaultActionColor(ActionColor);

        setDefaultActionTitle(ActionTitle);
        setDefaultActionDesc(actionDescription);
        setAid(id);
        setActionNeedDisplay(false)

        console.log(`title in call action = ${actionDescription} `)
    }


    /**
    * This function is used in the action part.
    * it is called when the user click on a action and set the json of the action
    **/
    function setActions({ actionDescription }: { actionDescription: string; }) {
        setActionNeedDisplay(true);
        setActionDesc(actionDescription);
    }

    /**
     * This function is used in the action part.
     * it display the needs available for a action
     */
    function DisplayActionNeed({ need, actionDescription, id, color }: { need: { [key: string]: { type: string; required: boolean } }, actionDescription: string, id: number, color: string }) {

        const [inputs, setInputs] = React.useState<{ [key: string]: string }>({});

        const handleInputChange = (key: string, value: string) => {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [key]: value,
            }));
        };

        const handleAddNeeds = () => {
            console.log(inputs);
            for (const key in inputs) {
                if (inputs.hasOwnProperty(key)) {
                    const element = inputs[key];
                    setNeedActions((prevNeedActions) => ({
                        ...prevNeedActions,
                        [key]: element,
                    }));
                }
            }
            CallEndActions({ actionDescription, id });
        };

        return (
            <div>
                <Box p={5}
                    shadow='md'
                    borderRadius={30}
                    borderWidth='1px'
                    boxSize={800}
                    marginLeft={150}
                    inlineSize={1000}
                    color={'#CCCCCC'}
                    backgroundColor={color}>
                    {Object.keys(need).map((key) => (
                        <div key={key}>
                            <Input
                                marginTop={15}
                                type="text"
                                color="black"
                                backgroundColor={"white"}
                                borderColor={"black"}
                                placeholder={key}
                                value={inputs[key] || ''}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddNeeds} marginTop={100} marginLeft={"30%"} boxSize={370} blockSize={50} borderColor={"black"} borderRadius='md' bg='white' color='black' px={4} h={8}>
                        <Heading fontSize='xl'>Add Needs</Heading>
                    </Button>
                </Box>
            </div>
        );
    }


    /**
     * This function is used in the action part.
     * it display the actions available for a service
     */
    function DisplayActions({ title, actions, color }: { title: string; actions: { [actionKey: string]: string }; color: string }) {
        const actionBoxes: JSX.Element[] = [];
        const rows: JSX.Element[] = [];

        Object.keys(actions).forEach((actionKey) => {
            let actionBox: JSX.Element | null = null;
            console.log("la");
            const actionDescription = actions[actionKey];
            console.log("type = ")
            console.log(typeof actionDescription);
            if (typeof actionDescription === 'object') {
                if (actionNeedDisplay) {
                    const actionObject = actionDescription as ActionObject;
                    const desc = actionObject.description;
                    const need = actionObject.need;

                    if (desc !== "" && desc !== actionDesc) {
                        rows.push(
                            <div />
                        )
                        return (
                            <VStack>
                                {rows}
                            </VStack>
                        )
                    }
                    rows.push(
                        <VStack>
                            <DisplayActionNeed need={need} actionDescription={desc} id={actionObject.id} color={color} />
                        </VStack>
                    )
                    return (
                        <VStack>
                            {rows}
                        </VStack>
                    )
                }
                const actionObject = actionDescription as ActionObject;
                console.log(actionObject.description);
                const desc = actionObject.description;
                const need = actionObject.need;
                console.log("need = ")
                console.log(need);
                actionBox = (
                    <Box
                        key={actionKey}
                        p={5}
                        shadow="md"
                        borderWidth="1px"
                        boxSize={300}
                        inlineSize={300}
                        borderRadius={30}
                        color={"#CCCCCC"}
                        backgroundColor={color}
                        onClick={() => setActions({ actionDescription: desc })}
                    >
                        <Heading fontSize="xl">{desc}</Heading>
                    </Box>
                );
            }
            if (actionBox !== null) {
                actionBoxes.push(actionBox);
            }
        });

        if (rows.length != 0) {
            return (
                <VStack>
                    {rows}
                </VStack>
            )
        } else {
            return (
                <VStack>
                    <Grid marginTop="90px" marginLeft={0} templateColumns="repeat(4, 1fr)" gap={4}>
                        {actionBoxes}
                    </Grid>
                </VStack>
            );
        }
    }

    /**
     * This function is used in the action part.
     * it is called when the user click on a service and set the json of the service
     **/
    function CallActions({ title, color, Sid }: { title: string; color: string, Sid: number }) {
        if (actionJson.length != 0) {
            setActionJson("");
        }

        handleActionsVisibility();
        setServiceActionJson(title);
        setActionColor(color);
        setActionTitle(title);
        let nb: number = Number(Sid) + 1
        setASid(nb)
        console.log(`title in call action = ${title} `)
    }


    /**
     * This function is used in the action part.
     * it display the services available
     */
    function DisplayService({ title, desc, size, data, key }: { title: string, desc: string, size: number, data: any, key: number }) {

        const rows = [];
        let color = data.color;



        if (title === '_id')
            return (<VStack></VStack>)

        if (data.actions.length === 0) {
            return (<VStack></VStack>)
        }
        console.log(`data.actions = ${data.actions} `)

        if (serviceActionJson === title && actionJson.length === 0) {
            rows.push(
                <DisplayActions title={title} actions={data.actions} color={color} />
            )
        } else if (actionVisibility) {
            rows.push(
                <Box onClick={() => CallActions({ title, color, Sid: data.service_id })} p={5}
                    shadow='md'
                    borderRadius={30}
                    borderWidth='1px'
                    boxSize={300}
                    marginLeft={150}
                    inlineSize={size}
                    color={'#CCCCCC'}
                    backgroundColor={color}>
                    <Heading fontSize='xl'>{title}</Heading>


                    <Text mt={4}>{desc}</Text>
                </Box>
            )
        }
        return (
            <VStack>{rows}</VStack>
        )
    }

    /**
     * This function is used in the action part.
     * it parse the json received and display the services available
     */
    function Services() {
        let nb1: number = 600;

        const dataArray = [];
        let y: number = 0;
        for (const service in jsonData) {
            if (jsonData.hasOwnProperty(service)) {
                const serviceData = (jsonData as Data)[service];
                if (service != '_id')
                    dataArray.push({
                        service_id: service,
                        logo: serviceData.logo,
                        name: serviceData.name,
                        color: `rgb(${serviceData.color.red}, ${serviceData.color.green}, ${serviceData.color.blue})`,
                        actions: serviceData.actions,
                        reactions: serviceData.reactions,
                    });
            }
            y++;
        }

        return (
            <div>
                {dataArray.map((serviceObject, i) => (
                    <VStack key={i} display="inline-block">
                        <DisplayService
                            title={`${serviceObject.name} `}
                            desc=""
                            size={nb1}
                            data={serviceObject}
                            key={i}
                        />
                    </VStack>
                ))}
            </div>
        );
    }

    //-----------------[DISPLAY]-------------------------

    /**
     * This function display the services and the actions/reactions avalable to create an AREA
     * what is displayed depends on the state of the variables
     */
    function Display() {

        let rows = [];

        if (!action && !reaction) (
            rows.push(
                <HStack spacing="50px">
                    <VStack>
                        <Text justifyContent="center" fontSize="3xl" marginTop={130} > Action </Text>
                        <Box onClick={handleAction} boxSize={370} blockSize={500} borderRadius='30' bg={defaultActionColor} color='white' px={4} h={8}>
                            <Heading fontSize='xl'>{defaultActionTitle}</Heading>
                            <Text mt={4}>{defaultActionDesc}</Text>
                            {Object.keys(NeedActions).map((key) => (
                                <li key={key}>
                                    {key}:   {NeedActions[key]}
                                    {/* <Text mt={4}>{key}: {NeedActions[key]}  </Text> */}
                                </li>
                            ))}
                        </Box>
                    </VStack>
                    <img src={ArrowArea} width={200} style={{ marginTop: '150px' }} ></img>
                    <VStack>
                        <Text justifyContent="center" fontSize="3xl" marginTop={130}  > Reaction </Text>
                        <Box onClick={handleReaction} boxSize={370} blockSize={500} borderRadius='30' bg={defaultReactionColor} color='white' px={4} h={8}>
                            <Heading fontSize='xl'>{defaultReactionTitle}</Heading>
                            <Text mt={4}>{defaultReactionDesc}</Text>
                            {Object.keys(NeedReactions).map((key) => (
                                <li key={key}>
                                    {key}:   {NeedReactions[key]}
                                    {/* <Text mt={4}>{key}: {NeedActions[key]}  </Text> */}
                                </li>
                            ))}
                        </Box>
                    </VStack>
                </HStack>
            )
        )
        else if (action) (
            rows.push(
                <Stack marginTop={20} >
                    {/* <img src={leftArrow} onClick={handleAction} width={30} style={{ marginRight: '1500px' }} ></img> */}
                    <Services />
                </Stack>
            )
        )
        else if (reaction) (
            rows.push(
                <Stack marginTop={20} >
                    {/* <img src={leftArrow} onClick={handleReaction} width={30} style={{ marginRight: '1500px' }} ></img> */}
                    <ServicesReaction />
                </Stack>
            )
        )
        if (serviceActionJson.length != 0 && serviceReactionJson.length != 0 && actionJson.length != 0 && reactionJson.length != 0 && !action && !reaction) (
            setReadyToCreate(true)
        )
        if (readyToCreate && (!action && !reaction)) (
            rows.push(
                <div>
                    <Input
                        key="unique-key"
                        type="text"
                        color="black"
                        placeholder="Enter your AREA name"
                        ref={areaName}
                    />
                    <Button onClick={() => setName(getInputValue)} marginTop={100} marginLeft={40} boxSize={370} blockSize={50} borderRadius='md' bg='black' color='white' px={4} h={8}>
                        <Heading fontSize='xl'>Create your AREA</Heading>
                    </Button>
                </div>
            )
        )
        function getInputValue() {
            return areaName.current?.value || '';
        }

        return (
            <VStack>
                {rows}
            </VStack>
        );
    }


    if (!areaReceived) {
        return <div>
            <Taskbar></Taskbar>
            <Title />
            <Text marginLeft={150}> waiting for api response...</Text>

        </div>
    } else {
        return <div style={{
            backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
            height: 930, width: 1905
        }}>
            <Taskbar></Taskbar>
            {/* <DisconnectButtun /> */}
            <Display></Display>
        </div>
    }
}
