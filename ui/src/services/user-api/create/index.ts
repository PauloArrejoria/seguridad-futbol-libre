import { HttpHandler } from '@/services/http-handler';

const createUser = (data: CreateUserRequest) => HttpHandler.post(`/user`, data);

class CreateUserRequest {
    name: string|null
    password: string|null
    resumme: string|null

    constructor(name: string|null = null, password: string|null = null, resumme: string|null) {
        this.name = name;
        this.password = password;
        this.resumme = resumme;
    }
}

export {
    createUser,
    CreateUserRequest
}
