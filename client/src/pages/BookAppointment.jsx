import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  return <div>BookAppointment</div>;
};

export default BookAppointment;
