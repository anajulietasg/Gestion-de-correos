import { Correo } from "./Correo";

export interface IConsultarCorreos {
    obtenerTodos(): Correo[];   //cualquier clase consultable tiene que poder devolver sus correos
}