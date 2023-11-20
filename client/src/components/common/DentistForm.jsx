import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FormBox from './FormBox';
import { TimeField } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DentistForm = ({ handleSubmit, dentist }) => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.alerts);
  const isBelowSmallScreen = useMediaQuery('(max-width: 675px)');
  const { palette } = useTheme();

  return (
    <FormBox
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        p: '2rem',
        bgcolor: palette.grey[200],
        maxWidth: '75vh',
        margin: 'auto',
      }}
    >
      <Divider textAlign="center" sx={{ pb: '2rem', fontSize: 20 }}>
        PERSONAL INFORMATION
      </Divider>
      <Box
        display="grid"
        columnGap="2rem"
        alignItems="space-between"
        sx={
          isBelowSmallScreen
            ? { gridTemplateColumns: '1fr' }
            : { gridTemplateColumns: '1fr 1fr' }
        }
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          color="info"
          defaultValue={dentist?.firstName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          color="info"
          defaultValue={dentist?.lastName}
        />
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="phoneNumber"
          autoFocus
          color="info"
          defaultValue={dentist?.phoneNumber}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          color="info"
          defaultValue={dentist?.address}
        />
      </Box>
      <Divider textAlign="center" sx={{ py: '2rem', fontSize: 20 }}>
        PROFESSIONAL INFORMATION
      </Divider>
      <Box
        display="grid"
        columnGap="2rem"
        alignItems="space-between"
        sx={
          isBelowSmallScreen
            ? { gridTemplateColumns: '1fr' }
            : { gridTemplateColumns: '1fr 1fr' }
        }
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="experience"
          label="Experience"
          name="experience"
          autoComplete="experience"
          autoFocus
          color="info"
          defaultValue={dentist?.experience}
        />
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="feePerConsultation"
          label="Fee Per Consultation"
          name="feePerConsultation"
          autoComplete="feePerConsultation"
          autoFocus
          color="info"
          defaultValue={dentist?.feePerConsultation}
        />
        <TimeField
          margin="normal"
          label="Timings"
          required
          fullWidth
          id="timings"
          name="timings"
          autoFocus
          defaultValue={dentist && moment(dentist?.timings[0], 'HH:mm a')}
        />
      </Box>
      <Divider sx={{ my: '1rem' }} />
      <Grid container spacing={2} columns={isBelowSmallScreen ? 1 : 0}>
        <Grid item xs={6}>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Submit
          </LoadingButton>
        </Grid>
        <Grid item xs={6}>
          {!user?.isDentist && (
            <Button
              type="reset"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              RESET
            </Button>
          )}
        </Grid>
      </Grid>
    </FormBox>
  );
};

export default DentistForm;
