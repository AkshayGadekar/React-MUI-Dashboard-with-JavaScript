
export const filterValidationErrors = (validationErrorsObj, fields) => {
    let fieldValidationErrors = {};
    let otherValidationErrors = {};

    for (const key in validationErrorsObj) {
        if (fields.includes(key)) {
            fieldValidationErrors[key] = validationErrorsObj[key];
        } else {
            otherValidationErrors[key] = validationErrorsObj[key];
        }
    }

    return [fieldValidationErrors, otherValidationErrors];
}

//server side errors coming as validation errors but field is not present in form
export const otherValidationErrors = (initialValues, validationErrorsObj) => {
    const fields = Object.keys(initialValues)
    
    let errors = [];
    for (const key in validationErrorsObj) {
        if (!fields.includes(key)) {
            errors.push(validationErrorsObj[key]);
        }
    }
    
    return errors;
}

export const log = (...params) => {
    console.log(...params);
}

export const getSizeInBytes = (sizeInMB) => (sizeInMB * 1000 * 1024);
export const getSizeInKB = (sizeInMB) => (sizeInMB * 1000);
export const getSizeInMB = (sizeInBytes) => (sizeInBytes/(1000*1024)).toFixed(2);

export const getVarName = (variable) => Object.keys({variable})[0];

export const getBasicSnackBarInfo = (extraInfo={}) => {
    
    return {key: Math.random(), message: "", severity: "error", 
    vertical: "bottom", horizontal: "right", duration: 5000, 
    variant: "filled", elevation: 6, width: '100%', ...extraInfo}
}

export const checkProperType = (param) => param;

export const getProperValue = (param, dataType) => {

    let value = param;
    if (typeof param != dataType) {
        switch (dataType) {
            case 'object':
                value = {};   
                break;

            case 'array':
                value = [];   
                break;

            case 'string':
                value = "";   
                break;

            case 'boolean':
                value = false;   
                break;
        
            default:
                break;
        }
    } 

    return value;

}

export const getQueryString = (data) => Object.keys(data).map(key => key + '=' + (data[key])).join('&');

export const encodedQueryString = (data) => {
    return Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    }).join('&');
}

export const isLinkSame = (dynamicLink, actualLink) => {
    let link1ToArray = dynamicLink.split('/');
    let link2ToArray = actualLink.split('/');
    
    if (link1ToArray.length == link2ToArray.length) {
        const dynamicIndices = [];
        
        link1ToArray = link1ToArray.filter((linkSlice, index) => {
            if (/:.+/i.test(linkSlice)) {
                dynamicIndices.push(index);
                return false;
            }
            return true;
        });
        link2ToArray = link2ToArray.filter((linkSlice, index) => !dynamicIndices.includes(index));
        
        const newLink1 = link1ToArray.join('/');
        const newLink2 = link2ToArray.join('/');
        
        return newLink1 === newLink2;
    }
    
    return false;
}

export const replaceDynamicParamInHref = (dynamicLink, dynamicParams) => {
    let linkToArray = dynamicLink.split('/');
    let noOfdynamicParams = 0;
    linkToArray = linkToArray.map((linkSlice, index) => {
        if (/:.+/i.test(linkSlice)) {
            linkSlice = dynamicParams[noOfdynamicParams];
            noOfdynamicParams++;
        }
        return linkSlice;
    });
    return linkToArray.join('/');
}

export const convertToTimezone = (date, tzString) => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

export const callAfterTimeout = (func, time) => {
    setTimeout(() => {
        func();
    }, time * 1000);
}

export const formatSecondsAsTime = (secs) => {
    const hr  = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600))/60);
    let sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){ 
        min = "0" + min; 
    }
    if (sec < 10){ 
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}

export const validateFile = (file, validationRules) => {

    if (file == null) {
        throw new Error('please upload valid file.');
    }
    
    if (validationRules.mimes && !validationRules.mimes[0].includes(file.type)) {
        throw new Error(validationRules.mimes[1]);
    }

    if (validationRules.maxSize && file.size > validationRules.maxSize[0]) {
        throw new Error(validationRules.maxSize[1]);
    }
    

}