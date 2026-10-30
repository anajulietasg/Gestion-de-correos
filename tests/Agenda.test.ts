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
});