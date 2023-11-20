import { useDispatch, useSelector } from 'react-redux';
import { DentistForm, PageHeader } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { getDentistData } from '../../redux/dentistSlice';

const Profile = () => {
  const { dentist } = useSelector((state) => state.dentist);
  const { palette } = useTheme();
  const params = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getDentistData(params));
  }, []);

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="DENTIST PROFILE"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <DentistForm handleSubmit={handleSubmit} dentist={dentist} />
    </Container>
  );
};

export default Profile;
