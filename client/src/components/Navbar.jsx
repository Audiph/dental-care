import { Box, Typography, useTheme } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FlexBetween from './common/FlexBetween';

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');
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
        <MonetizationOnIcon sx={{ fontSize: '28px' }} />
        <Typography variant="h4" fontSize="16px">
          Finance
        </Typography>
      </FlexBetween>
      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
      <FlexBetween gap="2rem">
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
