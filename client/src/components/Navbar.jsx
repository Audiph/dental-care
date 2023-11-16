import { Button, Typography, useTheme } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { NavLink } from 'react-router-dom';
import FlexBetween from './common/FlexBetween';

const Navbar = () => {
  const { palette } = useTheme();

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
      <FlexBetween gap="0.75rem">
        <HealthAndSafetyIcon sx={{ fontSize: '28px' }} />
        <Typography variant="h4" fontSize="16px">
          Dental Care
        </Typography>
      </FlexBetween>
      {/* MIDDLE SIDE */}
      <FlexBetween gap="2rem">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/predictions" className="nav-link">
          predictions
        </NavLink>
      </FlexBetween>
      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <NavLink to="/" className="nav-link">
          dashboard
        </NavLink>
        <Button>Login</Button>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
