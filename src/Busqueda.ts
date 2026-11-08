import { Correo } from "./Correo";
import type { IConsultarCorreos } from "./IConsultarCorreos";
import { or, asuntoContiene, cuerpoContiene, remitenteContiene, algunDestinatarioContiene, type Predicado } from "./Predicados";

export const coincideCon = (texto: string): Predicado =>     //pregunta ¿el asunto o el cuerpo dicen este texto?
    or(
        or(asuntoContiene(texto), cuerpoContiene(texto)),      //está en el asunto o en el cuerpo?
        or(remitenteContiene(texto), algunDestinatarioContiene(texto))   //o está en el remitente o en algún destinatario?
    );

//recibe cualquier colección que implemente la interfaz, como una Bandeja, y el texto a buscar
export const buscar = (coleccion: IConsultarCorreos, texto: string): Correo[] =>        
    coleccion.obtenerTodos().filter(coincideCon(texto));  