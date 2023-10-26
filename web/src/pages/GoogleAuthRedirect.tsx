import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import querystring from 'query-string';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const GoogleAuthRedirect = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const currentUrl = window.location.href;
    const fragmentIndex = currentUrl.indexOf('#');
    const fragment = currentUrl.substring(fragmentIndex + 1);
    const fragmentParams = new URLSearchParams(fragment);
    const accessToken = fragmentParams.get('access_token');

    axios
      .post('http://localhost:3000/auth/postGoogle', { token: accessToken })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du jeton d\'accès :', error);
      });
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
