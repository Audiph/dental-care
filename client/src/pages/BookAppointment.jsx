import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDentistDataById } from '../redux/dentistSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const BookAppointment = () => {
  const { dentist } = useSelector((state) => state.dentist);
  const [isAvailable, setIsAvailable] = useState(false);
  console.log(
    '🚀 ~ file: BookAppointment.jsx:6 ~ BookAppointment ~ dentist:',
    dentist
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${BASE_URL}/api/user/check-booking-availability`,
        {
          dentistId: params.dentistId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(hideLoading());
        return;
      }

      toast.success(res.data.message);
      setIsAvailable(true);
      dispatch(hideLoading());
    } catch (error) {
      console.error(error);
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/user/book-appointment',
        {
          dentistId: params.dentistId,
          userId: user.id,
          dentistInfo: dentist,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());
      if (!res.data.success) {
        dispatch(hideLoading());
        toast.error(res.data.message);
        navigate(`/profile/${user.id}`);
      }

      dispatch(hideLoading());
      toast.success(res.data.message);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    dispatch(getDentistDataById(params));
  }, []);

  return <div>BookAppointment</div>;
};

export default BookAppointment;
