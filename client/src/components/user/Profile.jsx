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
import { dentistsColumns } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointmentsByUser } from '../../redux/appointmentSlice';

const Profile = () => {
  const { appointments } = useSelector((state) => state.appointment);
  console.log(
    '🚀 ~ file: Profile.jsx:21 ~ Profile ~ appointments:',
    appointments
  );
  const { palette } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointmentsByUser());
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
              {appointments.map((item) => {
                const { date, time, status } = item;
                const { id, firstName, lastName, phoneNumber } =
                  item.dentistInfo;
                return (
                  <TableRow
                    key={id}
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
                      <Button variant="outlined" color="secondary">
                        CHANGE
                      </Button>
                      <Button variant="contained" color="error">
                        CANCEL
                      </Button>
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

export default Profile;
