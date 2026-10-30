import { Correo } from "./Correo";

export class Bandeja {
    private _nombre: string;
    private _correos: Correo[] = [];   //arranca vacía

    constructor(nombre: string) {
        this._nombre = nombre;   //por ejemplo "Enviados" o "Entrada"
    }

    get nombre(): string {   //sin setter, el nombre de la bandeja no cambia
        return this._nombre;
    }

    agregar(correo: Correo): void {
        if (this.contiene(correo)) {
            throw new Error("El correo ya está en la bandeja");
        }
        this._correos.push(correo);   //guarda el MISMO objeto, no una copia
    }

    contiene(correo: Correo): boolean {
        return this._correos.includes(correo);   //revisa si ese objeto ya está en la lista
    }

    obtenerTodos(): Correo[] {
        return [...this._correos];   //copia de la lista
    }
}