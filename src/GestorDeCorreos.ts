import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Enviador } from "./Enviador";
import { buscar } from "./Busqueda";
import type { IConsultarCorreos } from "./IConsultarCorreos";
import { VistaFavoritos } from "./VistaFavoritos";
import { Contacto } from "./Contacto";

export class GestorDeCorreos {
    private _entrada = new Bandeja("Entrada");       //crea la bandeja de recibidos
    private _enviados = new Bandeja("Enviados");      //crea la bandeja de enviados, la única que existe
    private _borradores = new Bandeja("Borradores");
    private _eliminados = new Bandeja("Eliminados");
    private _favoritos = new VistaFavoritos([this._entrada, this._enviados, this._borradores]);
    private _enviador = new Enviador(this._enviados);   //crea el Enviador y le pasa la bandeja de arriba, no otra nueva
    private _origenes = new Map<Correo, Bandeja>();   //para cada correo eliminado, guarda de qué bandeja vino
    
    get entrada(): IConsultarCorreos {      //solo se puede consultar la bandeja, no modificarla desde afuera
        return this._entrada;
    }

    get enviados(): IConsultarCorreos {
        return this._enviados;
    }

    get borradores(): IConsultarCorreos {
        return this._borradores;
    }

    get eliminados(): IConsultarCorreos {
        return this._eliminados;
    }

    get favoritos(): IConsultarCorreos {
        return this._favoritos;
    }

    recibir(correo: Correo): void {
        if (this.bandejaDe(correo) !== undefined) {   //si ya está en alguna bandeja, no puede estar en dos
            throw new Error("El correo ya está en otra bandeja");
        }
        this._entrada.agregar(correo);
    }

    guardarBorrador(correo: Correo): void {         //no valida asunto ni destinatarios
        if (this.bandejaDe(correo) !== undefined) {
            throw new Error("El correo ya está en otra bandeja");
        }
        this._borradores.agregar(correo);
    }

    editarBorrador(correo: Correo, asunto: string, cuerpo: string, destinatarios: Contacto[] = []): void {
        if (!this._borradores.contiene(correo)) {      //solo se editan los que están en Borradores
            throw new Error("El correo no es un borrador");
        }
        correo.asunto = asunto;     //usa los setters de Correo
        correo.cuerpo = cuerpo;
        for (const destinatario of destinatarios) {
            correo.agregarDestinatario(destinatario);   
        }
    }

    enviar(correo: Correo): void {
        this._enviador.enviar(correo);   //el gestor no valida nada, le delega el trabajo al Enviador
        if (this._borradores.contiene(correo)) {   //si estaba en borradores, lo saca de ahí
            this._borradores.quitar(correo);
        }
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