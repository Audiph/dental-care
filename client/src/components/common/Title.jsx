import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Typography, useTheme } from '@mui/material';
import { Fragment } from 'react';

const Title = ({ styleIcon, styleName, name }) => {
  return (
    <Fragment>
      <HealthAndSafetyIcon sx={styleIcon} />
      <Typography variant="h4" fontSize="16px" sx={styleName}>
        {name}
      </Typography>
    </Fragment>
  );
};

export default Title;
