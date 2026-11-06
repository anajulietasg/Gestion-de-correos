import { Correo } from "./Correo";

export type Predicado = (correo: Correo) => boolean;

export const and = (
    primero: Predicado,
    segundo: Predicado
    ): Predicado => correo =>
    primero(correo) && segundo(correo);

    export const or = (
    primero: Predicado,
    segundo: Predicado
    ): Predicado => correo =>
    primero(correo) || segundo(correo);