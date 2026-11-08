import { describe, test, expect } from "vitest";
import { buscar } from "../src/Busqueda";
import { Bandeja } from "../src/Bandeja";
import { Correo } from "../src/Correo";
import { Contacto } from "../src/Contacto";

describe("Búsqueda", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");

    test("encuentra correos por el asunto", () => {
        const bandeja = new Bandeja("Entrada");
        const correo1 = new Correo(ana, "Examen de Paradigmas");
        const correo2 = new Correo(ana, "Trabajo práctico");
        bandeja.agregar(correo1);
        bandeja.agregar(correo2);

        expect(buscar(bandeja, "examen")).toEqual([correo1]);
    });

    test("encuentra correos por el cuerpo", () => {
        const bandeja = new Bandeja("Entrada");
        const correo = new Correo(ana, "Aviso", "La entrega es el lunes");
        bandeja.agregar(correo);

        expect(buscar(bandeja, "lunes")).toEqual([correo]);
    });

    test("no distingue mayúsculas y minúsculas", () => {
        const bandeja = new Bandeja("Entrada");
        const correo = new Correo(ana, "EXAMEN FINAL");
        bandeja.agregar(correo);

        expect(buscar(bandeja, "examen final")).toEqual([correo]);
    });

    test("acepta coincidencias parciales", () => {
        const bandeja = new Bandeja("Entrada");
        const correo = new Correo(ana, "Paradigmas");
        bandeja.agregar(correo);

        expect(buscar(bandeja, "digma")).toEqual([correo]);      //solo una parte de la palabra
    });

    test("devuelve una lista vacía si no hay coincidencias", () => {
        const bandeja = new Bandeja("Entrada");
        bandeja.agregar(new Correo(ana, "Hola"));

        expect(buscar(bandeja, "examen")).toEqual([]);
    });

    test("funciona sobre una bandeja vacía", () => {
        const bandeja = new Bandeja("Entrada");
        expect(buscar(bandeja, "examen")).toEqual([]);
    });

    test("encuentra correos por el nombre del remitente", () => {
        const bandeja = new Bandeja("Entrada");
        const profe = new Contacto("Walter", "wgomez@ucp.edu.ar");
        const correo = new Correo(profe, "Aviso");
        bandeja.agregar(correo);

        expect(buscar(bandeja, "walter")).toEqual([correo]);
    });

    test("encuentra correos por el email del remitente", () => {
        const bandeja = new Bandeja("Entrada");
        const profe = new Contacto("Walter", "wgomez@ucp.edu.ar");
        const correo = new Correo(profe, "Aviso");
        bandeja.agregar(correo);

        expect(buscar(bandeja, "ucp.edu")).toEqual([correo]);   //parte del email
    });

    test("encuentra correos por el nombre de un destinatario", () => {
        const bandeja = new Bandeja("Entrada");
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");
        const correo = new Correo(ana, "Hola", "", [fabrizio]);
        bandeja.agregar(correo);

        expect(buscar(bandeja, "fabri")).toEqual([correo]);
    });

    test("encuentra el correo aunque coincida un destinatario que no es el primero", () => {
        const bandeja = new Bandeja("Entrada");
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");
        const pablo = new Contacto("Pablo", "pablo@hotmail.com");
        const correo = new Correo(ana, "Hola", "", [fabrizio, pablo]);
        bandeja.agregar(correo);

        expect(buscar(bandeja, "hotmail")).toEqual([correo]);  
    });

    test("un correo aparece una sola vez aunque coincida en varios campos", () => {
        const bandeja = new Bandeja("Entrada");
        const correo = new Correo(ana, "Ana confirmó", "Saludos de Ana", []);     //"ana" está en el remitente, el asunto y el cuerpo
        bandeja.agregar(correo);

        expect(buscar(bandeja, "ana")).toEqual([correo]);      //uno solo, no tres
    });

    test("la búsqueda no modifica los correos ni la bandeja", () => {
        const bandeja = new Bandeja("Entrada");
        const correo = new Correo(ana, "Examen", "Texto");
        bandeja.agregar(correo);

        buscar(bandeja, "examen");

        expect(correo.asunto).toBe("Examen");
        expect(bandeja.obtenerTodos()).toEqual([correo]);
    });


});