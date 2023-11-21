import { DentistProfile, UserProfile } from '../components';
import { useSelector } from 'react-redux';
import UsersList from './admin/UsersList';

const User = () => {
  const { user } = useSelector((state) => state.user);

  if (user?.isAdmin) {
    return <UsersList />;
  }

  if (user?.isDentist) {
    return <DentistProfile />;
  }

  return <UserProfile />;
};

export default User;
