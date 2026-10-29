import { describe, expect, test } from "vitest";
import { ValidadorEmail } from "../src/ValidadorEmail";

describe("ValidadorEmail", () => {
    test("acepta un email con formato correcto", () => {
        expect(ValidadorEmail.esValido("ana@ucp.edu.ar")).toBe(true);
    });

    test("rechaza un email sin @", () => {
        expect(ValidadorEmail.esValido("ana.ucp.edu.ar")).toBe(false);
    });

    test("rechaza un email sin dominio", () => {
        expect(ValidadorEmail.esValido("ana@")).toBe(false);
    });

    test("rechaza un email sin usuario", () => {
        expect(ValidadorEmail.esValido("@ucp.edu.ar")).toBe(false);
    });

    test("rechaza un email con espacios", () => {
        expect(ValidadorEmail.esValido("ana @ucp.edu.ar")).toBe(false);
    });
});