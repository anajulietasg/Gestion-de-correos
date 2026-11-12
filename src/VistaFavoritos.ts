import { Correo } from "./Correo";
import type { IConsultarCorreos } from "./IConsultarCorreos";

export class VistaFavoritos implements IConsultarCorreos {   
    private _bandejasQueRevisa: IConsultarCorreos[];           //las bandejas que tiene que mirar

    constructor(bandejasQueRevisa: IConsultarCorreos[]) {   //las recibe de afuera, no las crea
        this._bandejasQueRevisa = [...bandejasQueRevisa];             
    }
    obtenerTodos(): Correo[] {   //se calcula cada vez que se pide
        return this._bandejasQueRevisa
            .flatMap(bandeja => bandeja.obtenerTodos())       //junta los correos de todas las bandejas en una sola lista
            .filter(correo => correo.favorito);              //se queda solo con los marcados como favoritos
    }
}