import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { FormBox, Loading, PageHeader } from '../../components';
import { BASE_URL, dentistsColumns } from '../../utils/constants';
import { getAllDentists } from '../../redux/dentistSlice';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const DentistsList = () => {
  const { dentists } = useSelector((state) => state.dentist);
  console.log(
    '🚀 ~ file: DentistsList.jsx:24 ~ DentistsList ~ dentists:',
    dentists
  );
  const { loading } = useSelector((state) => state.alerts);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const changeDentistStatus = async ({ _id, userId }, status) => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/admin/change-dentist-account-status`,
          {
            dentistId: _id,
            userId,
            status,
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
      dispatch(getAllDentists());
      dispatch(hideLoading());
    } catch (error) {
      console.error(error);
      toast.error('Error changing dentist account status');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    dispatch(getAllDentists());
  }, []);

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      {loading && <Loading />}
      <PageHeader
        title="DENTISTS"
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
              {dentists.map((item) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  phoneNumber,
                  createdAt,
                  status,
                } = item;
                return (
                  <TableRow
                    key={_id}
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
                      {_id}
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
                      {createdAt}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {status}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {status === 'pending' && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => changeDentistStatus(item, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      {status === 'approved' && (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => changeDentistStatus(item, 'blocked')}
                        >
                          Block
                        </Button>
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

export default DentistsList;
