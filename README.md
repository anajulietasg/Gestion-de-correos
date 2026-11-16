# Gestion-de-correos

Gestor de correos electrónicos desarrollado en TypeScript que combina programación orientada a objetos y programación funcional. Simula el envío, la recepción y la organización de correos entre varios usuarios, sin conectarse a un servicio de correo real, y su funcionamiento se verifica con pruebas automatizadas.

## Funcionalidades

- Crear correos electrónicos con remitente, destinatarios, asunto y cuerpo.
- Registrar usuarios, cada uno con sus propias bandejas.
- Enviar mensajes a uno o varios destinatarios registrados, que reciben una copia independiente.
- Administrar una agenda de contactos sin emails repetidos.
- Organizar los correos en las bandejas Entrada, Enviados, Borradores y Eliminados.
- Guardar, editar y enviar borradores.
- Eliminar correos y restaurarlos a su bandeja de origen.
- Marcar correos como leídos o no leídos y como favoritos.
- Buscar correos por asunto, cuerpo, remitente o destinatarios.
- Crear filtros personalizados combinando condiciones con AND, OR y NOT.
- Obtener asuntos, filtrar correos y calcular estadísticas con map, filter y reduce.

## Tecnologías utilizadas

- **TypeScript:** con modo estricto.
- **Node.js y npm:** 
- **Vitest:** para las pruebas automatizadas.
- **GitHub Actions:** para la integración continua.

## Instalación

```bash
git clone https://github.com/anajulietasg/Gestion-de-correos.git
cd Gestion-de-correos
npm ci
```
## Comandos

- **`npm test`:** ejecuta todas las pruebas.
- **`npx vitest run tests/Correo.test.ts`:** ejecuta las pruebas de un solo archivo.
- **`npm run build`:** verifica que no haya errores de TypeScript sin generar archivos.
- **`npm run coverage`:** genera el reporte de cobertura de las pruebas.

## Estructura del proyecto

- **src/:** clases, interfaces y funciones del sistema.
- **tests/:** pruebas automatizadas.
- **docs/:** diagrama de clases UML

Entre los archivos principales se encuentran:

- **Contacto.ts:** representa a una persona con nombre y email validados.
- **ValidadorEmail.ts:** valida y normaliza direcciones de email.
- **Agenda.ts:** administra los contactos sin emails repetidos.
- **Correo.ts:** representa un mensaje con sus datos y sus estados de leído y favorito.
- **Bandeja.ts:** almacena correos sin duplicados.
- **IConsultarCorreos.ts:** interfaz para las colecciones que pueden devolver sus correos.
- **IGuardarCorreos.ts:** interfaz para las colecciones que pueden guardar correos.
- **Enviador.ts:** valida un correo y lo guarda en la bandeja de enviados.
- **VistaFavoritos.ts:** reúne los favoritos de varias bandejas sin almacenarlos.
- **GestorDeCorreos.ts:** representa las bandejas de un usuario y coordina sus operaciones.
- **ServidorDeCorreo.ts:** administra las cuentas de los usuarios y entrega los correos.
- **Predicados.ts:** condiciones reutilizables y operadores para combinarlas.
- **Filtro.ts y RegistroFiltros.ts:** filtros personalizados, con un máximo de cinco.
- **Busqueda.ts:** búsqueda de correos por texto.
- **ProcesamientoCorreos.ts:** permite obtener asuntos, filtrar mensajes, obtener los no leídos y calcular estadísticas utilizando map, filter y reduce.

## Diseño 

- **Programación orientada a objetos:** para el dominio, con encapsulamiento, composición, interfaces y polimorfismo.
- **Programación funcional:** para filtros, búsqueda y procesamiento de colecciones, con funciones de orden superior y sin modificar las listas originales.
- **Principios SOLID e inyección de dependencias:** para que las clases dependan de interfaces y no de implementaciones concretas.

## Pruebas

El proyecto se desarrolló con TDD, escribiendo cada prueba antes del código. Las pruebas se ejecutan automáticamente con GitHub Actions en cada cambio subido al repositorio.

## Autores

- Fabrizio Jara
- Ana Julieta Sanchez Galeano