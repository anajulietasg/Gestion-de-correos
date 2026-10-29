import { describe, test, expect } from "vitest";
import { Contacto } from "../src/Contacto";

describe("Contacto", () => {
    test("se crea con nombre y email", () => {
        const contacto = new Contacto("Ana", "ana@ucp.edu.ar");
        expect(contacto.nombre).toBe("Ana");
        expect(contacto.email).toBe("ana@ucp.edu.ar");
    });

    test("da error si el email no es válido", () => {
        expect(() => new Contacto("Ana", "ana.ucp.edu.ar")).toThrow("Email no válido");
    });

    test("da error si el nombre está vacio", () => {
        expect(() => new Contacto("", "ana@ucp.edu.ar")).toThrow("El nombre no puede estar vacío");
    });

    test("guarda el email en minúsculas", () => {
        const contacto = new Contacto("Ana", "ANA@UCP.EDU.AR");
        expect(contacto.email).toBe("ana@ucp.edu.ar");
    });

    test("permite modificar el nombre y el email", () => {
        const contacto = new Contacto("Ana", "ana@ucp.edu.ar");
        contacto.nombre = "María";
        contacto.email = "maria@ucp.edu.ar";
        expect(contacto.nombre).toBe("María");
        expect(contacto.email).toBe("maria@ucp.edu.ar");
    });

    test("da error si se intenta modificar el email a uno no válido", () => {
        const contacto = new Contacto("Ana", "ana@ucp.edu.ar");
        expect(() => { contacto.email = "maria.ucp.edu.ar"; }).toThrow("Email no válido");
    });
});