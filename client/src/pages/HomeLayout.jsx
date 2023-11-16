import { Fragment } from 'react';
import { Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default HomeLayout;
