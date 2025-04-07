import { HttpHandler } from '@/services/http-handler';

const getUserList = () => HttpHandler.get(`/user`);

class GetUserListResponse {
    resumme: string
    email: string
    id: number

    constructor(id: number|null = null, email: string|null = null, resumme: string|null = null) {
        this.resumme = resumme ?? "";
        this.email = email ?? "";
        this.id = id ?? 0;
    }
}

export {
    getUserList,
    GetUserListResponse
}