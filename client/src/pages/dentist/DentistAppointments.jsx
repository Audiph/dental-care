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
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import { FormBox, PageHeader } from '../../components';
import { getAllAppointmentRequests } from '../../redux/appointmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, appointmentRequestsColumns } from '../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

const DentistAppointments = () => {
  const { appointments } = useSelector((state) => state.appointment);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const changeAppointmentStatus = async ({ _id }, status) => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/dentist/change-appointment-status`,
          { appointmentId: _id, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);
      console.log(
        '🚀 ~ file: DentistAppointments.jsx:42 ~ changeAppointmentStatus ~ res:',
        res
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(hideLoading());
        return;
      }

      toast.success(res.data.message);
      dispatch(hideLoading());
      window.location.reload();
    } catch (error) {
      toast.error('Error changing dentist account status');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    dispatch(getAllAppointmentRequests());
  }, []);
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
                {appointmentRequestsColumns.map((title) => {
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
                const { date, time, status, userId, dentistInfo, userInfo } =
                  item;
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
                      {userId}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {userInfo.name}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {dentistInfo.phoneNumber}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {date} {time}
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
                      {status === 'pending' && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '1rem',
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              changeAppointmentStatus(item, 'approved')
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              changeAppointmentStatus(item, 'rejected')
                            }
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FormBox>
    </Container>
  );
};

export default DentistAppointments;
