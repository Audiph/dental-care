import { Fragment } from 'react';
import { Navbar } from '@/components';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { Loading } from '../components';
import { useSelector } from 'react-redux';

const HomeLayout = () => {
  const { loading } = useSelector((state) => state.alerts);

  const fetchData = async () => {
    try {
      await axios
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading && <Loading />}
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default HomeLayout;
