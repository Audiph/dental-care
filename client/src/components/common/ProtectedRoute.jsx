import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '@/redux/userSlice';
import { hideLoading, showLoading } from '@/redux/alertsSlice';
import { BASE_URL } from '@/utils/constants';

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `/api/user/get-user-info-by-id`,
          { token: localStorage.getItem('token') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        localStorage.clear();
        dispatch(hideLoading());
        navigate('/');
        return;
      }

      const {
        id,
        name,
        email,
        isAdmin,
        isDentist,
        seenNotifications,
        unseenNotifications,
      } = res.data;

      dispatch(hideLoading());
      dispatch(
        setUser({
          id,
          name,
          email,
          isAdmin,
          isDentist,
          seenNotifications,
          unseenNotifications,
        })
      );
    } catch (error) {
      console.error(error);
      localStorage.clear();
      dispatch(hideLoading());
      navigate('/');
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
