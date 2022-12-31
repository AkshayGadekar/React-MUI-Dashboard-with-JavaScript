import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';\

const MakePasswordVisible = (props) => {
    
    return (
        <InputAdornment position="end">
            <IconButton
            aria-label="toggle password visibility"
            onClick={props.handleClickShowPassword}
            onMouseDown={props.handleMouseDownPassword}
            edge="end"
            >
            {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    ) ;
 }

 export default MakePasswordVisible;
