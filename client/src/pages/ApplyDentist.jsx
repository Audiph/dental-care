import { Container, useTheme } from '@mui/material';
import { PageHeader, DentistForm } from '../components';

const ApplyDentist = () => {
  const { palette } = useTheme();

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="DENTIST APPLICATION"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <DentistForm />
    </Container>
  );
};

export default ApplyDentist;
