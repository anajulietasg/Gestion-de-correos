import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Enviador } from "./Enviador";

export class GestorDeCorreos {
    private _entrada = new Bandeja("Entrada");       //crea la bandeja de recibidos
    private _enviados = new Bandeja("Enviados");      //crea la bandeja de enviados, la única que existe
    private _borradores = new Bandeja("Borradores");
    private _eliminados = new Bandeja("Eliminados");
    private _enviador = new Enviador(this._enviados);   //crea el Enviador y le pasa la bandeja de arriba, no otra nueva

    get entrada(): Bandeja {      //devuelve la bandeja para consultarla
        return this._entrada;
    }

    get enviados(): Bandeja {
        return this._enviados;
    }

    get borradores(): Bandeja {
        return this._borradores;
    }

    get eliminados(): Bandeja {
        return this._eliminados;
    }

    recibir(correo: Correo): void {
        if (this.bandejaDe(correo) !== undefined) {   //si ya está en alguna bandeja, no puede estar en dos
            throw new Error("El correo ya está en otra bandeja");
        }
        this._entrada.agregar(correo);
    }

    enviar(correo: Correo): void {
        this._enviador.enviar(correo);   //el gestor no valida nada, le delega el trabajo al Enviador
    }

    private bandejaDe(correo: Correo): Bandeja | undefined {   //dice en qué bandeja está el correo, o undefined si no está en ninguna
        const todas = [this._entrada, this._enviados, this._borradores, this._eliminados];
        return todas.find(bandeja => bandeja.contiene(correo));   //find devuelve la primera bandeja que lo contiene
    }
}