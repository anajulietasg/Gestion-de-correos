import { describe, test, expect } from "vitest";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";
import { Agenda } from "../src/Agenda";

describe("Correo", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

    test("se crea con remitente, asunto, cuerpo y destinatarios", () => {
        const correo = new Correo(ana, "Hola", "Primer correo", [fabrizio]);
        expect(correo.remitente).toBe(ana);   //toBe verifica que sea el mismo objeto
        expect(correo.asunto).toBe("Hola");
        expect(correo.cuerpo).toBe("Primer correo");
        expect(correo.destinatarios).toEqual([fabrizio]);   //toEqual compara el contenido de la lista
    });

    test("cada correo tiene un id distinto", () => {
        const correo1 = new Correo(ana, "Uno");
        const correo2 = new Correo(ana, "Dos");
        expect(correo1.id).not.toBe(correo2.id);
    });

    test("se crea sin leer y sin marcar como favorito", () => {
        const correo = new Correo(ana, "Hola");
        expect(correo.leido).toBe(false);
        expect(correo.favorito).toBe(false);
    });

    test("se puede crear incompleto, sin asunto ni destinatarios", () => {
        const correo = new Correo(ana);   //sirve para los borradores del RF-07
        expect(correo.asunto).toBe("");
        expect(correo.destinatarios).toEqual([]);
    });

    test("modificar la lista de afuera no cambia los destinatarios del correo", () => {
        const lista = [fabrizio];
        const correo = new Correo(ana, "Hola", "", lista);
        lista.push(ana);   //cambiamos la lista original
        expect(correo.destinatarios.length).toBe(1);   //el correo sigue con uno solo
    });

    test("modificar la lista que devuelve no cambia el correo", () => {
        const correo = new Correo(ana, "Hola", "", [fabrizio]);
        correo.destinatarios.push(ana);   //intentamos agregar desde afuera
        expect(correo.destinatarios.length).toBe(1);
    });

    test("agrega un destinatario sin repetirlo", () => {
        const correo = new Correo(ana, "Hola");
        correo.agregarDestinatario(fabrizio);
        correo.agregarDestinatario(fabrizio);   //el mismo dos veces
        expect(correo.destinatarios.length).toBe(1);
    });

    test("permite cambiar el asunto y el cuerpo", () => {
        const correo = new Correo(ana, "Hola");
        correo.asunto = "Consulta";
        correo.cuerpo = "Texto nuevo";
        expect(correo.asunto).toBe("Consulta");
        expect(correo.cuerpo).toBe("Texto nuevo");
    });

    //borrar un contacto no borra los correos que lo usan
    test("eliminar un contacto de la agenda no afecta a sus correos", () => {
        const agenda = new Agenda();
        const pablo = new Contacto("Pablo", "pablo@gmail.com");
        agenda.agregar(pablo);
        const correo = new Correo(pablo, "Hola", "", [fabrizio]);

        agenda.eliminar("pablo@gmail.com");

        expect(agenda.buscar("pablo@gmail.com")).toBeUndefined();   //ya no está en la agenda
        expect(correo.remitente).toBe(pablo);   //pero el correo lo sigue teniendo
        expect(correo.remitente.email).toBe("pablo@gmail.com");
    });

    test("se crean varios correos con distintos remitentes y destinatarios", () => {
        const correo1 = new Correo(ana, "Hola", "", [fabrizio]);
        const correo2 = new Correo(fabrizio, "Respuesta", "", [ana]);

        expect(correo1.remitente).toBe(ana);
        expect(correo2.remitente).toBe(fabrizio);
        expect(correo1.destinatarios).toEqual([fabrizio]);
        expect(correo2.destinatarios).toEqual([ana]);
    });
});