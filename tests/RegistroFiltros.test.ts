import { describe, test, expect } from "vitest";
import { RegistroFiltros } from "../src/RegistroFiltros";
import { Filtro } from "../src/Filtro";
import type { Predicado } from "../src/Predicados";

describe("RegistroFiltros", () => {
    const verdadero: Predicado = correo => true;

    test("permite registrar filtros", () => {
        const registro = new RegistroFiltros();
        const filtro = new Filtro("UCP", verdadero);

        registro.registrar(filtro);

        expect(registro.obtenerTodos()).toEqual([filtro]);
    });

    test("permite registrar hasta cinco filtros", () => {
        const registro = new RegistroFiltros();

        for (let i = 1; i <= 5; i++) {
            registro.registrar(new Filtro(`Filtro ${i}`, verdadero));
        }

        expect(registro.obtenerTodos()).toHaveLength(5);
    });

    test("rechaza registrar un sexto filtro", () => {
        const registro = new RegistroFiltros();

        for (let i = 1; i <= 5; i++) {
            registro.registrar(new Filtro(`Filtro ${i}`, verdadero));
        }

        expect(() =>
            registro.registrar(new Filtro("Filtro 6", verdadero))
        ).toThrow("No se pueden registrar más de cinco filtros");
    });

    test("obtenerTodos no expone la lista interna", () => {
        const registro = new RegistroFiltros();
        registro.registrar(new Filtro("UCP", verdadero));

        registro.obtenerTodos().pop();

        expect(registro.obtenerTodos()).toHaveLength(1);
    });

    test("rechaza registrar un filtro con nombre repetido", () => {
        const registro = new RegistroFiltros();
        registro.registrar(new Filtro("Exámenes", verdadero));

        expect(() =>
            registro.registrar(new Filtro("Exámenes", verdadero))
        ).toThrow("Ya existe un filtro con ese nombre");
        expect(registro.obtenerTodos()).toHaveLength(1);
    });
});