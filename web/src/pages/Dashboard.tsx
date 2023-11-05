import React, { useRef, useState } from 'react';
import '../app/App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Heading } from '@chakra-ui/react';
import { Taskbar } from '../component/VerticalTaskbar';
import { FiSearch } from 'react-icons/fi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MySwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    return (
        <Switch checked={checked} onChange={onChange} />
    );
};

const theme = createTheme({
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '&.MuiSwitch-switchBase.Mui-checked': {
                        color: '#000000',
                    },
                    '& + .MuiSwitch-track': {
                        backgroundColor: '#6F625F',
                    },
                },
            },
        },
    },
});

/**
 * this function display a button to activate or desactivate an area
 */
const BoutonActive = ({ isActive, onToggle }: { isActive: boolean; onToggle: () => void }): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <MySwitch checked={isActive} onChange={onToggle} />
        </ThemeProvider>
    );
};


/**
 * this function display the dashboard
 */
export const Dashboard = (): JSX.Element => {

    type Area = {
        title: string;
        active: boolean;
        createdBy: string;
        action: {
            type: number;
            service: number
        };
        reaction: {
            type: number;
            service: number
        };
        data: {};
        timeAtCreation: string;
        dateAtCreation: string;
    };

    type Actions = {
        description: string;
        id: number;
        need: {
            summonerName: string;
            _id: string;
        };
    };

    type Service = {
        color: {
            red: number;
            green: number;
            blue: number;
        };
        _id: string;
        id: number;
        name: string;
        logo: string;
        actions: Actions[];
        reactions: Actions[];
        __v: number;
    };

    const token = localStorage.getItem("token");

    const [Areas, setAreas] = React.useState<Area[]>([]);
    const [SearchAreas, setSearchAreas] = React.useState<Area[]>([]);
    const [AllServices, setAllServices] = React.useState<Service[]>([]);

    /**
     * this function fetch all the areas of the user
     */
    const fetchJsonData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/services/getAllServices');
            if (response.status === 200) {
                setAllServices(response.data.services)
                if (token != null) {
                    const body = {
                        "token": token,
                    };

                    const res = await axios.post('http://localhost:8080/area/getUserAreas', body);
                    if (res.status === 200) {
                        setAreas(res.data.areas);
                        setSearchAreas(res.data.areas);
                    } else {
                        console.error('Failed to fetch JSON data');
                    }
                }
            } else {
                console.error('Failed to fetch JSON data');
            }
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    };

    React.useEffect(() => {
        fetchJsonData();
    }, []);

    /**
     * this function search an area
     * @param searchTerm
     */
    const handleSearch = (searchTerm: string) => {
        const normalizedSearch = searchTerm.toLowerCase();
        const filteredAreas = Areas.filter((item: Area) =>
            item.title.toLowerCase().includes(normalizedSearch)
        );
        setSearchAreas(filteredAreas);
    };

    const searchRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    /**
     * this function update an area
     * @param index
     */
    const handleToggle = async (index: number) => {
        const updatedAreas = [...SearchAreas];
        updatedAreas[index].active = !updatedAreas[index].active;
        setSearchAreas(updatedAreas);

        try {
            const areaToUpdate = Areas.find(area => area.title === updatedAreas[index].title);
            if (areaToUpdate) {
                const bodyBoutton = {
                    "title": areaToUpdate.title,
                    "token": token,
                    updateData: {
                        "active": updatedAreas[index].active,
                    }
                };

                const response = await axios.post('http://localhost:8080/area/updateArea', bodyBoutton);
                if (response.status === 200) {
                    if (token != null) {
                        const body = {
                            "token": token,
                        };
                        const res = await axios.post('http://localhost:8080/area/getUserAreas', body);
                        if (res.status === 200) {
                            setAreas(res.data.areas);
                        } else {
                            console.error('Failed to fetch JSON data');
                        }
                    }
                } else {
                    console.error('Failed to update the area');
                }
            }
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };

    /**
     * this function calculate the number of blocks in a row
     */
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

    /**
     * this function navigate to the setting page
     * @param area
     * @param action
     * @param reaction
     */
    const handleSettingButtonClick = (area: Area, action: Service, reaction: Service) => {
        navigate('/settingAreas', { state: { area, action, reaction } });
    };

    const blocksInRow = calculateBlocksInRow();

    React.useEffect(() => {
        console.log(AllServices);
    }, [AllServices]);

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
                    <FiSearch style={{ marginRight: '35px', fontSize: '30px', alignSelf: 'center' }} />
                    <input
                        type="text"
                        placeholder="Search..."
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
                    List of your Areas
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
                                    height="300px"
                                    color="#CCCCCC"
                                    backgroundColor={`rgb(${AllServices[SearchAreas[index].action.service - 1].color.red}, ${AllServices[SearchAreas[index].action.service - 1].color.green}, ${AllServices[SearchAreas[index].action.service - 1].color.blue})`}
                                    margin={5}
                                    borderRadius="xl"
                                    boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    position="relative"
                                >
                                    <Box position="absolute" top="5px" right="5px">
                                        <button onClick={() => handleSettingButtonClick(SearchAreas[index], AllServices[SearchAreas[index].action.service - 1], AllServices[SearchAreas[index].reaction.service - 1])} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
                                            <img src={"./assets/images/settingBouton.png"} alt="Setting Logo" style={{ width: 35, height: 35 }} />
                                        </button>
                                    </Box>
                                    <Box width="100%" height="calc(100% - 40px)" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <img src={AllServices[SearchAreas[index].action.service - 1].logo} alt="Area Logo" style={{ width: '85px', height: '85px' }} />
                                        <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index].action.service - 1].actions[SearchAreas[index].action.type - 1].description}</Text>
                                        <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index].reaction.service - 1].reactions[SearchAreas[index].reaction.type - 1].description}</Text>
                                    </Box>
                                    <Box
                                        position="absolute"
                                        bottom={5}
                                        right={5}
                                    >
                                        <BoutonActive isActive={SearchAreas[index].active} onToggle={() => handleToggle(index)} />
                                    </Box>
                                </Box>
                                <Box
                                    p={5}
                                    shadow="md"
                                    borderWidth="1px"
                                    width={'34%'}
                                    height="300px"
                                    color="#CCCCCC"
                                    backgroundColor={`rgb(${AllServices[SearchAreas[index + 1].action.service - 1].color.red}, ${AllServices[SearchAreas[index + 1].action.service - 1].color.green}, ${AllServices[SearchAreas[index + 1].action.service - 1].color.blue})`}
                                    margin={5}
                                    borderRadius="xl"
                                    boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    position="relative"
                                >
                                    <Box position="absolute" top="5px" right="5px">
                                        <button onClick={() => handleSettingButtonClick(SearchAreas[index + 1], AllServices[SearchAreas[index + 1].action.service - 1], AllServices[SearchAreas[index + 1].reaction.service - 1])} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
                                            <img src={"./assets/images/settingBouton.png"} alt="Setting Logo" style={{ width: 35, height: 35 }} />
                                        </button>
                                    </Box>
                                    <Box width="100%" height="calc(100% - 40px)" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <img src={AllServices[SearchAreas[index + 1].action.service - 1].logo} alt="Area Logo" style={{ width: '85px', height: '85px' }} />
                                        <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index + 1].action.service - 1].actions[SearchAreas[index + 1].action.type - 1].description}</Text>
                                        <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index + 1].reaction.service - 1].reactions[SearchAreas[index + 1].reaction.type - 1].description}</Text>
                                    </Box>
                                    <Box
                                        position="absolute"
                                        bottom={5}
                                        right={5}
                                    >
                                        <BoutonActive isActive={SearchAreas[index + 1].active} onToggle={() => handleToggle(index + 1)} />
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <Box
                                p={5}
                                shadow="md"
                                borderWidth="1px"
                                width={'70%'}
                                height="300px"
                                color="#CCCCCC"
                                backgroundColor={`rgb(${AllServices[SearchAreas[index].action.service - 1].color.red}, ${AllServices[SearchAreas[index].action.service - 1].color.green}, ${AllServices[SearchAreas[index].action.service - 1].color.blue})`}
                                margin={5}
                                borderRadius="xl"
                                boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                position="relative"
                            >
                                <Box position="absolute" top="5px" right="5px">
                                    <button onClick={() => handleSettingButtonClick(SearchAreas[index], AllServices[SearchAreas[index].action.service - 1], AllServices[SearchAreas[index].reaction.service - 1])} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
                                        <img src={"./assets/images/settingBouton.png"} alt="Setting Logo" style={{ width: 35, height: 35 }} />
                                    </button>
                                </Box>
                                <Box width="100%" height="calc(100% - 40px)" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <img src={AllServices[SearchAreas[index].action.service - 1].logo} alt="Area Logo" style={{ width: '85px', height: '85px' }} />
                                    <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index].action.service - 1].actions[SearchAreas[index].action.type - 1].description}</Text>
                                    <Text mt={4} color="black" fontWeight="bold">{AllServices[SearchAreas[index].reaction.service - 1].reactions[SearchAreas[index].reaction.type - 1].description}</Text>
                                </Box>
                                <Box
                                    position="absolute"
                                    bottom={5}
                                    right={5}
                                >
                                    <BoutonActive isActive={SearchAreas[index].active} onToggle={() => handleToggle(index)} />
                                </Box>
                            </Box>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
