import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ServiceBox from './common/ServiceBox';
import { services } from '../utils/constants';
import { Link } from 'react-router-dom';

const Services = () => {
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');
  const { palette } = useTheme();

  return (
    <Container>
      <Typography
        textAlign="center"
        mt="5rem"
        variant="h1"
        color={palette.tertiary[500]}
      >
        OUR SERVICES
      </Typography>
      <Box
        p="1rem"
        display="grid"
        gap="1.5rem"
        sx={
          isBelowSmallScreen
            ? {
                gridTemplateColumns: '1fr',
              }
            : {
                gridTemplateColumns: '1fr 1fr',
              }
        }
      >
        {services.map(({ id, title, desc, path, icon }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '5rem 2.5rem',
                gap: '2rem',
              }}
              key={id}
            >
              <Typography variant="h1" color={palette.grey[100]}>
                {icon}
              </Typography>
              <Typography variant="h3">{title}</Typography>
              <Typography variant="h5">{desc}</Typography>
              <Link to={path} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h5"
                  color={palette.secondary[500]}
                  sx={{
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Try now!
                </Typography>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};
export default Services;
