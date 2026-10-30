import { describe, test, expect } from "vitest";
import { Enviador } from "../src/Enviador";
import { Bandeja } from "../src/Bandeja";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("Enviador", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

    test("envía un correo válido y lo guarda en Enviados", () => {
        const enviados = new Bandeja("Enviados");
        const enviador = new Enviador(enviados);   //le pasamos la bandeja que va a usar
        const correo = new Correo(ana, "Hola", "Texto", [fabrizio]);

        enviador.enviar(correo);

        expect(enviados.contiene(correo)).toBe(true);   
    });

    test("no envía un correo sin asunto", () => {
        const enviados = new Bandeja("Enviados");
        const enviador = new Enviador(enviados);
        const correo = new Correo(ana, "", "Texto", [fabrizio]);

        expect(() => enviador.enviar(correo)).toThrow("El correo debe tener asunto");
        expect(enviados.contiene(correo)).toBe(false);   //no quedó guardado
    });

    test("no envía un correo con asunto de solo espacios", () => {
        const enviados = new Bandeja("Enviados");
        const enviador = new Enviador(enviados);
        const correo = new Correo(ana, "   ", "Texto", [fabrizio]);

        expect(() => enviador.enviar(correo)).toThrow("El correo debe tener asunto");
    });

    test("no envía un correo sin destinatarios", () => {
        const enviados = new Bandeja("Enviados");
        const enviador = new Enviador(enviados);
        const correo = new Correo(ana, "Hola", "Texto");   //sin lista de destinatarios

        expect(() => enviador.enviar(correo)).toThrow("El correo debe tener al menos un destinatario");
        expect(enviados.contiene(correo)).toBe(false);
    });
});