import { describe, test, expect } from "vitest";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";
import { and, or, not, remitenteDeDominio, asuntoContiene, cuerpoContiene, estaLeido, type Predicado } from "../src/Predicados";

describe("Predicados", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const correo = new Correo(ana, "Examen");

    test("and devuelve true cuando ambos predicados son verdaderos", () => {
        const esUCP = remitenteDeDominio("@ucp.edu.ar");
        const tieneExamen = asuntoContiene("examen");

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

    test("or devuelve true cuando ambos predicados son verdaderos", () => {
        const verdadero: Predicado = correo => true;
        expect(or(verdadero, verdadero)(correo)).toBe(true);
    });

    test("or devuelve true cuando solo el primero es verdadero", () => {
        const verdadero: Predicado = correo => true;
        const falso: Predicado = correo => false;
        expect(or(verdadero, falso)(correo)).toBe(true);
    });

    test("or devuelve true cuando solo el segundo es verdadero", () => {
        const verdadero: Predicado = correo => true;
        const falso: Predicado = correo => false;
        expect(or(falso, verdadero)(correo)).toBe(true);
    });

    test("or devuelve false cuando ambos son falsos", () => {
        const falso: Predicado = correo => false;
        expect(or(falso, falso)(correo)).toBe(false);
    });

    test("not convierte true en false", () => {
        const verdadero: Predicado = correo => true;
        expect(not(verdadero)(correo)).toBe(false);
    });

    test("not convierte false en true", () => {
        const falso: Predicado = correo => false;
        expect(not(falso)(correo)).toBe(true);
    });
});

describe("Predicados simples", () => {
    const profe = new Contacto("Profe", "profe@ucp.edu.ar");
    const ana = new Contacto("Ana", "ana@gmail.com");

    test("remitenteDeDominio detecta el dominio del remitente", () => {
        const esUCP = remitenteDeDominio("@ucp.edu.ar");  
        expect(esUCP(new Correo(profe, "Aviso"))).toBe(true);
        expect(esUCP(new Correo(ana, "Hola"))).toBe(false);
    });

    test("asuntoContiene no distingue mayúsculas", () => {
        expect(asuntoContiene("examen")(new Correo(ana, "EXAMEN final"))).toBe(true);
    });

    test("cuerpoContiene busca en el contenido", () => {
        expect(cuerpoContiene("entrega")(new Correo(ana, "Aviso", "La Entrega es el lunes"))).toBe(true);
        expect(cuerpoContiene("entrega")(new Correo(ana, "Aviso", "Sin novedades"))).toBe(false);
    });

    test("estaLeido cambia cuando se marca el correo", () => {
        const correo = new Correo(ana, "Hola");
        expect(estaLeido(correo)).toBe(false);
        correo.marcarComoLeido();
        expect(estaLeido(correo)).toBe(true);
    });

    test("se reutilizan para armar una pregunta nueva", () => {
        const noLeido = not(estaLeido);          //pregunta nueva hecha con una que ya existía
        expect(noLeido(new Correo(ana, "Hola"))).toBe(true);
    });
});