import { describe, test, expect } from "vitest";
import { Contacto } from "../src/Contacto";

describe("Contacto", () => {
    test("se crea con nombre y email", () => {
        const contacto = new Contacto("Ana", "ana@ucp.edu.ar");
        expect(contacto.nombre).toBe("Ana");
        expect(contacto.email).toBe("ana@ucp.edu.ar");
    });
});
