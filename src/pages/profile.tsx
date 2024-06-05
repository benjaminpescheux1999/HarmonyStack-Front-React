// src/pages/Profile.js
import { useEffect, useState } from 'react';
import FormUserProfile from '../components/forms/profile';
import { CircularProgress, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Paper, Box } from '@mui/material';
import { instance, useAuth } from '../contexts/authContext';
import { IUser } from '../contexts/type';
import { useTranslation } from 'react-i18next';

interface IAuthContext {
    user: IUser | null; // Assuming User is a defined type for user objects
    setUser: (user: IUser | null) => void;
  }

const Profile = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth() as IAuthContext;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await instance.get('/user');
      setUser({
        email: response?.data?.email,
        username: response?.data?.username,
        lastname: response?.data?.lastname,
        // avatar: response?.data?.avatar // Assuming avatar URL is part of the user data
      });
      setError(null); // Reset error state on successful fetch
    } catch (err: unknown) {
      type ErrorResponse = { response?: { status?: number; data?: unknown }; message?: string };
      const error = err as ErrorResponse;
      if (!error.response || error.response.status !== 401) {
        // Handle errors other than token expiry
        setError(typeof error.response?.data === 'string' ? error.response.data : (error.message || 'An unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdateSuccess = () => {
    fetchUser(); // Refetch user data on update success to ensure UI is in sync
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{t('profile.errorLabel')}: {error}</Typography>;

  return (
    <Container className="my-10">
      <Grid container spacing={2} sx={{ height: 'auto' }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ height: '100%', paddingY: 2 }}>
            <Box sx={{alignContent: 'center', height:'100%'}}>
              <Card elevation={0}>
                <CardMedia
                  component="img"
                  style={{ width: '100%', height: 'auto' }} // Adjust width to 100% of the grid and height automatically
                  image={user && user.imageUrl ? user.imageUrl : "/defaultprofileMen.png"}
                  alt="User Avatar"
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button 
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: 'rgb(82, 95, 127)', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(62, 75, 107)',
                        }
                    }}
                  >
                    {t('profile.seeMySubscription')}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ height: '100%', paddingY: 2 }}>
            <Box sx={{alignContent: 'center', height:'100%'}}>
              {user && <FormUserProfile user={user} onSubmitSuccess={handleUpdateSuccess} />}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
