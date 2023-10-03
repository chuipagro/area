import { useEffect, useState } from 'react';
import '../app/App.css';
import { Grid, GridItem, Text, Stack, Box, Heading, Tbody, VStack, HStack } from '@chakra-ui/react';


function Feature({ title, desc, color, size }: { title: string, desc: string, color: string, size: number }) {
    return (
        <Box p={5} shadow='md' borderWidth='1px' boxSize={300} inlineSize={size} color={'#CCCCCC'} backgroundColor={color}>
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box>
    )
}

export function aaaaaaab({ }): JSX.Element {
    var test: boolean = false
    const handleClick = () => {
        if (test)
            test = false
        else
            test = true
    };

    if (test) {
        return (<Box onClick={handleClick}>test</Box>);
    }
    return (<Box onClick={handleClick}>test1</Box>);
}


function StackEx() {
    // var test: boolean = false
    // const handleClick = () => {
    //     if (test)
    //         test = false
    //     else
    //         test = true
    // };

    // let nb1: number = 1200;
    // let nb2: number = 600;
    // let numrows: number = 23;
    // const rows = [];
    // if (!test)
    //     return (
    //         <HStack spacing="500px">
    //             <Box onClick={handleClick} marginTop={200} marginLeft={300} boxSize={370} blockSize={500} borderRadius='md' bg='black' color='white' px={4} h={8}>test</Box>
    //             <Box onClick={handleClick} marginTop={200} boxSize={370} blockSize={500} borderRadius='md' bg='black' color='white' px={4} h={8}>test</Box>
    //         </HStack>
    //     );
    // return (
    //     <HStack spacing="500px">
    //         <Box onClick={handleClick} marginTop={200} marginLeft={300} boxSize={370} blockSize={500} borderRadius='md' bg='black' color='white' px={4} h={8}>test</Box>
    //     </HStack>
    // );
    // ------------
    // const [isLoading, setIsLoading] = useState(false);

    // const toggleIsLoading = () => {
    //     // 👇️ passed function to setState
    //     setIsLoading(current => !current);
    // };

    // return (
    //     <div>
    //         <button onClick={toggleIsLoading}>Toggle loading state</button>
    //         {isLoading && <h2>bobbyhadz.com...</h2>}
    //     </div>
    // );
    //--------------

    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState({ data: [] });

    const toggleIsActive = () => {
        setIsActive(isActive => !isActive);
    };

    useEffect(() => {
        console.log('isActive is: ', isActive);

        if (isActive) {
            fetchData();
            console.log(data)
        } else {
            setData({ data: [] });
        }
    }, [isActive]);

    const fetchData = async () => {
        const response = await fetch('https://reqres.in/api/users', {
            method: 'GET',
            headers: { Accept: 'application/json' },
        });

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));

        setData(result);
    };

    return (
        <div>
            <button onClick={toggleIsActive}>
                Toggle active state
            </button>
            {isActive && <h2>data</h2>}

        </div>
    );
}





export const CreateArea = (): JSX.Element => {

    return <div style={{
        backgroundColor: "white", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        height: 930, width: 1920
    }}>
        <StackEx></StackEx>
        {/* <StackEx2></StackEx2> */}
    </div>
}

