import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import querystring from 'query-string';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import { Taskbar } from '../component/Taskbar';

/**
 * This function display a title
 */
function Title() {
    return (
        <VStack spacing="0px">
            <Text color="black" fontSize={{ base: '50px' }} >page login with services to make</Text>
        </VStack>
    )
}

/**
 * this function display a page with the title and the taskbar. This is the place where we should have the oauth2
 * the function is to be completed
 */
export const LoginWithService = (): JSX.Element => {
  const clientIdGithub = '46d5db5635abf205e5fb';
  const clientSecretGithub = 'c7e2fffd378ec39098fbbce38a3b6adcd4756fc0';
  const redirectUri = encodeURIComponent('http://localhost:3001/login-with-service');
  const location = useLocation();

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientIdGithub}`;

  const handleGitHubLogin = () => {
    window.location.assign(authUrl);
  };

  return (
    <div>
      <Button onClick={handleGitHubLogin}>Se connecter avec GitHub</Button>
    </div>
  );
};