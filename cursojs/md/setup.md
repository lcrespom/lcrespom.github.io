# Entornos de ejecución

## Navegador
### Consola
Como hemos dicho, todos los navegadores están preparados para ejecutar JavaScript. La mayoría de navegadores de PC tienen además herramientas de ayuda al programador, entre las cuales está la **consola**.

La consola simplemente lee el texto escrito por el usuario, línea a línea, lo ejecuta, y escribe como respuesta el resultado de la ejecución.

En Windows, la mayoría de navegadores muestran las herramientas de desarrollo pulsando **F12**. En Mac, pulsando **Cmd+Alt+J** en Chrome, o **Cmd+Alt+I** en Safari y FireFox.

👉 Probad a abrir la consola y escribir operaciones aritméticas como `3 + 2`, veréis como responde con el resultado de la operación.

### Desde una página HTML
La consola es muy práctica para hacer pequeñas pruebas, pero cuando estamos usando una página web interactiva, el código fuente JavaScript se descarga desde el servidor. Cuando el navegador carga una página HTML, carga **y ejecuta** el código JavaScript referenciado por toda etiqueta `<script>` que encuentre. Por ejemplo:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Hola</title>
	<script src="miprograma.js"></script>
</head>
<body>
	<h1>Hola!</h1>
	<script>
		/* También se puede incrustar directamente
		código JavaScript dentro de una página HTML,
		pero debe evitarse porque se considera chapucero.
		*/
	</script>
