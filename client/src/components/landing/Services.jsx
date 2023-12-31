import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { services } from '../../utils/constants';
import { Link } from 'react-router-dom';
import PageHeader from '../common/PageHeader';

const Services = () => {
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');
  const { palette } = useTheme();

  return (
    <Container>
      <PageHeader title="OUR SERVICES" color={palette.tertiary[500]} />
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
