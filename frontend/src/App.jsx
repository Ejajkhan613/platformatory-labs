import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';

// MUI Components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';

import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const location = useLocation();

  // useEffect(() => {
  //   const initializeUser = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       await axios.post(
  //         'http://localhost:4000/api/profile',
  //         {},
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     } catch (err) {
  //       console.error('Error initializing user:', err);
  //     }
  //   };

  //   if (isAuthenticated) {
  //     initializeUser();
  //   }
  // }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        await axios.get('http://localhost:4000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <Typography sx={{ m: 4 }}>Loading...</Typography>;

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Platformatory Labs
          </Typography>
          {isAuthenticated ? (
            <>
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                Welcome, {user?.name}
              </Typography>
              {location.pathname !== '/' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ textTransform: 'none' }}
                >
                  Home
                </Button>
              )}
              {location.pathname !== '/profile' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ textTransform: 'none' }}
                >
                  Profile
                </Button>
              )}
              <Button
                color="inherit"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Log in with GitHub
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Container>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}