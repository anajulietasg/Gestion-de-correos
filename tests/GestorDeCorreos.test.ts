import { describe, test, expect } from "vitest";
import { GestorDeCorreos } from "../src/GestorDeCorreos";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";
import { Filtro } from "../src/Filtro";
import { and, remitenteDeDominio, asuntoContiene } from "../src/Predicados";

const ana = new Contacto("Ana", "ana@gmail.com");
const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

describe("Gestor: bandejas", () => {
    test("se crea con las cuatro bandejas vacías", () => {
        const gestor = new GestorDeCorreos();
        expect(gestor.entrada.obtenerTodos()).toEqual([]);
        expect(gestor.enviados.obtenerTodos()).toEqual([]);
        expect(gestor.borradores.obtenerTodos()).toEqual([]);
        expect(gestor.eliminados.obtenerTodos()).toEqual([]);
    });

    test("un correo recibido queda en Entrada", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);

        gestor.recibir(correo);

        expect(gestor.entrada.obtenerTodos()).toContain(correo);
    });

    test("no permite recibir un correo que ya está en otra bandeja", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);   //queda en Enviados

        expect(() => gestor.recibir(correo)).toThrow("El correo ya está en otra bandeja");
        expect(gestor.entrada.obtenerTodos()).not.toContain(correo);
    });

    test("las bandejas del gestor solo se pueden consultar desde afuera", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        gestor.entrada.obtenerTodos().pop();        //sacamos el correo de la copia 

        expect(gestor.entrada.obtenerTodos()).toContain(correo);     //la bandeja real sigue teniéndolo
    });
});

describe("Gestor: eliminar y restaurar", () => {
    test("eliminar un correo lo saca de su bandeja y lo pone en Eliminados", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        gestor.eliminar(correo);

        expect(gestor.eliminados.obtenerTodos()).toContain(correo);
        expect(gestor.entrada.obtenerTodos()).not.toContain(correo);
    });

    test("eliminar también funciona con un correo enviado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);

        gestor.eliminar(correo);

        expect(gestor.eliminados.obtenerTodos()).toContain(correo);
        expect(gestor.enviados.obtenerTodos()).not.toContain(correo);
    });

    test("no permite eliminar un correo que no está en ninguna bandeja", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola");   //nunca se recibió ni se envió
        expect(() => gestor.eliminar(correo)).toThrow("El correo no está en ninguna bandeja");
    });

    test("restaurar devuelve el correo a Entrada si vino de ahí", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);
        gestor.eliminar(correo);

        gestor.restaurar(correo);

        expect(gestor.entrada.obtenerTodos()).toContain(correo);
        expect(gestor.eliminados.obtenerTodos()).not.toContain(correo);   
    });

    test("no permite restaurar un correo que no está eliminado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        expect(() => gestor.restaurar(correo)).toThrow("El correo no está eliminado");
        expect(gestor.entrada.obtenerTodos()).toContain(correo);   //sigue donde estaba
    });

    test("restaurar devuelve el correo a Enviados si vino de ahí", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);
        gestor.enviar(correo);
        gestor.eliminar(correo);

        gestor.restaurar(correo);

        expect(gestor.enviados.obtenerTodos()).toContain(correo);
        expect(gestor.entrada.obtenerTodos()).not.toContain(correo);   
    });

    test("no permite eliminar un correo que ya está eliminado", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);
        gestor.eliminar(correo);

        expect(() => gestor.eliminar(correo)).toThrow("El correo ya está eliminado");
        expect(gestor.eliminados.obtenerTodos().length).toBe(1);   //no se duplicó
    });
});

