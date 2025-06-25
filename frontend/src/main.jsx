import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { Box } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="ejajkhan613.au.auth0.com"
      clientId="S6SxFkZXzohNzoKFjSWoxRmXmkxUmE7a"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://platformatory-api.local',
        scope: 'openid profile email'
      }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
        }}
      >
        <App />
      </Box>
    </Auth0Provider>
  </React.StrictMode>
);