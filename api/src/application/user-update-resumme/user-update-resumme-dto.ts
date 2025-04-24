export class UpdateResummeDto {
    id: string;
    resumme: string;

    constructor(id: string, resumme: string) {
        this.id = id;
        this.resumme = resumme;
    }
}