import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import FlexBetween from './common/FlexBetween';
import { Fragment, useState } from 'react';
import Sidebar from './Sidebar';
import { navLinks } from '../utils/constants';
import Title from './common/Title';
import AuthModal from './AuthModal';

const Navbar = () => {
  const user = false;
  const { palette } = useTheme();
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <FlexBetween
        mb="0.25rem"
        p="1.5rem 1.5rem"
        color={palette.grey[300]}
        position="fixed"
        width="100%"
        margin="0 auto"
        sx={{
          backdropFilter: 'saturate(180%) blur(10px)',
        }}
      >
        {/* LEFT SIDE */}
        {isBelowSmallScreen && (
          <Fragment>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsSideBarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Sidebar
              isSideBarOpen={isSideBarOpen}
              setIsSideBarOpen={setIsSideBarOpen}
            />
          </Fragment>
        )}
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <FlexBetween gap="0.75rem">
            <Title
              styleIcon={{ fontSize: '28px', color: `${palette.grey[300]}` }}
              name="Dental Care"
            />
          </FlexBetween>
        </NavLink>

        {/* MIDDLE SIDE */}
        <FlexBetween gap="2rem" sx={isBelowSmallScreen && { display: 'none' }}>
          {navLinks.map(({ id, path, name }) => {
            return (
              <NavLink to={path} className="nav-link" key={id}>
                {name}
              </NavLink>
            );
          })}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="0.5rem">
          <NavLink to="/" className="nav-link">
            {user && (
              <NotificationsIcon
                sx={{ fontSize: '1.5rem', paddingTop: '0.25rem' }}
              />
            )}
          </NavLink>
          <Button onClick={() => setIsModalOpen(true)}>
            {user ? 'Jeff' : 'LOGIN'}
          </Button>
        </FlexBetween>
      </FlexBetween>
      <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Fragment>
  );
};

export default Navbar;
