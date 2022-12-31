import {getBasicSnackBarInfo} from "./helpers";
import {otherValidationErrors} from "./helpers";
import {filterValidationErrors} from "./helpers";

const processAxiosError = (...args) => {
    
    const error = args[0];
    const props = args[1];
    const formik = args[2];
    let snackBarOptions = args[3];

    const {setShowSnackBar, setSnackbarInfo} = props;
    snackBarOptions = getBasicSnackBarInfo(snackBarOptions);
    
    let errorMessage;
    if (error.response) {//axios.isAxiosError(error)
        const errorResponse = error.response;
        const VALIDATION_ERROR = process.env.REACT_APP_VALIDATION_ERROR;
        const pattern = new RegExp(VALIDATION_ERROR, 'i');
        if (errorResponse.status == 422 && pattern.test(errorResponse.data.message)) {
            const validationsObjFromResponse = errorResponse.data.data;
            
            let validationError;
            for (const key in validationsObjFromResponse) {
                validationError = validationsObjFromResponse[key]; 
                if (Array.isArray(validationError)) {
                    validationError = (validationError).join(" ");
                }
                validationsObjFromResponse[key] = validationError;
                //validationErrorsObj[key as keyof typeof validationsObjFromResponse] = validationError;
                //formik.setFieldError(key, validationError);
            }
            const validationErrorsObj = validationsObjFromResponse; 

            
            /*if (formik != null) {
                //if initialValues are undefined
                if (formik.initialValues == null && typeof formik.initialValues != 'object') {
                    for (const key in validationErrorsObj) {
                        formik.setFieldError(key, validationErrorsObj[key as keyof typeof validationErrorsObj]);
                    }
                    return;    
                }
                
                const fields = Object.keys(formik.initialValues);
                const [fieldValidationErrors, otherValidationErrors] = filterValidationErrors(validationErrorsObj as object, fields);
                
                for (const key in fieldValidationErrors) {
                    formik.setFieldError(key, fieldValidationErrors[key as keyof typeof fieldValidationErrors]);
                }
                
                const otherValidationErrorsArr = Object.values(otherValidationErrors);
                const errorMessage = otherValidationErrorsArr.join(" ");
                snackBarOptions.message = errorMessage;
                setSnackbarInfo(snackBarOptions);
                setShowSnackBar(true);

                return;
            }*/
            
            const validationErrorsArr = Object.values(validationErrorsObj);
            errorMessage = validationErrorsArr.join(" ");
            
        } else {
            errorMessage = errorResponse.data.message == null ? error.message : errorResponse.data.message;
        } 

    } else {
        errorMessage = error.message;
        //this means error.response is undefined, so request never reached to server (network error or cancelled(cancelled request does fail into axios intercepor error response I think))
        if (error.name == 'TypeError') {
            errorMessage = "Request could not proceed further.";
        }
    }

    snackBarOptions.message = errorMessage;
    setSnackbarInfo(snackBarOptions);
    setShowSnackBar(true);

}


export default processAxiosError;



