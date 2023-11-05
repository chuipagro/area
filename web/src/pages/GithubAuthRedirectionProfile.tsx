import { useEffect } from 'react';

export const GithubAuthRedirectProfile = (): JSX.Element => {
  const handleGitHubLogin = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const code = url.searchParams.get('code');
    console.log(code);

    window.opener.postMessage({ codeS: code }, 'http://localhost:8081/profile');
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
