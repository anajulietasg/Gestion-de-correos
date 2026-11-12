import { Correo } from "./Correo";

export interface IGuardarCorreos {   //lo único que necesita quien guarda correos
    agregar(correo: Correo): void;
    contiene(correo: Correo): boolean;
}