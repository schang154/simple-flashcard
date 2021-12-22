import React from "react";
import { Backdrop, CircularProgress } from '@mui/material';

const Load = () => {

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 2 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </>
  );
}

export default Load;