import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { Box } from '@mui/material';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: { audience },
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