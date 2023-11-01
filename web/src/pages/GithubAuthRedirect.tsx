import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const GithubAuthRedirect = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const code = url.searchParams.get('code');
    console.log(code);

    window.opener.postMessage({ code: code }, 'http://localhost:8081/login-with-service');
    window.close();
  };

  useEffect(() => {
    handleGitHubLogin();
  }, []);

  return (
    <div>
      Redirection en cours...
    </div>
  );
};
