import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import GithubLogo from "../images/GithubLogo.png";
import MicrosoftLogo from "../images/MicrosoftLogo.png";
import SpotifyLogo from "../images/SpotifyLogo.png";
import GoogleLogo from "../images/GoogleLogo.png";
import { Taskbar } from '../component/Taskbar';
import querystring from 'query-string';
import axios from 'axios';

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
  const clientIdSpotify = 'a549fb0ad4554f449fa69ce2322dbfc8';

  const RedirectGoodle = 'http://localhost:8081/oauthgoogle';
  const RedirectSpotify = 'http://localhost:8081/oauthspotify';
  
  const githubScope = [
    'repo',
    'repo:status',
    'repo_deployment',
    'delete_repo',
    'public_repo',
    "repo:invite",
    "security_events",
    "read:repo_hook",
    'admin:repo_hook',
    'write:repo_hook',
    'admin:org',
    "write:org",
    "read:org",
    'gist',
    'notifications',
    'user',
    'write:discussion',
    "admin:public_key",
    "write:public_key",
    "read:public_key",
    'write:packages',
    'read:packages',
    'delete:packages',
    'admin:gpg_key',
    'admin:org_hook',
    'admin:repo',
    'admin:enterprise',
    'read:user',
    'read:discussion',
    'read:enterprise',
  ]
  
  const googleScope = [
    "https://www.googleapis.com/auth/contacts",
    "https://www.googleapis.com/auth/contacts.other.readonly",
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/directory.readonly",
    "https://www.googleapis.com/auth/user.addresses.read",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.emails.read",
    "https://www.googleapis.com/auth/user.gender.read",
    "https://www.googleapis.com/auth/user.organization.read",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
    "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
    "https://www.googleapis.com/auth/gmail.addons.current.message.action",
    "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
    "https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.insert",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/gmail.metadata",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.settings.basic",
    "https://www.googleapis.com/auth/admin.reports.audit.readonly",
    "https://www.googleapis.com/auth/admin.reports.usage.readonly",
    "https://www.googleapis.com/auth/admin.datatransfer",
    "https://www.googleapis.com/auth/admin.datatransfer.readonly",
    "https://www.googleapis.com/auth/admin.chrome.printers",
    "https://www.googleapis.com/auth/admin.chrome.printers.readonly",
    "https://www.googleapis.com/auth/admin.directory.customer",
    "https://www.googleapis.com/auth/admin.directory.customer.readonly",
    "https://www.googleapis.com/auth/admin.directory.device.chromeos",
    "https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly",
    "https://www.googleapis.com/auth/admin.directory.device.mobile",
    "https://www.googleapis.com/auth/admin.directory.device.mobile.action",
    "https://www.googleapis.com/auth/admin.directory.device.mobile.readonly",
    "https://www.googleapis.com/auth/admin.directory.domain",
    "https://www.googleapis.com/auth/admin.directory.domain.readonly",
    "https://www.googleapis.com/auth/admin.directory.group",
    "https://www.googleapis.com/auth/admin.directory.group.member",
    "https://www.googleapis.com/auth/admin.directory.group.member.readonly",
    "https://www.googleapis.com/auth/admin.directory.group.readonly",
    "https://www.googleapis.com/auth/admin.directory.orgunit",
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/cloud-platform.read-only",
    "https://www.googleapis.com/auth/adexchange.buyer",
    "https://www.googleapis.com/auth/admob.readonly",
    "https://www.googleapis.com/auth/admob.report",
    "https://www.googleapis.com/auth/adsensehost",
    "https://www.googleapis.com/auth/admin.directory.orgunit.readonly",
    "https://www.googleapis.com/auth/admin.directory.resource.calendar",
    "https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly",
    "https://www.googleapis.com/auth/admin.directory.rolemanagement",
    "https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly",
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/admin.directory.user.alias",
    "https://www.googleapis.com/auth/admin.directory.user.alias.readonly",
    "https://www.googleapis.com/auth/admin.directory.user.readonly",
    "https://www.googleapis.com/auth/admin.directory.user.security",
    "https://www.googleapis.com/auth/admin.directory.userschema",
    "https://www.googleapis.com/auth/admin.directory.userschema.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.photos.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.scripts",
    "https://www.googleapis.com/auth/drive.activity",
    "https://www.googleapis.com/auth/drive.activity.readonly",
  ];

  const authUrlGithub = `https://github.com/login/oauth/authorize?client_id=${clientIdGithub}&scope=${encodeURIComponent(githubScope.join(' '))}`;
  const authUrlSpotify = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientIdSpotify)}&redirect_uri=${encodeURIComponent(RedirectSpotify)}&scope=user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-read-recently-played user-top-read`;
  const authUrlGoogle = `https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=${encodeURIComponent(clientIdGoogle)}&redirect_uri=${encodeURIComponent(RedirectGoodle)}&scope=${encodeURIComponent(googleScope.join(' '))}`;

  const navigate = useNavigate();

  const [isListenerSet, setIsListenerSet] = useState(false);
  const isBackendCalled = useRef(false);
  const [key, setKey] = useState(0);
  const [keyG, setKeyG] = useState(0);
  const [keyS, setKeyS] = useState(0);

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      if (isBackendCalled.current) {
        return;
      }

      if (event.origin === 'http://localhost:8081') {
        const receivedData = event.data;
        if (receivedData && receivedData.code) {
          const codeTmp = receivedData.code;
          const code = String(codeTmp);

          if (!isBackendCalled.current) {
            axios.post('http://localhost:8080/auth/postToken', { code: code })
              .then(response => {
                if (response.status === 200 && response.data) {
                  localStorage.setItem('token', response.data.token);
                  navigate('/home');
                }
              })
              .catch(error => {
                console.error('Erreur lors de l\'appel au backend:', error);
              });

            isBackendCalled.current = true;
          }
        }
      }
    };

    if (!isListenerSet) {
      window.addEventListener('message', handleMessageEvent);
      setIsListenerSet(true);
    }

    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, [key]);

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      if (isBackendCalled.current) {
        return;
      }

      if (event.origin === 'http://localhost:8081') {
        const receivedData = event.data;
        if (receivedData && receivedData.token) {
          const tokenTmp = receivedData.token;
          const token = String(tokenTmp);

          if (!isBackendCalled.current) {
            axios.post('http://localhost:8080/auth/postGoogle', { token: token })
              .then(response => {
                if (response.status === 200) {
                  navigate('/home');
                }
              })
              .catch(error => {
                console.error('Erreur lors de l\'appel au backend:', error);
              });

            isBackendCalled.current = true;
          }
        }
      }
    };

    if (!isListenerSet) {
      window.addEventListener('message', handleMessageEvent);
      setIsListenerSet(true);
    }

    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, [keyG]);

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      if (isBackendCalled.current) {
        return;
      }

      if (event.origin === 'http://localhost:8081') {
        const receivedData = event.data;
        if (receivedData && receivedData.tokenS) {
          const tokenTmp = receivedData.tokenS;
          const token = String(tokenTmp);

          if (!isBackendCalled.current) {
            axios.post('http://localhost:8080/auth/postSpotify', { token: token })
              .then(response => {
                if (response.status === 200) {
                  navigate('/home');
                }
              })
              .catch(error => {
                console.error('Erreur lors de l\'appel au backend:', error);
              });

            isBackendCalled.current = true;
          }
        }
      }
    };

    if (!isListenerSet) {
      window.addEventListener('message', handleMessageEvent);
      setIsListenerSet(true);
    }

    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, [keyS]);

  const authenticateWithGithub = async () => {
    const popup = window.open(authUrlGithub, 'authUrlGithub', 'width=500,height=600');

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        setKey(prevKey => prevKey + 1);
      }
    }, 1000);
  };

  const authenticateWithGoogle = () => {
    const popup = window.open(authUrlGoogle, 'authUrlGoogle', 'width=500,height=600');

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        setKeyG(prevKey => prevKey + 1);
      }
    }, 1000);
  };

  const authenticateWithSpotify = () => {
    const popup = window.open(authUrlSpotify, 'authUrlSpotify', 'width=500,height=600');

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        setKeyS(prevKey => prevKey + 1);
      }
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Taskbar></Taskbar>
      <h1 style={{ fontSize: 150, fontWeight: 'bold', marginTop: '1%' }}>LPPLL</h1>
      <p style={{ fontSize: 50, marginTop: '1%' }}>Get Started</p>

      <div style={{
        height: 65,
        width: 360,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '2%',
      }}>
        <button onClick={authenticateWithGoogle} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={GoogleLogo} alt="Google Logo" style={{ width: 35, height: 35 }} />
          <span style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Continue avec Google</span>
        </button>
      </div>

      <div style={{
        height: 65,
        width: 360,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '2%',
      }}>
        <button onClick={authenticateWithGithub} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={GithubLogo} alt="GithubLogo" style={{ width: 35, height: 35 }} />
          <span style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Continue avec Github</span>
        </button>
      </div>

      <div style={{
        height: 65,
        width: 360,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '2%',
      }}>
        <button onClick={authenticateWithSpotify} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={SpotifyLogo} alt="SpotifyLogo" style={{ width: 35, height: 35 }} />
          <span style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Continue avec Spotify</span>
        </button>
      </div>

      <div style={{marginTop: '4%', fontSize: 30}}>
        <p>Continuer avec <b onClick={() => navigate('/login')}>Log in</b> ou <b onClick={() => navigate('/register')}>Sign up</b></p>
      </div>
    </div>
  );
};