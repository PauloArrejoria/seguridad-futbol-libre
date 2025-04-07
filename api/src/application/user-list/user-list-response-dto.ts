export class UserListResponseDto {
    id: string;
    email: string;
    resumme: string;

    constructor(id: string, email: string, resumme: string) {
        this.id = id;
        this.email = email;
        this.resumme = resumme;
    }
}