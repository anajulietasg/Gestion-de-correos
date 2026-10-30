import { Contacto } from "./Contacto";

export class Agenda {
    
    private contactos: Contacto[] = [];

    agregar(contacto: Contacto): void {
        //si el mail ya está registrado, no permite agregarlo.
        if (this.emailEnUso(contacto.email)) {  //usa método privado
            throw new Error("El contacto ya existe")
        }
        //si no está repetido, arega el contacto al arreglo
        this.contactos.push(contacto);
    }

    buscar(email:string): Contacto | undefined {
        const buscado = this.normalizar(email);  //así "Ana@..." encuentra a "ana@..."
        //busca el primer contacto que tenga el mail indicado, sino devuelve undefined
        return this.contactos.find(contacto => contacto.email === buscado);
    }

    obtenerTodos(): Contacto[] {
        return [...this.contactos];  //devuelve una copia del arreglo, no el original
    }

    modificarNombre(email: string, nuevoNombre: string): void {
        const contacto = this.buscar(email);

        if (!contacto) {
            throw new Error("El contacto no existe");
        }

        contacto.nombre = nuevoNombre;    //el setter de Contacto valida que no esté vacío
    }

    modificarEmail(emailActual: string, nuevoEmail: string): void {
        const contacto = this.buscar(emailActual);

        if (!contacto) {
            throw new Error("El contacto no existe");
        }
        //si el email pertenece a otro contacto, rechaza el cambio
        if (this.emailEnUso(nuevoEmail, contacto)) {     //usa el método privado
            throw new Error("El contacto ya existe");
        }
        //modifica el email utilizando el setter de Contacto
        contacto.email = nuevoEmail;
    }

    eliminar(email: string): void {
        const contacto = this.buscar(email);

        if (!contacto) {
            throw new Error("El contacto no existe");
        }
        //arma una lista nueva con todos menos ese contacto, y reemplaza la original.
        this.contactos = this.contactos.filter(
            existente => existente !== contacto
        );
    }
    //revisa si el email ya lo tiene algún contacto
    private emailEnUso(email: string, excepto?: Contacto): boolean {
        const buscado = this.normalizar(email);
        return this.contactos.some(
            existente => existente !== excepto && existente.email === buscado
        );
    }
    //deja el email sin espacios y en minúsculas
    private normalizar(email: string): string {  
        return email.trim().toLowerCase();
    }
}
