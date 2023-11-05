import { useEffect } from 'react';

/**
 * This page is used to redirect the user after a successful login with GitHub.
 */
export const GithubAuthRedirectOAuth2 = (): JSX.Element => {
  const handleGitHubLogin = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const code = url.searchParams.get('code');
    console.log(code);

    window.opener.postMessage({ codeS: code }, 'http://localhost:8081/create');
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
