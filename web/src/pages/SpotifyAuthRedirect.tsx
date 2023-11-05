import { useEffect } from 'react';

/**
 * This page is used to redirect the user after a successful login with Spotify.
 */
export const SpotifyAuthRedirect = (): JSX.Element => {
  const handleSpotifyLogin = () => {
    const currentUrl = window.location.href;
    const fragmentIndex = currentUrl.indexOf('#');
    const fragment = currentUrl.substring(fragmentIndex + 1);
    const fragmentParams = new URLSearchParams(fragment);
    const accessToken = fragmentParams.get('access_token');
    console.log(accessToken);

    window.opener.postMessage({ tokenS: accessToken }, 'http://localhost:8081/login-with-service');
    window.close();
  };

  useEffect(() => {
    handleSpotifyLogin();
  }, []);

  return (
    <div>
      Redirection en cours...
    </div>
  );
};
