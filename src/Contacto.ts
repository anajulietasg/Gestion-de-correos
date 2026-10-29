export class Contacto {
    private _nombre: string;
    private _email: string;

    constructor(nombre: string, email: string) {
        this._nombre = nombre;
        this._email = email;
    }

    get nombre(): string {
        return this._nombre;
    }

    get email(): string {
        return this._email;
    }
}