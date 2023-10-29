import { useNavigate } from 'react-router-dom';
import '../app/App.css';
import { Text, VStack } from '@chakra-ui/react';
import GithubLogo from "../images/GithubLogo.png";
import MicrosoftLogo from "../images/MicrosoftLogo.png";
import GoogleLogo from "../images/GoogleLogo.png";
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

  const navigate = useNavigate();

  const authenticateWithGithub = () => {
    window.location.assign(authUrlGithub);
  };

  const authenticateWithGoogle = () => {
    window.location.assign(authUrlGoogle);
  };

  const authenticateWithMicrosoft = () => {
    console.log("Connexion pas encore faite");
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
          <span style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Continue avec GitHub</span>
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
        <button onClick={authenticateWithMicrosoft} style={{ padding: 0, border: 'none', background: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={MicrosoftLogo} alt="MicrosoftLogo" style={{ width: 35, height: 35 }} />
          <span style={{ fontSize: 20, color: 'black', marginLeft: 10 }}>Continue avec Google</span>
        </button>
      </div>

      <div style={{marginTop: '4%', fontSize: 30}}>
        <p>Continuer avec <b onClick={() => navigate('/login')}>Log in</b> ou <b onClick={() => navigate('/register')}>Sign up</b></p>
      </div>
    </div>
  );
};