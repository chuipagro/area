// import React, { useState, useEffect } from 'react';
// import './FileInput.css';

import '../app/App.css';

import { Text, VStack, Box, SimpleGrid, GridItem, Grid, Stack, Heading, Select, Divider, Button } from '@chakra-ui/react';


// const FileInput = () => {
//     const [fileName, setFileName] = useState('');
//     const [fileNames, setFileNames] = useState<string[]>([]);

//     useEffect(() => {
//         const storedFileNames = Object.keys(localStorage).filter((key) => key.startsWith('selectedFile'));
//         setFileNames(storedFileNames.map((key) => localStorage.getItem(key)!));
//     }, []);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files![0];
//         setFileName(file.name);
//         localStorage.setItem(`selectedFile-${fileName}`, file.name);
//         setFileNames([...fileNames, file.name]);
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <p>Selected file: {fileName}</p>
//             <div className="file-boxes">
//                 <h3>Files stored in local storage:</h3>
//                 <Divider orientation='horizontal' />
//                 <center>
//                     <Text fontSize={{ base: '5px', md: '10px', lg: '20px' }}>Your files</Text>
//                 </center>
//                 <Divider orientation='horizontal' />
//                 {fileNames.map((name) => (
//                     <div key={name} className="file-box">
//                         {name}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FileInput;


import React, { useState, useEffect } from 'react';
import './FileInput.css';

const FileInput = () => {
    const [fileName, setFileName] = useState('');
    const [fileNames, setFileNames] = useState<string[]>([]);

    useEffect(() => {
        const storedFileNames = Object.keys(localStorage).filter((key) => key.startsWith('selectedFile'));
        setFileNames(storedFileNames.map((key) => localStorage.getItem(key)!));
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setFileName(file.name);
        localStorage.setItem(`selectedFile-${file.name}`, file.name);
        setFileNames([...fileNames, file.name]);
    };

    const handleDelete = (fileName: string) => {
        localStorage.removeItem(`selectedFile-${fileName}`);
        setFileNames(fileNames.filter((name) => name !== fileName));
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <p>Selected file: {fileName}</p>
            <div className="file-boxes">
                <h3>Files stored in local storage:</h3>
                <Divider orientation='horizontal' />
                <center>
                    <Text fontSize={{ base: '5px', md: '10px', lg: '20px' }}>Your files</Text>
                </center>
                <Divider orientation='horizontal' />

                {fileNames.map((name) => (
                    <div key={name} className="file-box">
                        {name}
                        <Button colorScheme='red' variant='outline' onClick={() => handleDelete(name)} >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default FileInput;
