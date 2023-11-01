import { useEffect } from 'react';

export const GithubAuthRedirect = (): JSX.Element => {
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
