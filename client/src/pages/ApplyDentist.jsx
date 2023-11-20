import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, useTheme } from '@mui/material';
import { PageHeader, DentistForm } from '../components';
import { BASE_URL } from '../utils/constants';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const ApplyDentist = () => {
  const { user } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDentist = Object.fromEntries(formData);

    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/apply-dentist-account`,
          {
            ...newDentist,
            userId: user.id,
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
      navigate(`/profile/${user.id}`);
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
      dispatch(hideLoading());
    }
  };

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="DENTIST APPLICATION"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <DentistForm handleSubmit={handleSubmit} />
    </Container>
  );
};

export default ApplyDentist;
