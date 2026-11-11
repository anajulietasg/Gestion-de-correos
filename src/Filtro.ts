import type { Predicado } from "./Predicados";
import { Correo } from "./Correo";
import type { IConsultarCorreos } from "./IConsultarCorreos";

export class Filtro {
    private _nombre: string;
    private _predicado: Predicado;

    constructor(nombre: string, predicado: Predicado) {
        this._nombre = nombre;
        this._predicado = predicado;
    }

    get nombre(): string {
        return this._nombre;
    }

    aplicar(coleccion: IConsultarCorreos): Correo[] {
        return coleccion.obtenerTodos().filter(this._predicado);
    }
}