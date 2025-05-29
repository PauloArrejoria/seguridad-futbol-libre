import { HttpHandler } from '@/services/http-handler';

const logIn = (data: LogInRequest, reCaptchToken: string) => {
    const headers = {
        'Recaptcha-Token': reCaptchToken,
    };

    return HttpHandler.put(`/auth/login`, data, { headers });
}

class LogInRequest {
    name: string|null
    password: string|null

    constructor(name: string|null = null, password: string|null = null) {
        this.name = name;
        this.password = password;
    }
}

export {
    logIn,
    LogInRequest
}
