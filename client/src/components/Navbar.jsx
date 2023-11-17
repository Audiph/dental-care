import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';
import FlexBetween from './common/FlexBetween';

const Navbar = () => {
  const user = false;
  const { palette } = useTheme();
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');

  return (
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
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <FlexBetween gap="0.75rem">
          <HealthAndSafetyIcon sx={{ fontSize: '28px' }} />
          <Typography variant="h4" fontSize="16px">
            Dental Care
          </Typography>
        </FlexBetween>
      </NavLink>
      {/* MIDDLE SIDE */}
      <FlexBetween gap="2rem" sx={isBelowSmallScreen && { display: 'none' }}>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/appointments" className="nav-link">
          Appointments
        </NavLink>
        <NavLink to="/apply-doctor" className="nav-link">
          Apply as Doctor
        </NavLink>
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
        <Button>{user ? 'Jeff' : 'LOGIN'}</Button>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
