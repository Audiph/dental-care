import { Box, Divider, Drawer, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { userLinks } from '../utils/constants';
import Title from './common/Title';
import { useDispatch, useSelector } from 'react-redux';
import { hideSideNav } from '../redux/alertsSlice';
import { appLinks } from '../utils/util';

const Sidebar = () => {
  const { sideNav } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const links = appLinks(user);

  return (
    <Drawer
      anchor="left"
      open={sideNav}
      onClose={() => dispatch(hideSideNav())}
      sx={{
        '& .MuiPaper-root': {
          padding: '1rem',
          backgroundColor: palette.background.default,
          minWidth: '10rem',
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="start"
        gap="0.25rem"
        alignItems="center"
      >
        <Title
          styleIcon={{ fontSize: '28px', color: `${palette.grey[300]}` }}
          name="Menu"
        />
      </Box>
      <Divider sx={{ margin: '1rem 0' }} />
      {links.map(({ id, path, name }) => {
        return (
          <NavLink
            to={path}
            className="nav-link"
            style={{ marginBottom: '1rem' }}
            onClick={() => dispatch(hideSideNav())}
            key={id}
          >
            {name}
          </NavLink>
        );
      })}
    </Drawer>
  );
};

export default Sidebar;
