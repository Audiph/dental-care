import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Folder, CircleNotifications } from '@mui/icons-material';
import { FlexBetween, FormBox, PageHeader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const deleteAllNotifications = async () => {
    try {
      dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/delete-all-notifications`,
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
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
      dispatch(hideLoading());
    }
  };

  return (
    <Container sx={{ position: 'absolute', minWidth: '100%' }}>
      <PageHeader
        title="NOTIFICATIONS"
        color={palette.tertiary[500]}
        style={{ paddingTop: '57px' }}
      />
      <FormBox p="1rem">
        <FlexBetween color={palette.grey[400]} mb="1rem">
          <FlexBetween>
            <Box>
              <Typography variant="h2" mb="-0.1rem">
                {user?.name?.toUpperCase()}
              </Typography>
            </Box>
          </FlexBetween>
          <Button
            onClick={() => deleteAllNotifications()}
            variant="contained"
            color="error"
            endIcon={<Folder />}
          >
            Delete All
          </Button>
        </FlexBetween>
        <List dense={true}>
          {user?.seenNotifications?.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemIcon
                  sx={{
                    '& svg': {
                      fontSize: '2rem',
                      color: palette.secondary[300],
                    },
                  }}
                >
                  <CircleNotifications />
                </ListItemIcon>
                <ListItemText
                  primary={item.message}
                  secondary={item.data?.name}
                  sx={{
                    '& span': { color: palette.grey[500], fontSize: '1rem' },
                    '& p': {
                      color: palette.grey[600],
                      fontSize: '0.75rem',
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </FormBox>
    </Container>
  );
};

export default Notifications;
