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
  const clientIdGithub = '46d5db5635abf205e5fb';
  const clientIdGoogle = '148697100580-b3usc1ea8untn2ub5itd7igc2vecosl8.apps.googleusercontent.com';
  const clientIdSpotify = 'a549fb0ad4554f449fa69ce2322dbfc8';

  const RedirectGoodle = 'http://localhost:8081/oauthgoogle';
  const RedirectSpotify = 'http://localhost:8081/oauthspotify';
  
  const githubScope = [
    'repo',
    'repo:status',
    'repo_deployment',
    'public_repo',
    'admin:repo_hook',
    'write:repo_hook',
    'admin:org',
    'gist',
    'notifications',
    'user',
    'delete_repo',
    'write:discussion',
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
    'read:org',
  ]
  
  const googleScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/contacts',
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/firebase',
    'https://www.googleapis.com/auth/games',
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/adsense',
    'https://www.googleapis.com/auth/adsense.readonly',
    'https://www.googleapis.com/auth/cloud-platform.read-only',
    'https://www.googleapis.com/auth/cloud-platform.read-write',
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.verify_first_party',
    'https://www.googleapis.com/auth/webmasters.currents',
    'https://www.googleapis.com/auth/webmasters.currents.readonly',
    'https://www.googleapis.com/auth/books',
    'https://www.googleapis.com/auth/books.readonly',
    'https://www.googleapis.com/auth/apps.licensing',
    'https://www.googleapis.com/auth/classroom.courses',
    'https://www.googleapis.com/auth/classroom.rosters',
    'https://www.googleapis.com/auth/classroom.announcements',
    'https://www.googleapis.com/auth/classroom.coursework.me',
    'https://www.googleapis.com/auth/classroom.coursework.students',
    'https://www.googleapis.com/auth/tasks',
    'https://www.googleapis.com/auth/sheets',
    'https://www.googleapis.com/auth/translate',
    'https://www.googleapis.com/auth/translate.readonly',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/ads.data',
    'https://www.googleapis.com/auth/adwords',
    'https://www.googleapis.com/auth/adwords.readonly',
    'https://www.googleapis.com/auth/alerts',
    'https://www.googleapis.com/auth/analytics',
    'https://www.googleapis.com/auth/analytics.edit',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/androidpublisher',
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