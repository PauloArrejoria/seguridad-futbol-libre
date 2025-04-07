export class UserCreateRequestDto {
    email: string;
    resumme: string;
    password: string;

    constructor(email: string, password: string, resumme: string) {
        this.email = email;
        this.resumme = resumme;
        this.password = password;
    }
}
