# Gestion-de-correos

## Descripción


Este proyecto fue desarrollado para la actividad evaluativa AE4 de la materia Paradigmas y Lenguajes de Programación II, correspondiente a la carrera Ingeniería en Sistemas de Información.

Consiste en un gestor de correos electrónicos desarrollado en TypeScript, aplicando conceptos de programación orientada a objetos y programación funcional.

El sistema permite simular el envío, la recepción y la administración de correos entre usuarios, sin necesidad de conectarse a un servicio de correo real. Su funcionamiento se comprueba mediante pruebas automatizadas.

## Funcionalidades

El sistema permite:

- Crear correos electrónicos con remitente, destinatarios, asunto y cuerpo.
- Enviar mensajes a uno o varios destinatarios registrados.
- Administrar una agenda de contactos.
- Buscar correos por asunto, contenido, remitente o destinatarios.
- Crear y combinar filtros utilizando operadores lógicos AND, OR y NOT.
- Organizar los correos en las bandejas Entrada, Enviados, Borradores y Eliminados.
- Guardar, editar y enviar borradores.
- Eliminar y restaurar correos.
- Marcar mensajes como leídos o no leídos.
- Marcar y desmarcar correos como favoritos.
- Consultar favoritos de diferentes bandejas.
- Obtener información y estadísticas mediante operaciones de programación funcional.

## Tecnologías utilizadas

- **TypeScript:** lenguaje utilizado para desarrollar el sistema.
- **Node.js y npm:** entorno y gestor de dependencias.
- **Vitest:** herramienta para realizar pruebas automatizadas.
- **Git y GitHub:** control de versiones y trabajo colaborativo.
- **GitHub Actions:** ejecución automática de las verificaciones del proyecto.

## Instalación

Para descargar el proyecto:

```cmd
git clone https://github.com/anajulietasg/Gestion-de-correos.git
cd Gestion-de-correos
```

Instalar las dependencias:

```cmd
npm ci
```

## Ejecución de pruebas

Para ejecutar todos los tests:

```cmd
npm test
```

Para ejecutar un archivo de pruebas específico:

```cmd
npx vitest run tests/Correo.test.ts
```

Para verificar que el proyecto no presente errores de TypeScript:

```cmd
npm run build
```

Este último comando ejecuta `tsc --noEmit`, que comprueba el código sin generar archivos JavaScript.

## Organización del proyecto

- **src/**: contiene las clases, interfaces y funciones que implementan el sistema.
- **tests/**: contiene las pruebas automatizadas correspondientes a sus funcionalidades.
- **package.json**: define las dependencias y comandos del proyecto.
- **tsconfig.json**: contiene la configuración de TypeScript.

Entre los archivos principales se encuentran:

- **Correo.ts:** representa un correo y administra sus propiedades.
- **Contacto.ts y Agenda.ts:** representan y administran los contactos.
- **Bandeja.ts:** permite almacenar y consultar correos.
- **GestorDeCorreos.ts:** coordina las operaciones entre las bandejas.
- **ServidorDeCorreo.ts:** administra las cuentas y simula la entrega de mensajes.
- **Predicados.ts y Filtro.ts:** implementan condiciones y filtros reutilizables.
- **ProcesamientoCorreos.ts:** permite obtener asuntos, filtrar mensajes y calcular estadísticas utilizando `map`, `filter` y `reduce`.

## Pruebas y calidad del código

El proyecto utiliza pruebas automatizadas con Vitest para comprobar el comportamiento de las funcionalidades implementadas.

Se trabajó siguiendo la metodología de desarrollo guiado por pruebas (TDD), escribiendo pruebas antes de implementar nuevas funcionalidades.

Además, se utiliza GitHub Actions para ejecutar verificaciones automáticas sobre los cambios realizados.

## Integrantes

- Ana Julieta Sanchez
- Fabrizio Jara

**Materia:** Paradigmas y Lenguajes de Programación II

**Actividad:** AE4 — Gestor de Correos
