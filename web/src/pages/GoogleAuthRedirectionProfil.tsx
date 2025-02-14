import { useEffect } from 'react';

export const GoogleAuthRedirectProfile = (): JSX.Element => {
  const handleGoogleLogin = () => {
    const currentUrl = window.location.href;
    const fragmentIndex = currentUrl.indexOf('#');
    const fragment = currentUrl.substring(fragmentIndex + 1);
    const fragmentParams = new URLSearchParams(fragment);
    const accessToken = fragmentParams.get('access_token');

    window.opener.postMessage({ token: accessToken }, 'http://localhost:8081/profile');
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