describe("Gestor: búsqueda", () => {
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

describe("Gestor: favoritos", () => {
    test("los favoritos reúnen correos de Entrada y de Enviados", () => {
        const gestor = new GestorDeCorreos();
        const recibido = new Correo(fabrizio, "Recibido", "", [ana]);
        const enviado = new Correo(ana, "Enviado", "", [fabrizio]);
        gestor.recibir(recibido);
        gestor.enviar(enviado);

        recibido.marcarComoFavorito();
        enviado.marcarComoFavorito();

        expect(gestor.favoritos.obtenerTodos()).toEqual([recibido, enviado]);
    });

    test("un favorito eliminado no aparece en favoritos hasta que se restaura", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "", [ana]);
        gestor.recibir(correo);
        correo.marcarComoFavorito();
        gestor.eliminar(correo);

        expect(gestor.favoritos.obtenerTodos()).toEqual([]);
        expect(correo.favorito).toBe(true);   //sigue siendo favorito

        gestor.restaurar(correo);
        expect(gestor.favoritos.obtenerTodos()).toEqual([correo]);
    });

    test("el mismo filtro funciona sobre una bandeja y sobre los favoritos", () => {
        const gestor = new GestorDeCorreos();
        const profe = new Contacto("Profe", "profe@ucp.edu.ar");
        const examenFavorito = new Correo(profe, "Examen final", "", [ana]);
        const examenComun = new Correo(profe, "Examen parcial", "", [ana]);
        gestor.recibir(examenFavorito);
        gestor.recibir(examenComun);
        examenFavorito.marcarComoFavorito();

        const academicos = new Filtro("Académicos", and(remitenteDeDominio("@ucp.edu.ar"), asuntoContiene("examen")));

        expect(academicos.aplicar(gestor.entrada)).toEqual([examenFavorito, examenComun]);   //en Entrada están los dos
        expect(academicos.aplicar(gestor.favoritos)).toEqual([examenFavorito]);   //en favoritos, solo el marcado
    });
});

describe("Gestor: borradores", () => {
    test("guarda un borrador incompleto, sin asunto ni destinatarios", () => {
        const gestor = new GestorDeCorreos();
        const borrador = new Correo(ana);   //solo tiene remitente

        gestor.guardarBorrador(borrador);

        expect(gestor.borradores.obtenerTodos()).toContain(borrador);
    });

    test("no permite guardar como borrador un correo que ya está en otra bandeja", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        expect(() => gestor.guardarBorrador(correo)).toThrow("El correo ya está en otra bandeja");
    });

    test("editar un borrador conserva los cambios", () => {
        const gestor = new GestorDeCorreos();
        const borrador = new Correo(ana);
        gestor.guardarBorrador(borrador);

        gestor.editarBorrador(borrador, "Reunión", "Mañana a las 10", [fabrizio]);

        const recuperado = gestor.borradores.obtenerTodos()[0];   //lo recuperamos de Borradores
        expect(recuperado.asunto).toBe("Reunión");
        expect(recuperado.cuerpo).toBe("Mañana a las 10");
        expect(recuperado.destinatarios).toEqual([fabrizio]);
    });

    test("no permite editar un correo que no es borrador", () => {
        const gestor = new GestorDeCorreos();
        const correo = new Correo(fabrizio, "Hola", "Texto", [ana]);
        gestor.recibir(correo);

        expect(() => gestor.editarBorrador(correo, "Otro", "Otro")).toThrow("El correo no es un borrador");
        expect(correo.asunto).toBe("Hola");   //no cambió
    });

    test("un borrador válido se envía y pasa de Borradores a Enviados", () => {
        const gestor = new GestorDeCorreos();
        const borrador = new Correo(ana);
        gestor.guardarBorrador(borrador);
        gestor.editarBorrador(borrador, "Reunión", "Mañana a las 10", [fabrizio]);

        gestor.enviar(borrador);

        expect(gestor.enviados.obtenerTodos()).toContain(borrador);
        expect(gestor.borradores.obtenerTodos()).not.toContain(borrador);   //ya no está en Borradores
    });

    test("un borrador inválido no se envía y sigue en Borradores", () => {
        const gestor = new GestorDeCorreos();
        const borrador = new Correo(ana, "", "Texto", [fabrizio]);   //sin asunto
        gestor.guardarBorrador(borrador);

        expect(() => gestor.enviar(borrador)).toThrow("El correo debe tener asunto");
        expect(gestor.borradores.obtenerTodos()).toContain(borrador);   //sigue ahí
        expect(gestor.enviados.obtenerTodos()).not.toContain(borrador);   //y no se envió
    });
});
