const axios = require('axios');
const config = require('../configs/config');
const constants = require('../configs/constants');
const KeycloakFactory = (function(){
    async function SingletonClass() {
        try {
            console.log("Fetching keycloak token");
            const data = await axios.get(`${config.KEYCLOAK_URL}/auth/realms/${config.KEYCLOAK_REALM}`)
                .then(res => res.data);
            console.log(data)
            return {
                keycloakPublicToken: data.public_key
            }
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    }
    var instance;
    return {
        getInstance: async function () {
            if (instance == null) {
                instance = await SingletonClass();
                instance.constructor = null;
            }
            return instance;
        },
        getPublicKey : async function () {
            let obj = await this.getInstance();
            return obj.keycloakPublicToken;
        }
    };
})();

const createNewRole = async (roleName, token) => {
    const roleRepresentation = {
        "name": roleName
    }
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    return axios.post(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/roles`, roleRepresentation, reqConfig).then(res =>
        res.data
    ).catch(error => {
        console.error(error);
        throw error;
    });
}

const assignNewRole = async (roles, userId, token) => {
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    return axios.post(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/users/${userId}/role-mappings/realm`, roles, reqConfig).then(res =>
        res.data
    ).catch(error => {
        console.error(error);
        throw error;
    });
}

const getUserInfo = async (userName, token) => {
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    return axios.get(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/users?username=${userName}`, reqConfig).then(res =>
        res.data
    ).catch(error => {
        console.error(error);
        throw error;
    });
}

const getRoleInfo = async (roleName, token) => {
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    return axios.get(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/roles/${roleName}`, reqConfig).then(res =>
        res.data
    ).catch(error => {
        console.error(error);
        throw error;
    });
}

const getAdminToken = () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', constants.SUNBIRD_SSO_CLIENT);
    params.append('client_secret', constants.SUNBIRD_SSO_ADMIN_CLIENT_SECRET);

    return axios.post(`${config.KEYCLOAK_URL}/auth/realms/${config.KEYCLOAK_REALM}/protocol/openid-connect/token`, params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(async res => res.data.access_token)
        .catch(err => {
            console.error("Error : ", err);
            throw err;
        })
}

const sendTenantInvite = async (userId,token) => {
    const req = ["UPDATE_PROFILE"];
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    console.log("sendTenantInvite");
    return axios.put(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/users/${userId}/execute-actions-email`,req,reqConfig)
        .then(res => res.data)
        .catch(err => {
            console.error("Error : ", err);
            throw err;
        })
}

const sendVerifyEmail = async (userId,token) => {
    const reqConfig = {
        headers: {
            Authorization: token
        }
    }
    console.log("sendVerifyEmail");
    return axios.put(`${config.KEYCLOAK_URL}/auth/admin/realms/${config.KEYCLOAK_REALM}/users/${userId}/send-verify-email`,reqConfig)
        .then(res => res.data)
        .catch(err => {
            console.error("Error : ", err);
            throw err;
        })
}

module.exports = {
    KeycloakFactory,
    createNewRole,
    assignNewRole,
    getUserInfo,
    getRoleInfo,
    getAdminToken,
    sendTenantInvite,
    sendVerifyEmail
};
