import { useEffect } from 'react';

export const SpotifyAuthRedirectOAuth2 = (): JSX.Element => {
  const handleSpotifyLogin = () => {
    const currentUrl = window.location.href;
    const fragmentIndex = currentUrl.indexOf('#');
    const fragment = currentUrl.substring(fragmentIndex + 1);
    const fragmentParams = new URLSearchParams(fragment);
    const accessToken = fragmentParams.get('access_token');
    console.log(accessToken);

    window.opener.postMessage({ tokenS: accessToken }, 'http://localhost:8081/create');
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
