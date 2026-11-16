import { describe, test, expect } from "vitest";
import { Bandeja } from "../src/Bandeja";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { obtenerAsuntos, filtrarCorreos,
    obtenerEstadisticas, obtenerNoLeidos } from "../src/ProcesamientoCorreos";
import { asuntoContiene } from "../src/Predicados";

describe("Procesamiento de correos", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");

    test("obtiene los asuntos de una bandeja", () => {
        const bandeja = new Bandeja("Entrada");
        bandeja.agregar(new Correo(ana, "Examen"));
        bandeja.agregar(new Correo(ana, "Trabajo práctico"));

        expect(obtenerAsuntos(bandeja)).toEqual([
            "Examen",
            "Trabajo práctico"
        ]);
        expect(bandeja.obtenerTodos()).toHaveLength(2);
    });

    test("filtra correos que cumplen una condicion", () => {
        const bandeja = new Bandeja("Entrada");
        const correo1 = new Correo(ana, "Examen de Paradigmas");
        const correo2 = new Correo(ana, "Trabajo practico");
        const correo3 = new Correo(ana, "Examen final");
        bandeja.agregar(correo1);
        bandeja.agregar(correo2);
        bandeja.agregar(correo3);

        expect(filtrarCorreos(bandeja, asuntoContiene("examen"))).toEqual([
            correo1,
            correo3
        ]);
        expect(bandeja.obtenerTodos()).toEqual([
            correo1,
            correo2,
            correo3
        ]);
    });

    test("calcula estadisticas de correos leidos y no leidos", () => {
        const bandeja = new Bandeja("Entrada");
        const correo1 = new Correo(ana, "Examen");
        correo1.marcarComoLeido();
        bandeja.agregar(correo1);
        bandeja.agregar(new Correo(ana, "Trabajo"));
        bandeja.agregar(new Correo(ana, "Reunion"));

        expect(obtenerEstadisticas(bandeja)).toEqual({
            total: 3,
            leidos: 1,
            noLeidos: 2
        });
    });

    test("obtiene solamente los correos no leidos", () => {
        const bandeja = new Bandeja("Entrada");
        const correo1 = new Correo(ana, "Examen");
        const correo2 = new Correo(ana, "Trabajo");
        bandeja.agregar(correo1);
        bandeja.agregar(correo2);

        correo1.marcarComoLeido();
        expect(obtenerNoLeidos(bandeja)).toEqual([correo2]);

        correo1.marcarComoNoLeido();
        expect(obtenerNoLeidos(bandeja)).toEqual([correo1, correo2]);
    });

    test("funciona sobre una lista vacía", () => {
        const bandeja = new Bandeja("Entrada");
        expect(obtenerAsuntos(bandeja)).toEqual([]);
        expect(obtenerNoLeidos(bandeja)).toEqual([]);
        expect(obtenerEstadisticas(bandeja)).toEqual({ total: 0, leidos: 0, noLeidos: 0 });
    });
});