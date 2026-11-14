import type { IConsultarCorreos } from "./IConsultarCorreos";
import type { Correo } from "./Correo";
import type { Predicado } from "./Predicados";

export const obtenerAsuntos = (coleccion: IConsultarCorreos): string[] =>
    coleccion.obtenerTodos().map(correo => correo.asunto);

export const filtrarCorreos = (
    coleccion: IConsultarCorreos,
    condicion: Predicado
): Correo[] =>
    coleccion.obtenerTodos().filter(condicion);