import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/userSlice';
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
import { FormBox, PageHeader } from '../../components';
import { dentistsColumns } from '../../utils/constants';
import { getAllDentists } from '../../redux/dentistSlice';

const DentistsList = () => {
  const { dentists } = useSelector((state) => state.dentist);
  const { user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDentists());
  }, []);

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
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
                key={user.id}
              >
                {dentistsColumns.map((title) => {
                  return (
                    <TableCell
                      sx={{ fontSize: '1rem', color: palette.grey[100] }}
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
                        <Button variant="outlined" color="primary">
                          Approved
                        </Button>
                      )}
                      {status === 'approved' && (
                        <Button variant="outlined" color="secondary">
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
