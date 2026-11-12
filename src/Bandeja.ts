import { Correo } from "./Correo";
import { IConsultarCorreos } from "./IConsultarCorreos";
import type { IGuardarCorreos } from "./IGuardarCorreos";

export class Bandeja implements IConsultarCorreos, IGuardarCorreos {
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
        this._correos= [...this._correos, correo];   //arma una lista nueva y lo guarda en el atributo
    }

    quitar(correo: Correo): void {
        if (!this.contiene(correo)) {
            throw new Error("El correo no está en la bandeja");
        }
        this._correos = this._correos.filter(c => c !== correo);   //lista nueva con todos menos ese correo, guardada en el arributo
    }

    contiene(correo: Correo): boolean {
        return this._correos.includes(correo);   //revisa si ese objeto ya está en la lista
    }

    obtenerTodos(): Correo[] {
        return [...this._correos];   //copia de la lista
    }
}