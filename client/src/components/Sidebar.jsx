import { Box, Divider, Drawer, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../utils/constants';
import Title from './common/Title';

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const { palette } = useTheme();
  return (
    <Drawer
      anchor="left"
      open={isSideBarOpen}
      onClose={() => setIsSideBarOpen(false)}
      sx={{
        '& .MuiPaper-root': {
          padding: '1rem',
          backgroundColor: palette.background.default,
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
      {navLinks.map(({ path, name }) => {
        return (
          <NavLink
            to={path}
            className="nav-link"
            style={{ marginBottom: '1rem' }}
            onClick={() => setIsSideBarOpen(false)}
          >
            {name}
          </NavLink>
        );
      })}
    </Drawer>
  );
};

export default Sidebar;
