import { Contacto } from "./Contacto";

export class Correo {
    private static contador = 0; //uno solo, compartido por todos los correos
    private _id: number;
    private _remitente: Contacto;
    private _asunto: string;
    private _cuerpo: string;
    private _destinatarios: Contacto[];
    private _leido: boolean = false;
    private _favorito: boolean = false;

    //asunto, cuerpo y destinatarios tienen un valor por defecto, se pueden no pasar
    constructor(remitente: Contacto, asunto: string = "", cuerpo: string = "", destinatarios: Contacto[] = []) {
        Correo.contador++;   //suma uno cada vez que se crea un correo
        this._id = Correo.contador;   //así cada correo queda con un número distinto
        this._remitente = remitente;   //guarda el MISMO objeto Contacto
        this._asunto = asunto;
        this._cuerpo = cuerpo;
        this._destinatarios = [...destinatarios];   //copia la lista, si cambian la de afuera esta no cambia
    }

    get id(): number {   //sin setter, el id no se puede cambiar
        return this._id;
    }

    get remitente(): Contacto {   //sin setter, el remitente no se puede cambiar
        return this._remitente;
    }

    get asunto(): string {
        return this._asunto;
    }

    set asunto(valor: string) {   //se puede editar
        this._asunto = valor;
    }

    get cuerpo(): string {
        return this._cuerpo;
    }

    set cuerpo(valor: string) {
        this._cuerpo = valor;
    }

    get destinatarios(): Contacto[] {
        return [...this._destinatarios];   //devuelve una copia
    }

    get leido(): boolean {
        return this._leido;
    }

    get favorito(): boolean {
        return this._favorito;
    }

    agregarDestinatario(contacto: Contacto): void {   //la única forma de sumar un destinatario
        if (!this._destinatarios.includes(contacto)) {   //includes revisa si ese objeto ya está en la lista
            this._destinatarios.push(contacto);
        }
    }
}
