import { describe, test, expect } from "vitest";
import { Bandeja } from "../src/Bandeja";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("Bandeja", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");

    test("se crea con un nombre y sin correos", () => {
        const bandeja = new Bandeja("Enviados");
        expect(bandeja.nombre).toBe("Enviados");
        expect(bandeja.obtenerTodos()).toEqual([]);
    });

    test("agrega un correo y lo contiene", () => {
        const bandeja = new Bandeja("Enviados");
        const correo = new Correo(ana, "Hola");
        bandeja.agregar(correo);
        expect(bandeja.contiene(correo)).toBe(true);
    });

    test("no permite agregar el mismo correo dos veces", () => {
        const bandeja = new Bandeja("Enviados");
        const correo = new Correo(ana, "Hola");
        bandeja.agregar(correo);
        expect(() => bandeja.agregar(correo)).toThrow("El correo ya está en la bandeja");
        expect(bandeja.obtenerTodos().length).toBe(1);   //sigue habiendo uno solo
    });

    test("la lista que devuelve no modifica la bandeja", () => {
        const bandeja = new Bandeja("Enviados");
        bandeja.agregar(new Correo(ana, "Hola"));
        bandeja.obtenerTodos().pop();   //borramos de la copia
        expect(bandeja.obtenerTodos().length).toBe(1);
    });
});