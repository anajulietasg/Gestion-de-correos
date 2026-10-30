import {describe, test, expect} from "vitest";
import {Agenda} from "../src/Agenda";
import {Contacto} from "../src/Contacto";

describe("Agenda", () => {
    test("permite agregar y consultar un contacto", () => {
        const agenda = new Agenda();
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(fabrizio);

        expect(agenda.buscar("fabrizio@gmail.com")).toBe(fabrizio);
    });

    test("no permite agregar dos contactos con el mismo email", () => {
        const agenda = new Agenda();

        const ana = new Contacto("Ana", "ana@gmail.com");
        const fabrizio = new Contacto("Fabrizio", "ana@gmail.com");

        agenda.agregar(ana);

        expect(() => agenda.agregar(fabrizio)).toThrow(
            "El contacto ya existe"
        );
    });
    
    test("permite modificar el nombre de un contacto", () => {
        const agenda = new Agenda();
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(fabrizio);

        agenda.modificarNombre("fabrizio@gmail.com", "Fabrizio Jara");

        expect(agenda.buscar("fabrizio@gmail.com")?.nombre).toBe("Fabrizio Jara");
    });

    
    test("no permite modificar un contacto inexistente", () => {
        const agenda = new Agenda();

        expect(() =>
            agenda.modificarNombre("fabrizio@gmail.com", "Fabrizio Jara")
        ).toThrow("El contacto no existe");
    });

    
    test("no permite modificar el nombre de un contacto por uno vacío", () => {
        const agenda = new Agenda();
        const ana = new Contacto("Ana", "ana@gmail.com");

        agenda.agregar(ana);

        expect(() =>
            agenda.modificarNombre("ana@gmail.com", "")
        ).toThrow("El nombre no puede estar vacío");

        expect(agenda.buscar("ana@gmail.com")?.nombre).toBe("Ana");
    });
    
    test("permite modificar el email de un contacto", () => {
        const agenda = new Agenda();
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(fabrizio);

        agenda.modificarEmail("fabrizio@gmail.com", "fabriziojara@gmail.com");

        expect(agenda.buscar("fabriziojara@gmail.com")).toBe(fabrizio);
        expect(agenda.buscar("fabrizio@gmail.com")).toBeUndefined();
    });

    
    test("no permite modificar el email por uno que ya existe", () => {
        const agenda = new Agenda();

        const ana = new Contacto("Ana", "ana@gmail.com");
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(ana);
        agenda.agregar(fabrizio);

        expect(() =>
            agenda.modificarEmail("fabrizio@gmail.com", "ana@gmail.com")
        ).toThrow("El contacto ya existe");

        expect(agenda.buscar("fabrizio@gmail.com")).toBe(fabrizio);
        expect(agenda.buscar("ana@gmail.com")).toBe(ana);
    });
    
    test("permite eliminar un contacto existente", () => {
        const agenda = new Agenda();
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(fabrizio);

        agenda.eliminar("fabrizio@gmail.com");

        expect(agenda.buscar("fabrizio@gmail.com")).toBeUndefined();
    });

    test("no permite eliminar un contacto inexistente", () => {
        const agenda = new Agenda();

        expect(() =>
            agenda.eliminar("fabrizio@gmail.com")
        ).toThrow("El contacto no existe");
    });

    test("eliminar un contacto no afecta a los demás", () => {
        const agenda = new Agenda();

        const ana = new Contacto("Ana", "ana@gmail.com");
        const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");

        agenda.agregar(ana);
        agenda.agregar(fabrizio);

        agenda.eliminar("fabrizio@gmail.com");

        expect(agenda.buscar("fabrizio@gmail.com")).toBeUndefined();
        expect(agenda.buscar("ana@gmail.com")).toBe(ana);
    });
});

