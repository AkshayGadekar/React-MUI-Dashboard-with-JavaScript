import React, {useState} from 'react';
import ShowSnackbar from '../components/utilities/ShowSnackbar';
import processAxiosError from "../funcs/processAxiosError";
import {log} from "../funcs/helpers";
import {getBasicSnackBarInfo} from "../funcs/helpers";

const HandleAxiosError = (props) => {
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState(getBasicSnackBarInfo());

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setShowSnackBar(false);
    };

    return (
        <>
            {React.cloneElement(props.children, {
                setShowSnackBar, setSnackbarInfo, processAxiosError 
            })}
            <ShowSnackbar open={showSnackBar} closeSnackbar={handleCloseSnackBar} 
            snackbarInfo={snackbarInfo} />
        </>
    );
}

export default HandleAxiosError;
