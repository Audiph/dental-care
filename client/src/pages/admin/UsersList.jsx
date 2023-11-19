import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/userSlice';

const UsersList = () => {
  const { users } = useSelector((state) => state.user);
  console.log('🚀 ~ file: UsersList.jsx:10 ~ UsersList ~ users:', users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return <div>UsersList</div>;
};

export default UsersList;
