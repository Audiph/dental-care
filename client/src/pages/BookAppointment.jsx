import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDentistDataById } from '../redux/dentistSlice';

const BookAppointment = () => {
  const { dentist } = useSelector((state) => state.dentist);
  console.log(
    '🚀 ~ file: BookAppointment.jsx:6 ~ BookAppointment ~ dentist:',
    dentist
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDentistDataById(params));
  }, []);

  return <div>BookAppointment</div>;
};

export default BookAppointment;
