import { describe, test, expect } from "vitest";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("ServidorDeCorreo", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");
    const pablo = new Contacto("Pablo", "pablo@gmail.com");
    
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

    test("el correo enviado queda en Enviados del remitente", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);
        const correo = new Correo(ana, "Reunión", "Mañana a las 10", [fabrizio]);

        servidor.enviar(correo);

        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toContain(correo);   //el original
    });

    test("cada destinatario recibe el correo en su Entrada", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);
        servidor.registrar(pablo);
        const correo = new Correo(ana, "Reunión", "Mañana a las 10", [fabrizio, pablo]);

        servidor.enviar(correo);

        const entradaFabrizio = servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos();
        const entradaPablo = servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos();
        expect(entradaFabrizio.length).toBe(1);
        expect(entradaFabrizio[0].asunto).toBe("Reunión");   
        expect(entradaPablo.length).toBe(1);
        expect(entradaPablo[0].asunto).toBe("Reunión");
    });

    test("cada destinatario recibe una copia distinta, no el original", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);
        servidor.registrar(pablo);
        const correo = new Correo(ana, "Reunión", "", [fabrizio, pablo]);

        servidor.enviar(correo);

        const copiaFabrizio = servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()[0];
        const copiaPablo = servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos()[0];
        expect(copiaFabrizio).not.toBe(correo);      //no es el original
        expect(copiaPablo).not.toBe(correo);
        expect(copiaFabrizio).not.toBe(copiaPablo);      //y tampoco comparten la misma copia
    });

    test("no envía nada si un destinatario no está registrado", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);       //Pablo NO se registra
        const correo = new Correo(ana, "Reunión", "", [fabrizio, pablo]);

        expect(() => servidor.enviar(correo)).toThrow("El destinatario no está registrado");
        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toEqual([]);     //no quedó en Enviados
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()).toEqual([]);     //a Fabrizio tampoco le llegó
    });

    test("no envía si el remitente no está registrado", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(fabrizio);   //Ana NO se registra
        const correo = new Correo(ana, "Reunión", "", [fabrizio]);

        expect(() => servidor.enviar(correo)).toThrow("El usuario no está registrado");
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()).toEqual([]);
    });

    test("si el correo no tiene asunto no le llega a nadie", () => {
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);
        const correo = new Correo(ana, "", "Texto", [fabrizio]);   //sin asunto

        expect(() => servidor.enviar(correo)).toThrow("El correo debe tener asunto");
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()).toEqual([]);
    });
});