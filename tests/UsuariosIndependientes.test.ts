import { describe, test, expect } from "vitest";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("Usuarios con bandejas independientes", () => {
    const ana = new Contacto("Ana", "ana@gmail.com");
    const fabrizio = new Contacto("Fabrizio", "fabrizio@gmail.com");
    const pablo = new Contacto("Pablo", "pablo@gmail.com");
    const camila = new Contacto("Camila", "camila@gmail.com");

    const crearServidor = (): ServidorDeCorreo => {      //arma un servidor nuevo con los cuatro usuarios registrados
        const servidor = new ServidorDeCorreo();
        servidor.registrar(ana);
        servidor.registrar(fabrizio);
        servidor.registrar(pablo);
        servidor.registrar(camila);
        return servidor;
    };

    test("un correo a tres destinatarios llega a cada uno, y si uno lo elimina los demás lo conservan", () => {
        const servidor = crearServidor();
        const correo = new Correo(ana, "Reunión", "Mañana a las 10", [fabrizio, pablo, camila]);

        servidor.enviar(correo);

        //está en Enviados de Ana y en la Entrada de los tres
        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toContain(correo);
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos().length).toBe(1);
        expect(servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos().length).toBe(1);
        expect(servidor.cuentaDe("camila@gmail.com").entrada.obtenerTodos().length).toBe(1);

        //Pablo elimina SU copia, usando SU gestor
        const cuentaPablo = servidor.cuentaDe("pablo@gmail.com");
        const copiaPablo = cuentaPablo.entrada.obtenerTodos()[0];   //la copia que le llegó a Pablo
        cuentaPablo.eliminar(copiaPablo);

        //a Pablo se le fue a Eliminados
        expect(cuentaPablo.entrada.obtenerTodos()).toEqual([]);
        expect(cuentaPablo.eliminados.obtenerTodos()).toContain(copiaPablo);

        //los demás no cambiaron
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos().length).toBe(1);
        expect(servidor.cuentaDe("camila@gmail.com").entrada.obtenerTodos().length).toBe(1);
        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toContain(correo);
    });

    test("si el remitente elimina su enviado, los destinatarios lo conservan", () => {
        const servidor = crearServidor();
        const correo = new Correo(ana, "Reunión", "", [fabrizio, pablo]);
        servidor.enviar(correo);

        servidor.cuentaDe("ana@gmail.com").eliminar(correo);   //Ana elimina el original de su Enviados

        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toEqual([]);
        expect(servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos().length).toBe(1);
        expect(servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos().length).toBe(1);
    });

    test("marcar un favorito solo lo marca para quien lo hizo", () => {
        const servidor = crearServidor();
        const correo = new Correo(ana, "Reunión", "", [fabrizio, pablo]);
        servidor.enviar(correo);

        const copiaFabrizio = servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()[0];
        const copiaPablo = servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos()[0];

        copiaFabrizio.marcarComoFavorito();   //Fabrizio lo marca en su copia

        expect(copiaFabrizio.favorito).toBe(true);
        expect(copiaPablo.favorito).toBe(false);   
        expect(correo.favorito).toBe(false);   
    });

    test("marcar como leído solo lo marca para quien lo leyó", () => {
        const servidor = crearServidor();
        const correo = new Correo(ana, "Reunión", "", [fabrizio, pablo]);
        servidor.enviar(correo);

        const copiaFabrizio = servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos()[0];
        const copiaPablo = servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos()[0];

        copiaFabrizio.marcarComoLeido();

        expect(copiaFabrizio.leido).toBe(true);
        expect(copiaPablo.leido).toBe(false);
    });

    test("dos remitentes distintos a los mismos destinatarios, cada uno ve solo su enviado", () => {
        const servidor = crearServidor();
        const correoAna = new Correo(ana, "Reunión", "", [fabrizio, pablo]);
        const correoCamila = new Correo(camila, "Examen", "", [fabrizio, pablo]);

        servidor.enviar(correoAna);
        servidor.enviar(correoCamila);

        expect(servidor.cuentaDe("ana@gmail.com").enviados.obtenerTodos()).toEqual([correoAna]);
        expect(servidor.cuentaDe("camila@gmail.com").enviados.obtenerTodos()).toEqual([correoCamila]);

        //cada destinatario recibió los dos correos
        const asuntosFabrizio = servidor.cuentaDe("fabrizio@gmail.com").entrada.obtenerTodos().map(c => c.asunto);
        const asuntosPablo = servidor.cuentaDe("pablo@gmail.com").entrada.obtenerTodos().map(c => c.asunto);
        expect(asuntosFabrizio).toEqual(["Reunión", "Examen"]);
        expect(asuntosPablo).toEqual(["Reunión", "Examen"]);
    });

    test("cada usuario ve solo sus propios favoritos", () => {
        const servidor = crearServidor();
        const correo = new Correo(ana, "Reunión", "Mañana a las 10", [fabrizio, pablo]);
        servidor.enviar(correo);

        const cuentaFabrizio = servidor.cuentaDe("fabrizio@gmail.com");
        const copiaFabrizio = cuentaFabrizio.entrada.obtenerTodos()[0];
        copiaFabrizio.marcarComoFavorito();       //Fabrizio marca su copia

        expect(cuentaFabrizio.favoritos.obtenerTodos()).toEqual([copiaFabrizio]);      //en sus favoritos aparece, no en los de los demás
        expect(servidor.cuentaDe("pablo@gmail.com").favoritos.obtenerTodos()).toEqual([]);   
        expect(servidor.cuentaDe("ana@gmail.com").favoritos.obtenerTodos()).toEqual([]);   
    });
});