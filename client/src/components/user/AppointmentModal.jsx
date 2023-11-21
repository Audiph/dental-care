import { Box, Modal, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import { hideAppointmentModal } from '../../redux/appointmentSlice';
import { DateField, TimeField } from '@mui/x-date-pickers';

const AppointmentModal = () => {
  const { loading } = useSelector((state) => state.alerts);
  const { appointmentModal, appointment } = useSelector(
    (state) => state.appointment
  );
  const [isAvailable, setIsAvailable] = useState(false);
  const { palette } = useTheme();
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
            dentistId: appointment.dentistInfo.userId,
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

  const updateAppointment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateTimeForm = Object.fromEntries(formData);

    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/update-book-appointment`,
          {
            appointmentId: appointment._id,
            dentistInfo: appointment.dentistInfo,
            userInfo: appointment.userInfo,
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
        return;
      }
      toast.success(res.data.message);
      dispatch(hideLoading());
      window.location.reload();
      dispatch(hideAppointmentModal());
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  return (
    <Modal
      open={appointmentModal}
      onClose={() => dispatch(hideAppointmentModal())}
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
          bgcolor: palette.grey[300],
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography component="h1" variant="h1">
          {appointment?.dentistInfo?.firstName}{' '}
          {appointment?.dentistInfo?.lastName}
        </Typography>
        <Box
          component="form"
          onSubmit={isAvailable ? updateAppointment : checkAvailability}
          sx={{ mt: 1 }}
        >
          <DateField
            format="DD-MM-YYYY"
            margin="normal"
            label="Select Date"
            required
            fullWidth
            id="date"
            name="date"
            autoFocus
            color="info"
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
            color="info"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant={isAvailable ? 'contained' : 'outlined'}
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
            color="info"
          >
            {isAvailable ? 'reschedule appointment' : 'Check Availability'}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
