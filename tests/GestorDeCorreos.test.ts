import { describe, test, expect } from "vitest";
import { GestorDeCorreos } from "../src/GestorDeCorreos";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("GestorDeCorreos", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

    test("se crea con las cuatro bandejas vacías", () => {
        const gestor = new GestorDeCorreos();
        expect(gestor.entrada.nombre).toBe("Entrada");
        expect(gestor.enviados.nombre).toBe("Enviados");
        expect(gestor.borradores.nombre).toBe("Borradores");
        expect(gestor.eliminados.nombre).toBe("Eliminados");
        expect(gestor.entrada.obtenerTodos()).toEqual([]);
    });

    test("un correo recibido queda en Entrada", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);

        gestor.recibir(correo);

        expect(gestor.entrada.contiene(correo)).toBe(true);
    });

    test("no permite recibir un correo que ya está en otra bandeja", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);   //queda en Enviados

        expect(() => gestor.recibir(correo)).toThrow("El correo ya está en otra bandeja");
        expect(gestor.entrada.contiene(correo)).toBe(false);
    });

    test("un correo enviado queda en Enviados", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);

        gestor.enviar(correo);

        expect(gestor.enviados.contiene(correo)).toBe(true);
    });

    test("al enviar se siguen aplicando las validaciones del Enviador", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "", "Texto", [fabrizio]);   //sin asunto
        expect(() => gestor.enviar(correo)).toThrow("El correo debe tener asunto");
    });

    test("eliminar mueve el correo de Entrada a Eliminados", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        gestor.eliminar(correo);

        expect(gestor.eliminados.contiene(correo)).toBe(true);
        expect(gestor.entrada.contiene(correo)).toBe(false);   //salió de Entrada, queda en una sola bandeja
    });

    test("eliminar también funciona con un correo enviado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);

        gestor.eliminar(correo);

        expect(gestor.eliminados.contiene(correo)).toBe(true);
        expect(gestor.enviados.contiene(correo)).toBe(false);
    });

    test("no permite eliminar un correo que ya está eliminado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);
        gestor.eliminar(correo);

        expect(() => gestor.eliminar(correo)).toThrow("El correo ya está eliminado");
        expect(gestor.eliminados.obtenerTodos().length).toBe(1);   //no se duplicó
    });

    test("no permite eliminar un correo que no está en ninguna bandeja", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola");   //nunca se recibió ni se envió
        expect(() => gestor.eliminar(correo)).toThrow("El correo no está en ninguna bandeja");
    });

    test("eliminar no modifica los datos del correo", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        gestor.eliminar(correo);

        expect(correo.asunto).toBe("Hola");
        expect(correo.remitente).toBe(fabrizio);
    });

    test("restaurar devuelve el correo a Entrada si vino de ahí", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);
        gestor.eliminar(correo);

        gestor.restaurar(correo);

        expect(gestor.entrada.contiene(correo)).toBe(true);
        expect(gestor.eliminados.contiene(correo)).toBe(false);   
    });

    test("restaurar devuelve el correo a Enviados si vino de ahí", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);
        gestor.eliminar(correo);

        gestor.restaurar(correo);

        expect(gestor.enviados.contiene(correo)).toBe(true);
        expect(gestor.entrada.contiene(correo)).toBe(false);   
    });

    test("no permite restaurar un correo que no está eliminado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        expect(() => gestor.restaurar(correo)).toThrow("El correo no está eliminado");
        expect(gestor.entrada.contiene(correo)).toBe(true);   //sigue donde estaba
    });

    test("un correo restaurado se puede volver a eliminar", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);
        gestor.eliminar(correo);
        gestor.restaurar(correo);

        gestor.eliminar(correo);

        expect(gestor.eliminados.contiene(correo)).toBe(true);
        expect(gestor.eliminados.obtenerTodos().length).toBe(1);
    });

    test("busca en la bandeja de Entrada", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Examen final", "Texto", [ana]);
        gestor.recibir(correo);

        expect(gestor.buscarEnEntrada("examen")).toEqual([correo]);
    });

    test("no encuentra correos que están en otras bandejas", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Examen final", "Texto", [fabrizio]);
        gestor.enviar(correo);       //queda en Enviados, no en Entrada

        expect(gestor.buscarEnEntrada("examen")).toEqual([]);
    });

    test("un correo eliminado no aparece en la búsqueda hasta que se restaura", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Examen final", "Texto", [ana]);
        gestor.recibir(correo);

        gestor.eliminar(correo);
        expect(gestor.buscarEnEntrada("examen")).toEqual([]);   //salió de Entrada

        gestor.restaurar(correo);
        expect(gestor.buscarEnEntrada("examen")).toEqual([correo]);   //volvió a Entrada
    });


});
