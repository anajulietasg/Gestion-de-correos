import { Correo } from "./Correo";
import { Contacto } from "./Contacto";

export type Predicado = (correo: Correo) => boolean;

//reciben preguntas y devuelven una pregunta nueva
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

//preguntas simples
export const remitenteDeDominio = (dominio: string): Predicado => 
    correo => correo.remitente.email.endsWith(dominio.toLowerCase());

export const asuntoContiene = (texto: string): Predicado =>
    correo => correo.asunto.toLowerCase().includes(texto.toLowerCase());

export const cuerpoContiene = (texto: string): Predicado =>
    correo => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());

export const estaLeido: Predicado =
    correo => correo.leido;     //no recibe parámetros, solo pregunta si el correo está leído


const contactoContiene = (contacto: Contacto, texto: string): boolean =>
    contacto.nombre.toLowerCase().includes(texto.toLowerCase()) ||
    contacto.email.includes(texto.toLowerCase());   

export const remitenteContiene = (texto: string): Predicado =>
    correo => contactoContiene(correo.remitente, texto);      //le pasa el Contacto remitente del correo

export const algunDestinatarioContiene = (texto: string): Predicado =>
    correo => correo.destinatarios.some(destinatario => contactoContiene(destinatario, texto));  