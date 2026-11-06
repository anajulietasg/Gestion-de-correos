import { describe, test, expect } from "vitest";
import { Filtro } from "../src/Filtro";
import type { Predicado } from "../src/Predicados";
import { Bandeja } from "../src/Bandeja";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("Filtro", () => {
    test("se crea un filtro con un nombre", () => {
        const siempreVerdadero: Predicado = correo => true;

        const filtro = new Filtro(
            "Correos académicos",
            siempreVerdadero
        );

        expect(filtro.nombre).toBe("Correos académicos");
    });

    test("aplica el predicado y devuelve solo los correos que cumplen", () => {
        const ana = new Contacto("Ana", "ana@ucp.edu.ar");

        const correo1 = new Correo(ana, "Examen de Paradigmas");
        const correo2 = new Correo(ana, "Trabajo práctico");

        const bandeja = new Bandeja("Entrada");
        bandeja.agregar(correo1);
        bandeja.agregar(correo2);

        const tieneExamen: Predicado = correo =>
        correo.asunto.toLowerCase().includes("examen");

        const filtro = new Filtro("Correos de exámenes", tieneExamen);

        const resultados = filtro.aplicar(bandeja);

        expect(resultados).toEqual([correo1]);
    });

    test("aplicar un filtro no modifica la bandeja original", () => {
        const ana = new Contacto("Ana", "ana@ucp.edu.ar");

        const correo1 = new Correo(ana, "Examen");
        const correo2 = new Correo(ana, "Trabajo práctico");

        const bandeja = new Bandeja("Entrada");
        bandeja.agregar(correo1);
        bandeja.agregar(correo2);

        const tieneExamen: Predicado = correo =>
        correo.asunto.toLowerCase().includes("examen");

        const filtro = new Filtro("Exámenes", tieneExamen);

        const resultados = filtro.aplicar(bandeja);

        expect(resultados).toEqual([correo1]);
        expect(bandeja.obtenerTodos()).toEqual([correo1, correo2]);
    });

    test("devuelve un arreglo vacio cuando ningun correo cumple el filtro", () => {
        const ana = new Contacto("Ana", "ana@ucp.edu.ar");
        const correo = new Correo(ana, "Trabajo práctico");

        const bandeja = new Bandeja("Entrada");
        bandeja.agregar(correo);

        const tieneExamen: Predicado = correo =>
        correo.asunto.toLowerCase().includes("examen");

        const filtro = new Filtro("Exámenes", tieneExamen);

        const resultados = filtro.aplicar(bandeja);

        expect(resultados).toEqual([]);
        expect(bandeja.contiene(correo)).toBe(true);
    });
    });