import { Contacto } from "./Contacto";
import { GestorDeCorreos } from "./GestorDeCorreos";
import { ValidadorEmail } from "./ValidadorEmail";

export class ServidorDeCorreo {
    private _cuentas = new Map<string, GestorDeCorreos>();   //para cada email, guarda el gestor de ese usuario

    registrar(usuario: Contacto): void {
        if (this.estaRegistrado(usuario.email)) {
            throw new Error("El usuario ya está registrado");
        }
        this._cuentas.set(usuario.email, new GestorDeCorreos());   //le crea su PROPIO gestor con sus cuatro bandejas
    }

    cuentaDe(email: string): GestorDeCorreos {   //devuelve el gestor de ese usuario
        const cuenta = this._cuentas.get(ValidadorEmail.normalizar(email));   //normaliza así "ANA@..." encuentra a "ana@..."
        if (cuenta === undefined) {
            throw new Error("El usuario no está registrado");
        }
        return cuenta;
    }

    estaRegistrado(email: string): boolean {
        return this._cuentas.has(ValidadorEmail.normalizar(email));   //has responde si existe esa clave en el Map
    }
}