import { useDispatch, useSelector } from 'react-redux';
import { DentistForm, PageHeader } from '..';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { getDentistDataByUser } from '../../redux/dentistSlice';
import { BASE_URL, delimiter } from '../../utils/constants';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { dentist } = useSelector((state) => state.dentist);
  const { palette } = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateDentist = Object.fromEntries(formData);
    const newTimings = updateDentist.timings.split(delimiter, 2);

    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/dentist/update-dentist-profile`,
          {
            ...updateDentist,
            userId: user.id,
            timings: newTimings,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(hideLoading());
        return;
      }
      dispatch(hideLoading());
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    dispatch(getDentistDataByUser(params));
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
