import { Backdrop, CircularProgress, useTheme } from '@mui/material';

const Loading = () => {
  const { palette } = useTheme();

  return (
    <Backdrop
      sx={{
        color: palette.primary[500],
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
