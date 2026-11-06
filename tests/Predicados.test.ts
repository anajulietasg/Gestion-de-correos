import { describe, test, expect } from "vitest";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";
import { and, type Predicado } from "../src/Predicados";

describe("Predicados", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const correo = new Correo(ana, "Examen");

    test("and devuelve true cuando ambos predicados son verdaderos", () => {
        const esUCP: Predicado = correo =>
            correo.remitente.email.endsWith("@ucp.edu.ar");

        const tieneExamen: Predicado = correo =>
            correo.asunto.toLowerCase().includes("examen");

        const resultado = and(esUCP, tieneExamen)(correo);

        expect(resultado).toBe(true);
    });

    test("and devuelve false cuando el primer predicado es falso", () => {
        const verdadero: Predicado = correo => true;
        const falso: Predicado = correo => false;
        expect(and(falso, verdadero)(correo)).toBe(false);
    });

    test("and devuelve false cuando el segundo predicado es falso", () => {
        const verdadero: Predicado = correo => true;
        const falso: Predicado = correo => false;
        expect(and(verdadero, falso)(correo)).toBe(false);
    });

    test("and devuelve false cuando ambos predicados son falsos", () => {
        const falso: Predicado = correo => false;
        expect(and(falso, falso)(correo)).toBe(false)
    });
});