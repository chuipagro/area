import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import GithubLogo from "../images/GithubLogo.png";
import SpotifyLogo from "../images/SpotifyLogo.png";
import GoogleLogo from "../images/GoogleLogo.png";
import { Taskbar } from '../component/Taskbar';
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
  const clientIdGithub = process.env.REACT_APP_CLIENT_ID_GITHUB_LOGIN as string;
  const clientIdGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE_CREATE_AREA as string;
  const clientIdSpotify = process.env.REACT_APP_CLIENT_ID_SPOTIFY_CREATE_AREA as string;

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
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.settings.readonly",
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
    "https://www.googleapis.com/auth/gmail.settings.sharing",
    "https://www.googleapis.com/auth/documents.readonly",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.photos.readonly",
    "https://www.googleapis.com/auth/drive.scripts",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/forms",
    "https://www.googleapis.com/auth/forms.currentonly",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/presentations.readonly",
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