import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const AuthModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newUser = Object.fromEntries(formData);
      const res = await axios
        .post(`${BASE_URL}/api/user/register`, newUser)
        .then((res) => res)
        .catch((err) => err.response);
      if (!res.data.success) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }

      toast.success(res.data.message);
      setLoading(false);
      setIsModalOpen(false);
      setIsLogin(true);
      e.currentTarget.reset();
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#fff',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography component="h1" variant="h1">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {isLogin ? (
            <Fragment>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="info"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="info"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </LoadingButton>
            </Fragment>
          ) : (
            <Fragment>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                color="info"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="info"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="info"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign Up
              </LoadingButton>
            </Fragment>
          )}
          <Grid container>
            <Grid item>
              <Button
                variant="body2"
                type="reset"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
