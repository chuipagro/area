import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import querystring from 'query-string';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const GithubAuthRedirect = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const code = url.searchParams.get('code');

    axios
      .post('http://localhost:3000/auth/postToken', { code: code })
      .then((response) => {
        if (response.status == 200) {
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du jeton d\'accès :', error);
      });
  };

  useEffect(() => {
    handleGitHubLogin();
  });

  return (
    <div>
      Redirection en cours...
    </div>
  );
};
