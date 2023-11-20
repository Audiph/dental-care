import { Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import FormBox from './FormBox';

const Dentist = ({
  firstName,
  lastName,
  phoneNumber,
  address,
  feePerConsultation,
  timings,
}) => {
  const { palette } = useTheme();
  return (
    <FormBox
      width="20vh"
      height="20vh"
      display="flex"
      justifyContent="start"
      alignItems="start"
      flexDirection="column"
      sx={{}}
    >
      <Card sx={{ bgcolor: 'inherit', margin: '1rem' }}>
        <Typography variant="h1" color={palette.secondary[500]}>
          {firstName} {lastName}
        </Typography>
      </Card>
      <Card
        p="1rem"
        onClick={() => console.log(firstName)}
        sx={{
          bgcolor: 'inherit',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Typography variant="h4" color={palette.grey[500]}>
          Phone Number: {phoneNumber}
        </Typography>
        <Typography variant="h4" color={palette.grey[500]}>
          Address: {address}
        </Typography>
        <Typography variant="h4" color={palette.grey[500]}>
          Fee per Visit: {feePerConsultation}
        </Typography>
        <Typography variant="h4" color={palette.grey[500]}>
          Timings: {timings[0]} - {timings[1]}
        </Typography>
      </Card>
      <Button>Book an Appointment</Button>
    </FormBox>
  );
};

export default Dentist;
