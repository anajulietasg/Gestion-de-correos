import type {IGuardarCorreos} from "./IGuardarCorreos";
import { Correo } from "./Correo";

export class Enviador {
    private _bandeja: IGuardarCorreos;      //solo sabe que puede guardar y consultar si contiene

    constructor(bandeja: IGuardarCorreos) {   //acepta cualquier cosa que cumpla la interfaz
        this._bandeja = bandeja;       
    }

    enviar(correo: Correo): void {
        if (this._bandeja.contiene(correo)) {   //le pregunta a la bandeja si ese mismo correo ya está
            throw new Error("El correo ya fue enviado");
        }
        if (correo.asunto.trim() === "") {   //trim saca los espacios, "   " cuenta como vacío
            throw new Error("El correo debe tener asunto");
        }
        if (correo.destinatarios.length === 0) {
            throw new Error("El correo debe tener al menos un destinatario");
        }
        this._bandeja.agregar(correo);   //solo si pasó las dos validaciones
    }
}