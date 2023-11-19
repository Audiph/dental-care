import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import FlexBetween from './common/FlexBetween';
import { Fragment, useState } from 'react';
import Sidebar from './Sidebar';
import { navLinks } from '../utils/constants';
import Title from './common/Title';
import AuthModal from './AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showSideNav } from '../redux/alertsSlice';
import { toggleLogin } from '../redux/userSlice';

const Navbar = () => {
  const { login, user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');
  const dispatch = useDispatch();

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
        zIndex={1}
      >
        {/* LEFT SIDE */}
        {isBelowSmallScreen && (
          <Fragment>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(showSideNav())}
            >
              <MenuIcon />
            </IconButton>
            <Sidebar />
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
          {user ? (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    {user?.name}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
          ) : (
            <Button
              onClick={() => {
                login
                  ? dispatch(toggleLogin(login))
                  : dispatch(toggleLogin(!login));
                dispatch(showModal());
              }}
            >
              LOGIN
            </Button>
          )}
        </FlexBetween>
      </FlexBetween>
      <AuthModal />
    </Fragment>
  );
};

export default Navbar;
