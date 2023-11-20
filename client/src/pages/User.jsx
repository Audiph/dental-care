import { Container, useTheme } from '@mui/material';
import { PageHeader } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const navigate = useNavigate();

  if (user?.isAdmin) {
    navigate('/admin/users-list');
    return;
  }

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="NOTIFICATIONS"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
    </Container>
  );
};

export default User;
