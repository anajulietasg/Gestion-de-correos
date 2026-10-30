import { Contacto } from "./Contacto";

export class Agenda {
    
    private contactos: Contacto[] = [];
    agregar(contacto: Contacto): void {
        
    const existe = this.contactos.some(
        existente => existente.email === contacto.email
    );
    //si el mail ya está registrado, no permite agregarlo.
    if (existe) {
        throw new Error("El contacto ya existe");
    }
    //si no está repetido, agrega el contacto al arreglo.
    this.contactos.push(contacto);
    }   

    buscar(email: string): Contacto | undefined {
        //busca el primer contacto que tenga el mail indicado.
        //si no encuentra ninguno, devuelve undefined.
        return this.contactos.find(contacto => contacto.email === email);
    }
    
    modificarNombre(email: string, nuevoNombre: string): void {
        //busca el contacto que queremos modiicar.
        const contacto = this.buscar(email);

        if (!contacto) {
            throw new Error("El contacto no existe");
        }

        contacto.nombre = nuevoNombre;
    }

    
    
    modificarEmail(emailActual: string, nuevoEmail: string): void {
        // Busca el contacto que queremos modificar.
        const contacto = this.buscar(emailActual);

        // Si el contacto no existe, lanza un error.
        if (!contacto) {
            throw new Error("El contacto no existe");
        }

        // Normaliza el email para poder compararlo correctamente.
        const emailNormalizado = nuevoEmail.trim().toLowerCase();

        // Comprueba si otro contacto ya utiliza ese email.
        const existe = this.contactos.some(
            existente =>
                existente !== contacto &&
                existente.email === emailNormalizado
        );

        // Si el email pertenece a otro contacto, rechaza el cambio.
        if (existe) {
            throw new Error("El contacto ya existe");
        }

        // Modifica el email utilizando el setter de Contacto.
        contacto.email = nuevoEmail;
    }
    eliminar(email: string): void {
    const contacto = this.buscar(email);

    if (!contacto) {
        throw new Error("El contacto no existe");
    }

    this.contactos = this.contactos.filter(
        existente => existente !== contacto
    );
}
}