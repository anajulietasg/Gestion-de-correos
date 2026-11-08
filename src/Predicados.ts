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

export const not = (
    predicado: Predicado
    ): Predicado => correo =>
    !predicado(correo);