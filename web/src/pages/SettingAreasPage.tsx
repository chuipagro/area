import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text, Box, Heading } from '@chakra-ui/react';

export const SettingAreasPage = (): JSX.Element => {
  const location = useLocation();
  const { area, action, reaction } = location.state;
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


    const setupInfoAction = () => {
        const stringInfoA: InformationString[] = [];

        if (area.data[action.name] === undefined) {
          setEditableActionInfoString([]);
          setEditableActionInfoStringM([]);
          return;
        }
        for (const dataType of Object.keys(area.data[action.name])) {
            const info = area.data[action.name][dataType];
            
            if (typeof info === 'string') {
                stringInfoA.push(info);
            }
        }
        setEditableActionInfoString(stringInfoA);
        setEditableActionInfoStringM(stringInfoA);
    };

    const setupInfoReaction = () => {
        const stringInfo: InformationString[] = [];

        if (area.data[reaction.name] === undefined) {
          setEditableReactionInfoString([]);
          setEditableReactionInfoStringM([]);
          return;
        }
        for (const dataType of Object.keys(area.data[reaction.name])) {
            const info = area.data[reaction.name][dataType];
            
            if (typeof info === 'string') {
                stringInfo.push(info);
            }
        }
        setEditableReactionInfoString(stringInfo);
        setEditableReactionInfoStringM(stringInfo);
    };

    React.useEffect(() => {
        setTitle(area.title);
        setupInfoAction();
        setupInfoReaction();
    }, []);

    const handleDelete = async () => {
        try {
            const bodyBoutton = {
                "title": area.title,
                "token": token,
            };

            console.log(bodyBoutton);
            const response = await axios.post('http://localhost:8080/area/deleteArea', bodyBoutton);    
            if (response.status === 200) {
                navigate('/home');
            } else {
                console.error('Failed to update the area');
            }
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };

    const handleValidate = async () => {
        for (let i = 0; i < EditableActionInfoString.length; i++) {
            for (const key of Object.keys(area.data[action.name])) {
                if (area.data[action.name][key] === EditableActionInfoString[i]) {
                    area.data[action.name][key] = EditableActionInfoStringM[i];
                }
            }
        }
        for (let i = 0; i < EditableReactionInfoString.length; i++) {
            for (const key of Object.keys(area.data[reaction.name])) {
                if (area.data[reaction.name][key] === EditableReactionInfoString[i]) {
                    area.data[reaction.name][key] = EditableReactionInfoStringM[i];
                }
            }
        }

        try {
            const bodyBoutton = {
                "title": area.title,
                "token": token,
                updateData: {
                    "data": area.data,
                    "title": title,
                }
            };

            const response = await axios.post('http://localhost:8080/area/updateArea', bodyBoutton);    
            if (response.status === 200) {
                navigate('/home');
            } else {
                console.error('Failed to update the area');
            }
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };


    type InformationString = string;

    const [EditableActionInfoString, setEditableActionInfoString] = useState<InformationString[]>([]);
    const [EditableActionInfoStringM, setEditableActionInfoStringM] = useState<InformationString[]>([]);

    const [EditableReactionInfoString, setEditableReactionInfoString] = useState<InformationString[]>([]);
    const [EditableReactionInfoStringM, setEditableReactionInfoStringM] = useState<InformationString[]>([]);


    const handleActionInfoChangeActionStringM = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedActionInfo = [...EditableActionInfoStringM];
      updatedActionInfo[index] = e.target.value;
      setEditableActionInfoStringM(updatedActionInfo);
    };

    const handleActionInfoChangeReactionStringM = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedActionInfo = [...EditableReactionInfoStringM];
      updatedActionInfo[index] = e.target.value;
      setEditableActionInfoStringM(updatedActionInfo);
    };

    return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          backgroundColor="black"
          px={5}
          py={5}
          boxShadow="md"
          borderRadius={50}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => navigate('/home')}
          style={{ margin: '30px' }}
        >
          <img src={"./assets/images/close.png"} alt="Area Logo" style={{ width: '50px', height: '50px' }} />
        </Box>
        <div style={{ flex: 1, justifyContent: 'center', display: 'flex', marginLeft: '10%' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontSize: '50px', fontWeight: 'bold', textAlign: 'center', padding: '10px', border: '2px solid back' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '5%' }}>
          <Box
            backgroundColor="black"
            px={20}
            py={5}
            boxShadow="md"
            borderRadius={50}
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleDelete}
          >
            <Text fontSize="2xl" color="white">Supprimer</Text>
          </Box>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '70vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text fontSize="3xl" fontWeight="bold" marginBottom="10px">Action</Text>
          <div style={{ height: '50vh', width: '65vh', margin: '20px' }}>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              width="100%"
              height="100%"
              color="#CCCCCC"
              backgroundColor={`rgb(${action.color.red}, ${action.color.green}, ${action.color.blue})`}
              borderRadius="xl"
              boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" height="calc(100% - 40px)" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <img src={action.logo} alt="Area Logo" style={{ width: '85px', height: '85px' }} />
                {EditableActionInfoStringM.map((info, index) => (
                    <input
                      key={`action-info-${index}`}
                      type="text"
                      value={info}
                      onChange={(e) => handleActionInfoChangeActionStringM(index, e)}
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        padding: '8px',
                        marginBottom: '10px',
                        width: '80%',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                      }}
                    />
                ))}
              </Box>
            </Box>
          </div>
        </div>

        <img src="./assets/images/arrow.png" alt="Flèche" style={{ width: '150px', height: '150px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text fontSize="3xl" fontWeight="bold" marginBottom="10px">Reaction</Text>
          <div style={{ height: '50vh', width: '65vh', margin: '20px' }}>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              width="100%"
              height="100%"
              color="#CCCCCC"
              backgroundColor={`rgb(${reaction.color.red}, ${reaction.color.green}, ${reaction.color.blue})`}
              borderRadius="xl"
              boxShadow="4px 4px 10px 0 rgba(0,0,0,0.8)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" height="calc(100% - 40px)" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <img src={reaction.logo} alt="Area Logo" style={{ width: '85px', height: '85px' }} />
                {EditableReactionInfoStringM.map((info, index) => (
                    <input
                      key={`reaction-info-${index}`}
                      type="text"
                      value={info}
                      onChange={(e) => handleActionInfoChangeReactionStringM(index, e)}
                      style={{
                        fontSize: '16px',
                        fontWeight: 'normal',
                        padding: '8px',
                        marginBottom: '10px',
                        width: '80%',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                      }}
                    />
                ))}
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '-10%', width: '30%', marginLeft: '35%' }}>
        <Box
          backgroundColor="black"
          px={20}
          py={5}
          boxShadow="md"
          borderRadius={50}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={handleValidate}
          style={{ margin: '10px' }}
        >
          <Text fontSize="2xl" color="white">Valider</Text>
        </Box>
      </div>
    </div>
  );
};