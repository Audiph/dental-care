import {
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import FlexBetween from '../common/FlexBetween';
import { Fragment } from 'react';
import Sidebar from './Sidebar';
import Title from '../common/Title';
import AuthModal from './AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showSideNav } from '@/redux/alertsSlice';
import { logout, toggleLogin } from '@/redux/userSlice';
import { appLinks } from '@/utils/util';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { BASE_URL } from '../../utils/constants';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/userSlice';
import axios from 'axios';

const Navbar = () => {
  const { login, user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const isBelowSmallScreen = useMediaQuery('(max-width: 992px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = appLinks(user);

  const markAsSeenNotifications = async () => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/mark-all-notifications-as-seen`,
          {
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

      const {
        id,
        name,
        email,
        isDentist,
        isAdmin,
        seenNotifications,
        unseenNotifications,
      } = await res.data;

      dispatch(
        setUser({
          id,
          name,
          email,
          isDentist,
          isAdmin,
          seenNotifications,
          unseenNotifications,
        })
      );
      dispatch(hideLoading());
      navigate('/notifications');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
      dispatch(hideLoading());
    }
  };

  return (
    <Fragment>
      <FlexBetween
        mb="0.25rem"
        p="1.5rem 1.5rem"
        color={palette.grey[300]}
        position="fixed"
        width="100%"
        margin="0 auto"
        sx={{
          backdropFilter: 'saturate(180%) blur(10px)',
        }}
        zIndex={1}
      >
        {/* LEFT SIDE */}
        {isBelowSmallScreen && (
          <Fragment>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(showSideNav())}
            >
              <MenuIcon />
            </IconButton>
            <Sidebar />
          </Fragment>
        )}
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <FlexBetween gap="0.75rem">
            <Title
              styleIcon={{ fontSize: '28px', color: `${palette.grey[300]}` }}
              name="Dental Care"
            />
          </FlexBetween>
        </NavLink>

        {/* MIDDLE SIDE */}
        <FlexBetween gap="2rem" sx={isBelowSmallScreen && { display: 'none' }}>
          {links?.map(({ id, path, name }) => {
            return (
              <NavLink to={path} className="nav-link" key={id}>
                {name}
              </NavLink>
            );
          })}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="2rem">
          <Button
            onClick={() => {
              if (user?.unseenNotifications.length === 0) {
                navigate('/notifications');
                return;
              }

              markAsSeenNotifications();
            }}
          >
            {user && (
              <Badge
                badgeContent={user?.unseenNotifications.length}
                color="secondary"
              >
                <NotificationsIcon
                  sx={{ fontSize: '2rem', paddingTop: '0.25rem' }}
                />
              </Badge>
            )}
          </Button>
          {user?.isAdmin ? (
            <Button
              onClick={() => {
                localStorage.clear();
                dispatch(logout());
                navigate('/');
              }}
            >
              Logout
            </Button>
          ) : user ? (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    {user?.name}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        navigate(`/profile/${user?.id}`);
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.clear();
                        popupState.close();
                        dispatch(logout());
                        navigate('/');
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
          ) : (
            <Button
              onClick={() => {
                login
                  ? dispatch(toggleLogin(login))
                  : dispatch(toggleLogin(!login));
                dispatch(showModal());
              }}
            >
              LOGIN
            </Button>
          )}
        </FlexBetween>
      </FlexBetween>
      <AuthModal />
    </Fragment>
  );
};

export default Navbar;
