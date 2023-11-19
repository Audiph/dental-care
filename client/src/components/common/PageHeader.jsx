import { Typography } from '@mui/material';
import React from 'react';

const PageHeader = ({ title, color, style }) => {
  return (
    <Typography
      textAlign="center"
      my="5rem"
      variant="h1"
      color={color}
      sx={style}
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
