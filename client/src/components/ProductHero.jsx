import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@mui/material';
import dentalImg from '../assets/product-hero.jpg';
import { useDispatch } from 'react-redux';
import { showRegister } from '../redux/userSlice';
import { showModal } from '../redux/alertsSlice';

const ProductHero = () => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        image={dentalImg}
        title="dentist"
        alt="dentist"
        sx={{
          maxHeight: '50vh',
          minHeight: '50vh',
        }}
      />
      <CardContent
        sx={{
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1" fontSize={50} mb="5rem">
          DENTAL CARE, YOUR DENTAL FRIEND
        </Typography>
        <Typography variant="h5" fontSize={20} mb="2rem">
          Enjoy our services as you start your dental journey.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(showRegister());
            dispatch(showModal());
          }}
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductHero;
