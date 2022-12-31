import React from 'react';
import HandleAxiosError from "./HandleAxiosError";
import authAxios, {guestAxios} from "../axios.js";
import apiEndPoints, {processEndPoint as _} from "../apiEndPoints";

const withAxios = (WrappedComponent) => {

    const axiosEssentials = {authAxios, guestAxios, apiEndPoints, _};

    return (props) => (
        <HandleAxiosError>
            <WrappedComponent {...props} {...axiosEssentials} />
        </HandleAxiosError>
    );
};

export default withAxios;