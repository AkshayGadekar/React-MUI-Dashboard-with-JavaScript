import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseModal = (props) => {
  return (
    <IconButton aria-label="close" onClick={props.close} sx={{position: 'absolute',top: 12,right: 12,color: (theme) => theme.palette.grey[500],}}>
        <CloseIcon />
    </IconButton>
  )
}

export default CloseModal