import { Container, useTheme } from '@mui/material';
import { PageHeader } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Profile from './dentist/Profile';
import UsersList from './admin/UsersList';

const User = () => {
  const { user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const navigate = useNavigate();

  if (user?.isAdmin) {
    return <UsersList />;
  }

  if (user?.isDentist) {
    return <Profile />;
  }

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="USER PROFILE"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
    </Container>
  );
};

export default User;
