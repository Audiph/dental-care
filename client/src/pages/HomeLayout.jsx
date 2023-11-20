import { Fragment } from 'react';
import { Navbar } from '@/components';
import { Outlet } from 'react-router-dom';
import { Loading } from '../components';
import { useSelector } from 'react-redux';

const HomeLayout = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <Fragment>
      {loading && <Loading />}
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default HomeLayout;
