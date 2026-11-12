import { describe, test, expect } from "vitest";
import { VistaFavoritos } from "../src/VistaFavoritos";
import { Bandeja } from "../src/Bandeja";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("VistaFavoritos", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");

    test("reúne los favoritos de varias bandejas", () => {
        const entrada = new Bandeja("Entrada");
        const enviados = new Bandeja("Enviados");
        const correo1 = new Correo(ana, "Uno");
        const correo2 = new Correo(ana, "Dos");
        entrada.agregar(correo1);
        enviados.agregar(correo2);
        correo1.marcarComoFavorito();
        correo2.marcarComoFavorito();

        const favoritos = new VistaFavoritos([entrada, enviados]);   //le pasamos las bandejas que tiene que mirar

        expect(favoritos.obtenerTodos()).toEqual([correo1, correo2]);
    });

    test("no incluye los correos que no son favoritos", () => {
        const entrada = new Bandeja("Entrada");
        const favorito = new Correo(ana, "Importante");
        const comun = new Correo(ana, "Común");
        entrada.agregar(favorito);
        entrada.agregar(comun);
        favorito.marcarComoFavorito();

        const favoritos = new VistaFavoritos([entrada]);

        expect(favoritos.obtenerTodos()).toEqual([favorito]);
    });

    test("se actualiza sola cuando se marca o desmarca un correo", () => {
        const entrada = new Bandeja("Entrada");
        const correo = new Correo(ana, "Hola");
        entrada.agregar(correo);
        const favoritos = new VistaFavoritos([entrada]);

        expect(favoritos.obtenerTodos()).toEqual([]);   

        correo.marcarComoFavorito();
        expect(favoritos.obtenerTodos()).toEqual([correo]);   

        correo.desmarcarComoFavorito();
        expect(favoritos.obtenerTodos()).toEqual([]);  
    });

    test("marcar como favorito no saca el correo de su bandeja", () => {
        const entrada = new Bandeja("Entrada");
        const correo = new Correo(ana, "Hola");
        entrada.agregar(correo);
        const favoritos = new VistaFavoritos([entrada]);

        correo.marcarComoFavorito();

        expect(favoritos.obtenerTodos()).toContain(correo);
        expect(entrada.obtenerTodos()).toContain(correo);   //sigue en Entrada
    });

    test("sin favoritos devuelve una lista vacía", () => {
        const favoritos = new VistaFavoritos([new Bandeja("Entrada")]);
        expect(favoritos.obtenerTodos()).toEqual([]);
    });
});