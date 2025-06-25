import { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Paper,
    Box,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const ProfilePage = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        pincode: '',
    });

    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.get('http://localhost:4000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData(res.data);
            } catch (err) {
                console.error('Error loading profile', err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) fetchProfile();
    }, [getAccessTokenSilently, isAuthenticated]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            const token = await getAccessTokenSilently();
            await axios.post('http://localhost:4000/api/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Failed to save profile', err);
        }
    };

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    My Profile
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        name="firstName"
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />

                    <TextField
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                    />

                    <TextField
                        name="phone"
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                    />

                    <TextField
                        name="city"
                        label="City"
                        fullWidth
                        margin="normal"
                        value={formData.city}
                        onChange={handleChange}
                    />

                    <TextField
                        name="pincode"
                        label="Pincode"
                        fullWidth
                        margin="normal"
                        value={formData.pincode}
                        onChange={handleChange}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ mt: 3 }}
                        fullWidth
                    >
                        Save Profile
                    </Button>
                </Box>
            </Paper>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Profile updated successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProfilePage;