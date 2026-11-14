import { describe, test, expect } from "vitest";
import { Bandeja } from "../src/Bandeja";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { obtenerAsuntos, filtrarCorreos } from "../src/ProcesamientoCorreos";
import { asuntoContiene } from "../src/Predicados";

describe("Procesamiento de correos", () => {
    test("obtiene los asuntos de una bandeja", () => {
        const bandeja = new Bandeja("Entrada");
        const ana = new Contacto("Ana", "ana@gmail.com");

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
        const ana = new Contacto("Ana", "ana@gmail.com");

        const correo1 = new Correo(ana, "Examen de Paradigmas");
        const correo2 = new Correo(ana, "Trabajo practico");
        const correo3 = new Correo(ana, "Examen final");

        bandeja.agregar(correo1);
        bandeja.agregar(correo2);
        bandeja.agregar(correo3);

        const condicion = asuntoContiene("examen");

        expect(filtrarCorreos(bandeja, condicion)).toEqual([
            correo1,
            correo3
        ]);

        expect(bandeja.obtenerTodos()).toEqual([
            correo1,
            correo2,
            correo3
        ]);
    });
});