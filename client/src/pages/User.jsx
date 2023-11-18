import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { Loading } from '../components';
import { useSelector } from 'react-redux';

const User = () => {
  const { loading } = useSelector((state) => state.alerts);

  const fetchData = async () => {
    try {
      const res = await axios
        .post(
          `${BASE_URL}/api/user/get-user-info-by-id`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <h1>User</h1>
    </div>
  );
};

export default User;
