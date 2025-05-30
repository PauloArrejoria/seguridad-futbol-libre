import { HttpHandler } from './http-handler'

const verifyApiHealthCheck = () => HttpHandler.get(`/`);

const userLogin = (data: UserLoginRequest, reCaptchToken: string) => {
    const headers = {
        'Recaptcha-Token': reCaptchToken,
    };

    return HttpHandler.put(`/login`, data, { headers });
}

class UserLoginRequest {
    name: string|null
    password: string|null

    constructor(name: string|null = null, password: string|null = null) {
        this.name = name;
        this.password = password;
    }
}

export {
    verifyApiHealthCheck,
    userLogin,
    UserLoginRequest
}