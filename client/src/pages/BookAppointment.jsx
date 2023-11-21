import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDentistDataById } from '../redux/dentistSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormBox, PageHeader } from '../components';
import { DateField, TimeField } from '@mui/x-date-pickers';

const BookAppointment = () => {
  const { dentist } = useSelector((state) => state.dentist);
  const [isAvailable, setIsAvailable] = useState(false);
  const { user } = useSelector((state) => state.user);
  const isBelowSmallScreen = useMediaQuery('(max-width: 600px)');
  const { palette } = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const checkAvailability = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateTimeForm = Object.fromEntries(formData);
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/check-booking-availability`,
          {
            dentistId: params.dentistId,
            date: dateTimeForm.date,
            time: dateTimeForm.time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(hideLoading());
        return;
      }

      toast.success(res.data.message);
      setIsAvailable(true);
      dispatch(hideLoading());
    } catch (error) {
      console.error(error);
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };
  const bookNow = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateTimeForm = Object.fromEntries(formData);

    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/book-appointment`,
          {
            dentistId: params.dentistId,
            userId: user.id,
            dentistInfo: dentist,
            userInfo: user,
            date: dateTimeForm.date,
            time: dateTimeForm.time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);

      dispatch(hideLoading());
      if (!res.data.success) {
        dispatch(hideLoading());
        toast.error(res.data.message);
      }
      dispatch(hideLoading());
      toast.success(res.data.message);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    dispatch(getDentistDataById(params));
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        minWidth: '100%',
      }}
    >
      <PageHeader
        title={`${dentist?.firstName} ${dentist?.lastName}`}
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <FormBox
        p="2rem"
        minWidth="100%"
        display="grid"
        gap="1.5rem"
        sx={
          isBelowSmallScreen
            ? {
                gridTemplateColumns: '1fr',
                rowGap: '4rem',
              }
            : {
                gridTemplateColumns: '1fr 1fr',
              }
        }
      >
        <Box
          color={palette.grey[100]}
          component="form"
          onSubmit={isAvailable ? bookNow : checkAvailability}
        >
          <Typography variant="h2">Timings</Typography>
          <Divider sx={{ paddingY: '0.5rem' }} />
          <Typography
            pt="2rem"
            variant="h4"
          >{`${dentist?.timings[0]} - ${dentist?.timings[1]}`}</Typography>
          <Typography pt="1rem" variant="h4">
            Select Your Slot
          </Typography>
          <DateField
            format="DD-MM-YYYY"
            margin="normal"
            label="Select Date"
            required
            fullWidth
            id="date"
            name="date"
            autoFocus
            sx={{
              '& label': {
                color: 'white',
              },
              '& div': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '& input': {
                  color: 'white',
                },
              },
            }}
          />
          <TimeField
            ampm={false}
            margin="normal"
            label="Select Time"
            required
            fullWidth
            id="time"
            name="time"
            autoFocus
            sx={{
              '& label': {
                color: 'white',
              },
              '& div': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '& input': {
                  color: 'white',
                },
              },
            }}
          />
          <Button
            variant={isAvailable ? 'contained' : 'outlined'}
            type="submit"
            fullWidth
            sx={{ marginTop: '1rem' }}
          >
            {isAvailable ? 'Book Now' : 'Check Availability'}
          </Button>
        </Box>
        <Box color={palette.grey[100]}>
          <Typography variant="h2">Basic Info</Typography>
          <Divider sx={{ paddingY: '0.5rem' }} />
          <Typography pt="2rem" variant="h4">
            Experience: {dentist?.experience}
          </Typography>
          <Typography pt="1rem" variant="h4">
            Fee Per Visit: {dentist?.feePerConsultation}
          </Typography>
          <Typography pt="1rem" variant="h4">
            Location: {dentist?.address}
          </Typography>
        </Box>
      </FormBox>
    </Container>
  );
};

export default BookAppointment;
