import { describe, test, expect } from "vitest";
import { Bandeja } from "../src/Bandeja";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { obtenerAsuntos } from "../src/ProcesamientoCorreos";

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
});