import { useEffect } from 'react';

/**
 * This page is used to redirect the user after a successful login with Google.
 */
export const GoogleAuthRedirectOAuth2 = (): JSX.Element => {
  const handleGoogleLogin = () => {
    const currentUrl = window.location.href;
    const fragmentIndex = currentUrl.indexOf('#');
    const fragment = currentUrl.substring(fragmentIndex + 1);
    const fragmentParams = new URLSearchParams(fragment);
    const accessToken = fragmentParams.get('access_token');

    window.opener.postMessage({ token: accessToken }, 'http://localhost:8081/create');
    window.close();
  };

  useEffect(() => {
    handleGoogleLogin();
  }, []);

  return (
    <div>
      Redirection en cours...
    </div>
  );
};