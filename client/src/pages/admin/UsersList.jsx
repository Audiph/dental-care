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
import { usersColumns } from '../../utils/constants';

const UsersList = () => {
  const { users, user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="USERS"
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
                {usersColumns.map((title) => {
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
              {users.map((item) => {
                const { name, email, createdAt } = item;
                return (
                  <TableRow
                    key={email}
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
                      {name}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {email}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      {createdAt}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75rem', color: palette.grey[500] }}
                    >
                      <Button variant="outlined" color="secondary">
                        Block
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

export default UsersList;
