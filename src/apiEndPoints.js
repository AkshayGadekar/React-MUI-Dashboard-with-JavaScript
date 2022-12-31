
const apiEndPoints = {
    auth : {
        'signup': {
            method: 'post',
            url: '/signup',
            withCredentials: true
        },
        'login': {
            method: 'post',
            url: '/login',
            //withCredentials: true
        },
        'logout': {
            method: 'get',
            url: '/logout',
            withCredentials: true
        },
        'getUserDetails': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/user',
        },
    },
    nodes: {
        'list': {
            method: 'get',
            url: '/nodes',
        },
        'edit': {
            method: 'get',
            url: '/nodes/{id}',
        },
        'update': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'put',
            url: '/nodes/{id}',
            showProgressBar: true
        },
        'restartNodeService': {
            method: 'post',
            url: '/nodes/{id}/service/{name}/restart',
        },
        'updateNodeService': {
            method: 'post',
            url: '/nodes/{id}/service/{name}/update',
        }
    },
    messages: {
        'list': {
            baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
            method: 'get',
            url: '/messages'
        },
        'uploadAudio': {
            baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
            method: 'post',
            url: '/messages',
            showProgressBar: true
        },
        'create': {
            baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
            method: 'put',
            url: '/messages/{id}',
            showProgressBar: true
        },
        'delete': {
            baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
            method: 'delete',
            url: '/messages/{id}'
        },
    },
    users: {
        'list': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/accounts/{id}',
        },
        'getRoles': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/permissions/roles',
        },
        'addUser': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'post',
            url: '/users',
            showProgressBar: true
        },
        'getUser': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/users/{id}'
        },
        'editUser': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'put',
            url: '/users/{id}',
            showProgressBar: true
        },
        'editPassword': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'post',
            url: '/user/password',
            showProgressBar: true
        },
    },
    roles: {
        'getPermissions': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/permissions'
        },
        'list': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/permissions/roles'
        },
        'create': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'post',
            url: '/permissions/roles',
            showProgressBar: true
        },
        'edit': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'get',
            url: '/permissions/roles/{id}'
        },
        'update': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'PUT',
            url: '/permissions/roles/{id}',
            showProgressBar: true
        },
        'createPermission': {
            baseURL: process.env.REACT_APP_BASE_URL_GMV,
            method: 'post',
            url: '/permissions',
            showProgressBar: true
        }
    },
    class : {
        'get': {
            baseURL: process.env.REACT_APP_BASE_URL,
            method: 'get',
            url: '/class/{slug}',
            /*urlParams: {
                slug: "physics-9th-std"
            }*/
        }
    }
};
export default apiEndPoints;
    
export const processEndPoint = (apiDetails, params) => {
    
    apiDetails = {...apiDetails};
    //fallback
    if (params.method) {
        apiDetails.method = params.method;
    }
    if (params.url) {
        apiDetails.url = params.url;
    }

    //modify url as per params
    const url = apiDetails.url;
    if (url) {
        let newUrl = url;
        let pattern;
        params = {...apiDetails.urlParams, ...params};
        for (let key in params) {
            pattern = new RegExp('{' + key + '}', 'gi');
            newUrl = newUrl.replace(pattern, params[key]);
        }
        apiDetails.url = newUrl;
    }
    
    return apiDetails;

}
