import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import PageHeader from '../common/PageHeader';
import FormBox from '../common/FormBox';
import { BASE_URL, dentistsColumns } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAppointmentsByUser,
  getDentistDataById,
  showAppointmentModal,
} from '../../redux/appointmentSlice';
import moment from 'moment';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import AppointmentModal from './AppointmentModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { appointments } = useSelector((state) => state.appointment);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAppointmentsByUser());
  }, []);

  const removeAppointment = async (appointmentId, userInfo, dentistId) => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/remove-book-appointment`,
          {
            appointmentId,
            dentistId,
            userInfo,
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
      dispatch(hideLoading());
      toast.success(res.data.message);
      navigate('/dentists');
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="APPOINTMENTS"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <FormBox p="1rem">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: palette.background.light,
                }}
              >
                {dentistsColumns.map((title) => {
                  return (
                    <TableCell
                      sx={{ fontSize: '1rem', color: palette.grey[100] }}
                      key={title}
                    >
                      {title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((item, index) => {
                const { _id, date, time, status, userInfo } = item;
                const { id, userId, firstName, lastName, phoneNumber } =
                  item.dentistInfo;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      bgcolor: palette.background.light,
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {id}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {firstName} {lastName}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {phoneNumber}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {moment(date).format('YYYY-MM-DD')}{' '}
                      {moment(time).format('HH:mm')}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {status}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75rem',
                        color: palette.grey[500],
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem',
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          dispatch(getDentistDataById(_id));
                          dispatch(showAppointmentModal());
                        }}
                      >
                        CHANGE
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeAppointment(_id, userInfo, userId)}
                      >
                        {status !== 'rejected' ? 'CANCEL' : 'REMOVE'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FormBox>
      <AppointmentModal />
    </Container>
  );
};

export default Profile;
