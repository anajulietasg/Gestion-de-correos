import type { IConsultarCorreos } from "./IConsultarCorreos";

export const obtenerAsuntos = (coleccion: IConsultarCorreos): string[] =>
    coleccion.obtenerTodos().map(correo => correo.asunto);