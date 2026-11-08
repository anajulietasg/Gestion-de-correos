import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Enviador } from "./Enviador";
import { buscar } from "./Busqueda";

export class GestorDeCorreos {
    private _entrada = new Bandeja("Entrada");       //crea la bandeja de recibidos
    private _enviados = new Bandeja("Enviados");      //crea la bandeja de enviados, la única que existe
    private _borradores = new Bandeja("Borradores");
    private _eliminados = new Bandeja("Eliminados");
    private _enviador = new Enviador(this._enviados);   //crea el Enviador y le pasa la bandeja de arriba, no otra nueva
    private _origenes = new Map<Correo, Bandeja>();   //para cada correo eliminado, guarda de qué bandeja vino
    
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

    eliminar(correo: Correo): void {
        const origen = this.bandejaDe(correo);   //busca en qué bandeja está ahora
        if (origen === undefined) {
            throw new Error("El correo no está en ninguna bandeja");
        }
        if (origen === this._eliminados) {
            throw new Error("El correo ya está eliminado");
        }
        this._origenes.set(correo, origen);   //recuerda la bandeja de origen para poder restaurarlo
        this.mover(correo, origen, this._eliminados);
    }

    restaurar(correo: Correo): void {
        const origen = this._origenes.get(correo);   //busca en el Map de qué bandeja vino y lo devuelve
        if (origen === undefined || !this._eliminados.contiene(correo)) {
            throw new Error("El correo no está eliminado");
        }
        this.mover(correo, this._eliminados, origen);   
        this._origenes.delete(correo);   
    }

    buscarEnEntrada(texto: string): Correo[] {
        return buscar(this._entrada, texto);       //le pasa la bandeja de entrada, entra como IConsultarCorreos
    }   


    private bandejaDe(correo: Correo): Bandeja | undefined {   //dice en qué bandeja está el correo, o undefined si no está en ninguna
        const todas = [this._entrada, this._enviados, this._borradores, this._eliminados];
        return todas.find(bandeja => bandeja.contiene(correo));   
    }

    private mover(correo: Correo, origen: Bandeja, destino: Bandeja): void {   
        origen.quitar(correo);   
        destino.agregar(correo);
    }
}