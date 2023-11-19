import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { PageHeader, FormBox } from '../components';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { TimeField } from '@mui/x-date-pickers';

const ApplyDentist = () => {
  const { loading } = useSelector((state) => state.alerts);
  const isBelowSmallScreen = useMediaQuery('(max-width: 675px)');
  const { palette } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);
    console.log('🚀 ~ file: ApplyDentist.jsx:15 ~ handleSubmit ~ user:', user);
  };

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="DENTIST APPLICATION"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
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
          gridTemplateColumns="1fr 1fr"
          columnGap="2rem"
          alignItems="space-between"
          sx={isBelowSmallScreen && { gridTemplateColumns: '1fr' }}
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
          />
        </Box>
        <Divider textAlign="center" sx={{ py: '2rem', fontSize: 20 }}>
          PROFESSIONAL INFORMATION
        </Divider>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          columnGap="2rem"
          alignItems="space-between"
          sx={isBelowSmallScreen && { gridTemplateColumns: '1fr' }}
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="feePerConsultation"
            label="Fee Per Consultation"
            name="feePerConsultation"
            autoComplete="feePerConsultation"
            autoFocus
            color="info"
          />
          <TimeField
            margin="normal"
            label="Timings"
            required
            fullWidth
            id="timings"
            name="timings"
            autoFocus
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
            <Button
              type="reset"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </FormBox>
    </Container>
  );
};

export default ApplyDentist;
