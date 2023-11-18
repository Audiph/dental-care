import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';

const User = () => {
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

  return <div>User</div>;
};

export default User;
