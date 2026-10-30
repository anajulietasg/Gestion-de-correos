import { Contacto } from "./Contacto";

export class Agenda {
    private contactos: Contacto[] = [];

    agregar(contacto: Contacto): void {
        this.contactos.push(contacto);
    }

    buscar(email: string): Contacto | undefined {
        return this.contactos.find(contacto => contacto.email === email);
    }
}