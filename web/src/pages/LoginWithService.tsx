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
  const clientIdGoogle = '148697100580-b3usc1ea8untn2ub5itd7igc2vecosl8.apps.googleusercontent.com';

  const RedirectGoodle = 'http://localhost:3001/oauthgoogle';

  const authUrlGithub = `https://github.com/login/oauth/authorize?client_id=${clientIdGithub}`;
  const authUrlGoogle = `https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=${encodeURIComponent(clientIdGoogle)}&redirect_uri=${encodeURIComponent(RedirectGoodle)}&scope=profile email&access_type=online`;

  const handleGitHubLogin = () => {
    window.location.assign(authUrlGithub);
  };

  const handleGoogleLogin = () => {
    window.location.assign(authUrlGoogle);
  };

  return (
    <div>
      <Button onClick={handleGitHubLogin}>Se connecter avec GitHub</Button>
      <Button onClick={handleGoogleLogin}>Se connecter avec Google</Button>
    </div>
  );
};