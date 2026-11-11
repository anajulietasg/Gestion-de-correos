import { describe, test, expect } from "vitest";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";
import { Contacto } from "../src/Contacto";

describe("ServidorDeCorreo", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

    test("registra un usuario y le crea su cuenta", () => {
        const servidor = new ServidorDeCorreo();

        servidor.registrar(ana);

        expect(servidor.estaRegistrado("ana@gmail.com")).toBe(true);
        expect(servidor.cuentaDe("ana@gmail.com").entrada.obtenerTodos()).toEqual([]);   //su Entrada arranca vacía
    });

    test("cada usuario tiene su propio gestor", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);

        const cuentaAna = servidor.cuentaDe("ana@gmail.com");
        const cuentaFabrizio = servidor.cuentaDe("fabrizio@gmail.com");

        expect(cuentaAna).not.toBe(cuentaFabrizio);   //son dos gestores distintos, con bandejas distintas
    });

    test("siempre devuelve la misma cuenta para el mismo usuario", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);

        expect(servidor.cuentaDe("ana@gmail.com")).toBe(servidor.cuentaDe("ana@gmail.com"));
    });

    test("encuentra la cuenta aunque el email esté en mayúsculas", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);

        expect(servidor.estaRegistrado("ANA@gmail.com")).toBe(true);
    });

    test("no permite registrar dos veces el mismo usuario", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        const otraAna = new Contacto("Ana Julieta", "ana@gmail.com");   //otro objeto, mismo email

        expect(() => servidor.registrar(otraAna)).toThrow("El usuario ya está registrado");
    });

    test("da error al pedir la cuenta de un usuario no registrado", () => {
        const servidor = new ServidorDeCorreo();
        expect(() => servidor.cuentaDe("nadie@gmail.com")).toThrow("El usuario no está registrado");
        expect(servidor.estaRegistrado("nadie@gmail.com")).toBe(false);
    });
});