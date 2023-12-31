import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import { showLoading, hideLoading, hideModal } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../../redux/userSlice';

const AuthModal = () => {
  const { loading, modal } = useSelector((state) => state.alerts);
  const { login } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      dispatch(showLoading());
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData);

      if (login) {
        const res = await axios
          .post(`/api/user/login`, user)
          .then((res) => res)
          .catch((err) => err.response);

        if (!res.data.success) {
          toast.error(res.data.message);
          dispatch(hideLoading());
          return;
        }

        const { token, id } = res.data;

        localStorage.setItem('token', token);
        dispatch(hideLoading());
        dispatch(hideModal());
        navigate(`/profile/${id}`);
        return;
      }
      const res = await axios
        .post(`/api/user/register`, user)
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(hideLoading());
        return;
      }

      toast.success(res.data.message);
      dispatch(hideLoading());
      dispatch(hideModal());
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
      dispatch(hideLoading());
    }
  };

  return (
    <Modal
      open={modal}
      onClose={() => dispatch(hideModal())}
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
          {login ? 'Login' : 'Sign Up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {login ? (
            // LOGIN COMPONENT
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
            // REGISTER COMPONENT
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
                onClick={() => dispatch(toggleLogin(!login))}
              >
                {login
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
