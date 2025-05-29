import { HttpHandler } from '@/services/http-handler';

const updateUserResumme = (data: UpdateUserResummeRequest) => HttpHandler.put(`/user/${data.id}`, data);

class UpdateUserResummeRequest {
    id: number
    resumme: string

    constructor(id: number|null = null, resumme: string|null = null) {
        this.id = id ?? 0;
        this.resumme = resumme ?? "";
    }
}

export {
    updateUserResumme,
    UpdateUserResummeRequest
}