</body>
</html>
```

Esta es la forma estándar con la que la web utiliza JavaScript: cada vez que visitamos una página web, el navegador analiza el HTML para presentarlo en forma de documento y carga y ejecuta el JavaScript referenciado desde él.

### Herramientas de prueba
Existen páginas web que permiten editar código HTML, CSS y JavaScript y probarlo directamente sin tener que instalar herramientas en nuestro PC. Esto es útil para pequeñas pruebas y para experimentar con código antes de añadirlo a nuestros programas, sobre todo si se trata de pruebas de manipulación de elementos web.

Las más conocidas son:
- [JSBin](https://jsbin.com/)
- [CodePen](http://codepen.io/)
- [Plunker](http://plnkr.co/)

👉 Abrid [JSBin](https://jsbin.com/) y en la sección de JavaScript añadid `document.write('Hola!');`. El texto `Hola!` aparecerá en la sección "Output".

## Fuera del navegador: Node.js
El código JavaScript que se ejecuta en el navegador se descarga de cualquier web a la que nos conectemos. Como no debemos fiarnos ciegamente de todo lo que hay en Internet, los navegadores ejecutan el JavaScript confinado al ámbito de la página web que lo usa. Es decir, **no se tiene acceso** a:
- Los ficheros y programas locales al PC del usuario. De lo contrario, podría buscar en nuestro disco el fichero donde guardamos la contraseña de la web del banco, o directamente borrarnos todos los ficheros del disco.
- Sólo se puede comunicar con el propio servidor que aloja la página web. De lo contrario, podría conectarse a otras webs (por ejemplo Amazon) y realizar acciones en nuestro nombre (por ejemplo comprar cosas y enviarlas a otro destinatario).
- En resumen, el navegador sólo permite a JavaScript manipular los elementos HTML de la página (texto, imágenes, etc). Con HTML5 se puede tener acceso a otros elementos del hardware del usuario como por ejemplo la cámara o el GPS, pero el navegador siempre pedirá permiso al usuario antes de permitir el acceso a JavaScript.

Aunque el uso de JavaScript en un navegador es muy versátil y potente, también tiene sentido usar JavaScript como lenguaje más allá del navegador, por ejemplo para:
- Aplicaciones de servidor de internet, para servir contenido Web, acceder a bases de datos, etc.
- Aplicaciones nativas como juegos, editores, etc. que tengan acceso completo a nuestro PC.

Para ello se necesita un programa capaz de ejecutar código JavaScript, pero que ponga a disposición todos los elementos del sistema operativo. El más usado con diferencia es [Node.js](https://nodejs.org/).

👉 Entrad en https://nodejs.org/, descargad el instalador correspondiente a vuestro sistema operativo, e instaladlo.

La interfaz de usuario de Node.js es rudimentaria: utiliza la línea de comandos del sistema operativo, al puro estilo _hacker_. Si no estamos familiarizados con la línea de comandos, es un buen momento para hacerlo, a lo largo de este curso.

### Consola interactiva
La forma más directa de usar Node.js es simplemente tecleando `node` en la línea de comandos. Al igual que la consola JavaScript del navegador, Node mostrará `>`, indicando que está listo para aceptar cualquier código JavaScript para ejecutarlo.

👉 Probad a introducir operaciones aritméticas como `3 + 2`, igual que la prueba que hicimos con la consola del navegador.

### Programas
La consola de Node se usa únicamente para hacer pequeñas pruebas. Para ejecutar programas más complejos, se escribe el código del programa en un fichero y se le suministra el nombre del fichero por la línea de comandos:
```
node miprograma
```

Node procederá a cargar el código de `miprograma.js` y lo ejecutará.

## Editores
Los programas JavaScript son simples ficheros de texto, que pueden escribirse con cualquier editor de texto simple. El editor a usar es una cuestión de preferencia de cada programador, pero los mejores editores son aquellos que conocen el lenguaje en el que estamos programando y proporcionan ayudas, por ejemplo coloreando el código según la función de cada uno de sus elementos.

Los editores más usados son:
- [Visual Studio Code](http://code.visualstudio.com/)
- [Atom](https://atom.io/)
- [Sublime Text](https://www.sublimetext.com/)
- [Notepad++](https://notepad-plus-plus.org/)

### VS Code y ESLint
Como muchos editores de código, Visual Studio Code soporta la instalación de extensiones (plugins) para añadir nuevas funciones. Una extensión muy interesante es la de un _linter_, es decir, un revisor de código.

De forma similar a los revisores ortográficos de los procesadores de texto, el revisor de código examina el código y aplica una serie de reglas, configurables por el usuario, para detectar posibles errores de programación. Cuando detecta una porción de código que no cumple una determinada regla, lo marca igual que el procesador de texto marca un error ortográfico.

👉 Instalad el revisor de código ESLint siguiendo estos pasos:
1. Desde la línea de comandos, teclead `npm install -g eslint`. Los usuarios de Mac o Linux deben prefijar `sudo` al comando.
2. Desde Visual Studio Code, haced click en el icono de plugins (el último de la barra lateral izquierda), buscad `ESLint` y haced click en el botón `Install`.
3. Abrid la paleta de comandos (`shift+ctrl+P` en Windows y Linux, `shift+cmd+P` en Mac), y escribid `Create`. Seleccionad la opción `Create '.eslintrc.json' file` de la lista que aparece, para crear el fichero de reglas que usará ESLint.
4. Finalmente, reiniciad VS Code para activar el plugin.

La lista de reglas que se genera en el paso 3 es algo breve y puede mejorarse. Abrid el fichero `.eslintrc.json` y sustituid la sección`"rules"` por:

```javascript
    "rules": {
        "no-const-assign": "error",
        "no-this-before-super": "warn",
        "no-undef": "error",
        "no-global-assign": "error",
        "no-unreachable": "warn",
        "no-unused-vars": ["warn", { args: "none" }],
        "constructor-super": "warn",
        "valid-typeof": "warn",
        "no-fallthrough": "warn",
        "no-redeclare": "warn",
        "no-cond-assign": "warn",
        "no-dupe-keys": "warn",
        "no-duplicate-case": "warn",
        "use-isnan": "warn",
        "no-var": "warn",
        "semi": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-trailing-spaces": "warn",
        "no-multi-spaces": "warn",
        "space-infix-ops": "warn",
        "indent": ["warn", "tab"],
        "brace-style": ["warn", "stroustrup"],
        "comma-spacing": "warn",
        "eol-last": "warn",
        "quotes": ["warn", "single"]
    }
```

No todas las reglas de ESLint tienen que ver con posibles errores de programación. Algunas controlan que el desarrollador se ajuste a determinadas **normas de estilo**, similares a las que usamos al escribir. Por ejemplo: después de una coma debe haber un espacio, pero no antes.

Las normas de estilo son importantes a la hora de programar: no es suficiente con que nuestro código sea válido para el intérprete de JavaScript, debemos escribir código que sea fácil de leer por los humanos, y por lo tanto tenga un estilo agradable y se ajuste a una serie de convenios de escritura.

<!-- ToDo: añadir http-server -->