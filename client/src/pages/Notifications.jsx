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
import { useSelector } from 'react-redux';

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  console.log('🚀 ~ file: Notifications.jsx:18 ~ Notifications ~ user:', user);
  const { palette } = useTheme();
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
          <Button variant="contained" color="error" endIcon={<Folder />}>
            Delete All
          </Button>
        </FlexBetween>
        <List dense={true}>
          {user?.unseenNotifications?.map((item) => {
            return (
              <ListItem>
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
                  secondary={item.data.name}
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
