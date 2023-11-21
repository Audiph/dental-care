import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { Dentist, PageHeader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllApprovedDentists } from '../redux/dentistSlice';

const Dentists = () => {
  const isBelowSmallScreen = useMediaQuery('(max-width: 600px)');
  const isBelowMediumScreen = useMediaQuery('(max-width: 900px)');
  const { dentists } = useSelector((state) => state.dentist);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApprovedDentists());
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        minWidth: '100%',
      }}
    >
      <PageHeader
        title="DENTISTS"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <Box
        maxWidth="100vh"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gap="3rem"
        sx={
          isBelowSmallScreen
            ? { gridTemplateColumns: '1fr' }
            : isBelowMediumScreen
            ? { gridTemplateColumns: '1fr 1fr' }
            : { gridTemplateColumns: '1fr 1fr 1fr' }
        }
      >
        {dentists?.map((dentist) => {
          return <Dentist key={dentist.id} {...dentist} />;
        })}
      </Box>
    </Container>
  );
};

export default Dentists;
