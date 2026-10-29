import { ValidadorEmail } from "./ValidadorEmail";

export class Contacto {
    private _nombre: string;
    private _email: string;

    constructor(nombre: string, email: string) {  //recibe dos textos y antes de guardarlos los pasa por la validación. Si no pasa, el objeto NO se crea.
        this._nombre = this.validarNombre(nombre);
        this._email = this.validarEmail(email);
    }
  
    get nombre(): string {   //permite ver una copia del valor desde afuera
        return this._nombre;  //se lee con contacto.nombre
    }

    set nombre(valor: string) {    //permite cambiar el valor desde afuera, pero antes lo valida
        this._nombre = this.validarNombre(valor);
    }

    get email(): string {
        return this._email;
    }

    set email(valor: string) {
        this._email = this.validarEmail(valor);
    }

    private validarNombre(nombre: string): string {
        const limpio = nombre.trim();   //le saca los espacios de los costados con trim()
        if (limpio === "") {      //si queda vacio lanza error
            throw new Error("El nombre no puede estar vacío");
        }
        return limpio;
    }

    private validarEmail(email: string): string {
        const normalizado = email.trim().toLowerCase();   //lo normaliza, sin espacios y en minúsculas
        if (!ValidadorEmail.esValido(normalizado)) {      //pregunta a ValidadorEmail si el formato es correcto
            throw new Error("Email no válido");
        }
        return normalizado;
    }
}