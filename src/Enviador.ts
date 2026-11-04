import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";

export class Enviador {
    private _bandeja: Bandeja;      ////la bandeja donde va a guardar los correos que envíe

    constructor(enviados: Bandeja) {   //recibe la bandeja de afuera en vez de crearla
        this._bandeja = enviados;       //la guarda en un atributo para usarla después
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