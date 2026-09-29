# Plataforma Web de Noticias

Plataforma web de noticias tipo periódico, desarrollada como entrega del módulo de Front-end.

## Tecnologías

* HTML5
* CSS3
* JavaScript (vanilla, sin frameworks ni librerías)
* JSON local (archivo `data/noticias.json`)
* localStorage (para favoritos y persistencia de datos)

## Páginas

* Inicio (`index.html`): Muestra las noticias destacadas y la página principal del portal.
* Catálogo (`catalogo.html`): Listado general de todas las noticias disponibles.
* Detalle (`detalle.html`): Muestra el contenido completo de una noticia seleccionada.
* Favoritos (`favoritos.html`): Guarda y muestra las noticias marcadas como favoritas por el usuario (mediante LocalStorage).
* Contacto (`contacto.html`): Formulario de contacto con validación de campos.
* Nosotros (`nosotros.html`): Información sobre la plataforma y el equipo editorial.

## Cómo ejecutar el proyecto

El proyecto utiliza `fetch` para leer el archivo `noticias.json`. Por motivos de seguridad (CORS), los navegadores bloquean las peticiones locales si abres el archivo con doble clic (`file://`).

**Opción recomendada: Live Server en VS Code**

1. Instala la extensión **Live Server** en Visual Studio Code.
2. Abre la carpeta del proyecto (`Plataforma-Noticias`) en VS Code.
3. Haz clic derecho sobre el archivo `index.html` y selecciona **Open with Live Server**.

## Estructura de carpetas

```text
Plataforma-Noticias/
├── css/
│   └── style.css
├── data/
│   └── noticias.json
├── js/
│   └── main.js
├── catalogo.html
├── contacto.html
├── detalle.html
├── favoritos.html
├── index.html
├── nosotros.html
└── README.md
