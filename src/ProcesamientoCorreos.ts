import type { IConsultarCorreos } from "./IConsultarCorreos";
import type { Correo } from "./Correo";
import { not, estaLeido, type Predicado } from "./Predicados";

export const obtenerAsuntos = (coleccion: IConsultarCorreos): string[] =>
    coleccion.obtenerTodos().map(correo => correo.asunto);

export const filtrarCorreos = (
    coleccion: IConsultarCorreos,
    condicion: Predicado
): Correo[] =>
    coleccion.obtenerTodos().filter(condicion);

export const obtenerEstadisticas = (coleccion: IConsultarCorreos) =>
    coleccion.obtenerTodos().reduce(
        (estadisticas, correo) => ({
            total: estadisticas.total + 1,
            leidos: estadisticas.leidos + Number(correo.leido),
            noLeidos: estadisticas.noLeidos + Number(!correo.leido)
        }),
        { total: 0, leidos: 0, noLeidos: 0 }
    );

export const obtenerNoLeidos = (coleccion: IConsultarCorreos): Correo[] =>
    filtrarCorreos(coleccion, not(estaLeido));      //reutiliza filtrarCorreos y los predicados que ya existen