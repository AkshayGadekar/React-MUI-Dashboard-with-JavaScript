export const borderLabelToBlackOutlined = {InputProps: {sx: {"&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "#000"}}}, 
    InputLabelProps: {sx: {"&.Mui-focused": {color: "#000"}}}};

export const borderLabelToBlackStandard = {InputProps: {sx: {"&::after": {borderBottom: "2px solid #000000"}}}, 
InputLabelProps: {sx: {"&.Mui-focused": {color: "#000"}}}};

export const drawerWidth = Number(process.env.REACT_APP_DRAWER_WIDTH);

export const noWrap = {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'};