import React, { useRef } from 'react';
import '../app/App.css';
import axios from 'axios';
import { Text, Box, Heading } from '@chakra-ui/react';
import { Taskbar } from '../component/VerticalTaskbar';
import { FiSearch } from 'react-icons/fi';
import { DisconnectButtun } from '../component/disconnect';

export const Dashboard = (): JSX.Element => {

    type Area = {
        title: string;
        active: boolean;
        createdBy: string;
        action: [
            {
                type: number;
                service: number
            }
        ];
        reaction: [
            {
                type: number;
                service: number
            }
        ];
        data: {};
        timeAtCreation: string;
        dateAtCreation: string;
    };

    const token = localStorage.getItem("token");

    const [Areas, setAreas] = React.useState<Area[]>([]);
    const [SearchAreas, setSearchAreas] = React.useState<Area[]>([]);

    const fetchJsonData = async () => {
        try {
            if (token != null) {
                const response = await axios.get('http://localhost:8080/area/getUserAreas');
                if (response.status === 200) {
                    setAreas(response.data.areas);
                    setSearchAreas(response.data.areas);
                } else {
                    console.error('Failed to fetch JSON data');
                }
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    };

    React.useEffect(() => {
        fetchJsonData();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const normalizedSearch = searchTerm.toLowerCase();
        const filteredAreas = Areas.filter((item: Area) =>
            item.title.toLowerCase().includes(normalizedSearch)
        );
        setSearchAreas(filteredAreas);
    };

    React.useEffect(() => {
        console.log(SearchAreas[0]);
    }, [SearchAreas]);

    const searchRef = useRef<HTMLInputElement>(null);

    const calculateBlocksInRow = () => {
        if (searchRef.current) {
            const searchLength = searchRef.current.offsetWidth;
            const maxRowWidth = searchLength;
            const maxSingleBoxWidth = 0.6 * searchLength;
            const blocks = [];

            let remainingBoxes = SearchAreas.length;
            let currentRowType = 1;

            while (remainingBoxes > 0) {
                if (currentRowType === 1) {
                    const singleBoxWidth = Math.min(maxSingleBoxWidth, maxRowWidth);
                    blocks.push([singleBoxWidth]);
                    remainingBoxes--;
                    currentRowType = 2;
                } else {
                    if (remainingBoxes >= 2) {
                        const box1Width = Math.floor(Math.random() * maxSingleBoxWidth);
                        const box2Width = maxRowWidth - box1Width;

                        if (box2Width > maxSingleBoxWidth) {
                            const diff = box2Width - maxSingleBoxWidth;
                            blocks.push([box1Width, maxSingleBoxWidth - diff]);
                        } else {
                            blocks.push([box1Width, box2Width]);
                        }
                        remainingBoxes -= 2;
                    } else {
                        const singleBoxWidth = Math.min(maxSingleBoxWidth, maxRowWidth);
                        blocks.push([singleBoxWidth]);
                        remainingBoxes--;
                    }
                    currentRowType = 1;
                }
            }
            return blocks;
        }
        return [];
    };

    const blocksInRow = calculateBlocksInRow();

    return (
        <div
            style={{
                backgroundColor: 'white',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: 930,
                width: 1920,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Taskbar></Taskbar>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                    marginLeft: "35%",
                    width: '80%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f2f2f2',
                        border: '1px solid #ccc',
                        borderRadius: '40px',
                        padding: '15px',
                        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                        width: '60%',
                    }}
                >
                    <FiSearch style={{ marginRight: '35px', fontSize: '30px', alignSelf: 'center' }}/>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            width: '100%',
                            fontSize: '25px',
                        }}
                        ref={searchRef}
                    />
                </div>
                <div style={{ marginLeft: 'auto', marginRight: '15%'}}>
                    <DisconnectButtun />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 20,
                    width: '80%',
                }}
            >
                <Heading as="h2" size="2xl" fontWeight="bold" marginBottom="1em" marginTop={10}>
                    Listes des Areas créer
                </Heading>
                {blocksInRow.map((blockCounts, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: 20
                        }}
                    >
                        {blockCounts.length === 2 ? (
                        <>
                        <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            width={'34%'}
                            height="200px"
                            color="#CCCCCC"
                            backgroundColor={`rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`}
                            margin={5}
                            borderRadius="xl"
                            boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                        >
                            <Heading fontSize="xl">{SearchAreas[(index * 2)].title}</Heading>
                            <Text mt={4}>{SearchAreas[(index * 2)].createdBy}</Text>
                            <Text mt={4}>{SearchAreas[(index * 2)].title}</Text>
                        </Box>
                        <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            width={'34%'}
                            height="200px"
                            color="#CCCCCC"
                            backgroundColor={`rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`}
                            margin={5}
                            borderRadius="xl"
                            boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                        >
                            <Heading fontSize="xl">{SearchAreas[(index * 2) + 1].title}</Heading>
                            <Text mt={4}>{SearchAreas[(index * 2) + 1].createdBy}</Text>
                            <Text mt={4}>{SearchAreas[(index * 2) + 1].title}</Text>
                        </Box>
                        </>
                        ) : (
                        <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            width={'70%'}
                            height="200px"
                            color="#CCCCCC"
                            backgroundColor={`rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`}
                            margin={5}
                            borderRadius="xl"
                            boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                        >
                            <Heading fontSize="xl">{SearchAreas[index].title}</Heading>
                            <Text mt={4}>{SearchAreas[index].createdBy}</Text>
                            <Text mt={4}>{SearchAreas[index].title}</Text>
                        </Box>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
