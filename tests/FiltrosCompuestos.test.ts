import { describe, test, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Bandeja } from "../src/Bandeja";
import { Filtro } from "../src/Filtro";
import { and, or, not, remitenteDeDominio, asuntoContiene, cuerpoContiene, estaLeido } from "../src/Predicados";

describe("Filtros compuestos", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

    test("filtra correos academicos importantes", () => {
        const bandeja = new Bandeja("Entrada");

        const correo1 = new Correo(ana, "Examen de Paradigmas");
        const correo2 = new Correo(fabrizio, "Examen de Sistemas");
        const correo3 = new Correo(ana, "Trabajo práctico");

        bandeja.agregar(correo1);
        bandeja.agregar(correo2);
        bandeja.agregar(correo3);

        const esUCP = remitenteDeDominio("@ucp.edu.ar");
        const tieneExamen = asuntoContiene("examen");

        const filtro = new Filtro(
            "Académicos importantes",
            and(esUCP, tieneExamen)
        );

        expect(filtro.aplicar(bandeja)).toEqual([correo1]);
        expect(bandeja.obtenerTodos()).toHaveLength(3);
    });

    test("filtra correos pendientes de revision", () => {
        const bandeja = new Bandeja("Entrada");

        const correo1 = new Correo(ana, "Aviso", "Entrega mañana");
        const correo2 = new Correo(ana, "Aviso", "Reunión mañana");
        const correo3 = new Correo(fabrizio, "Trabajo", "Entrega final");

        bandeja.agregar(correo1);
        bandeja.agregar(correo2);
        bandeja.agregar(correo3);

        const noLeido = not(estaLeido);
        const tieneEntrega = cuerpoContiene("entrega");

        const filtro = new Filtro(
            "Pendientes de revisión",
            and(noLeido, tieneEntrega)
        );

        expect(filtro.aplicar(bandeja)).toEqual([correo1, correo3]);
        expect(bandeja.obtenerTodos()).toHaveLength(3);
        
        correo1.marcarComoLeido();

        expect(filtro.aplicar(bandeja)).toEqual([correo3]);
        expect(bandeja.obtenerTodos()).toHaveLength(3);
    });

    test("filtra correos para seguimiento", () => {
        const bandeja = new Bandeja("Entrada");

        const correo1 = new Correo(ana, "Proyecto AE4");
        const correo2 = new Correo(fabrizio, "Reunión del grupo");
        const correo3 = new Correo(ana, "Examen final");

        bandeja.agregar(correo1);
        bandeja.agregar(correo2);
        bandeja.agregar(correo3);

        const tieneProyecto = asuntoContiene("proyecto");
        const tieneReunion = asuntoContiene("reunión");

        const filtro = new Filtro(
            "Correos para seguimiento",
            and(or(tieneProyecto, tieneReunion), not(estaLeido))
        );

        expect(filtro.aplicar(bandeja)).toEqual([correo1, correo2]);
        expect(bandeja.obtenerTodos()).toHaveLength(3);
    });
});