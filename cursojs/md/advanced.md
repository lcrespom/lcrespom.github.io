# Conceptos avanzados

## Funciones anónimas
Ya hemos visto que una función es un objeto JavaScript, y que como tal puede ser el valor de una variable, un parámetro o una propiedad.

La forma habitual de definir una función es:

```javascript
function nombreFuncion(param1, param2) {
	// código de la función
}
```

Esto crea una variable de nombre `nombreFuncion`, con el código de la función como valor de la variable.

### ✏️ Ejercicio
¿Qué hace la siguiente función?

```javascript
function visitaArray(array, funcion) {
	for (let elemento of array) {
		funcion(elemento);
	}
}
```

**Solución**

En efecto, `visitaArray` recorre todos los elementos de un array, y para cada uno, llama a la función pasada como parámetro, pasándole a su vez el elemento visitado. El siguiente código muestra en consola los elementos de un array:

```javascript
let dias = ['lunes', 'martes', 'miércoles',
	'jueves', 'viernes', 'sábado', 'domingo'];

function imprime(x) {
	console.log(x);
}

visitaArray(dias, imprime);
```

En la llamada a `visitaArray` se pasa el nombre de la función, que como hemos visto es una variable cuyo valor es el código que se ejecutará cuando se invoque. También podemos prescindir de la variable y pasar directamente como parámetro el código de la función:

```javascript
visitaArray(dias, function(x) {
	console.log(x);
});
```

El resultado será el mismo: en el bucle `for` de `visitaArray`, se invoca la función que se pasa como parámetro. Esta función ya no necesita tener nombre y como tal es una función _anónima_.

El uso de este tipo de funciones es bastante frecuente en JavaScript. Es un mecanismo muy flexible para pasar código que será invocado en el momento que convenga. En el navegador, este mecanismo se utiliza para dar respuesta a _eventos_, que son lanzados como consecuencia de las acciones del usuario sobre elementos de la página, como por ejemplo pulsar un botón, mover el ratón, modificar un campo de entrada, etc.

El siguiente código escribe "Click!" en consola cuando se pulsa un botón determinado de la página:

```javascript
let boton = document.getElementById('boton1');
boton.onclick = function() {
	console.log('Click!');
};
```

Todos los elementos HTML de una página están representados por un objeto JavaScript, con propiedades y métodos: el DOM, o Document Object Model (modelo de objetos del documento). Cuando el usuario hace click sobre un elemento HTML, el navegador mira si su objeto tiene algún valor en la propiedad `onclick`, y en caso afirmativo (y si es una función), invoca dicho método.


### Clausura
Vamos a ampliar el código anterior para que el click indique qué botón se ha clickado:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
	<button>Botón 1</button>
	<button>Botón 2</button>
	<button>Botón 3</button>
	<button>Botón 4</button>
</body>
</html>
```

```javascript
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function() {
		console.log("Botón " + i + " pulsado");
	};
}
```

### ✏️ Ejercicio
Prueba el código en JSBin. ¿Qué ocurre cuando probamos el código? ¿Por qué?

**Solución**

En efecto: independientemente del botón que se pulse, siempre se muestra en consola "Botón 4 pulsado", es decir, parece que `i` siempre vale `4`. Si reproducimos mentalmente la ejecución, estos son los pasos de lo que ocurre:

1. Se recorre el array de botones del documento, y para cada botón se asigna la función a la propiedad `onclick`, _pero todavía no se ejecuta_.
2. Cuando el usuario hace click en uno de los botones, hace ya rato que el bucle `for` ha terminado, y por lo tanto la variable `i` vale `4`. En ese momento se ejecuta la función, que muestra el valor actual de `i`: `4`.

¿Cómo podemos hacer para que la función utilice el valor de `i` que se corresponde con el botón pulsado? Si modificamos el código de la siguiente forma:


```javascript
var buttons = document.getElementsByTagName("button");

function registraClick(i) {
	buttons[i].onclick = function() {
		console.log("Botón " + i + " pulsado");
	};
}

for (var i = 0; i < buttons.length; i++) {
	registraClick(i);
}
```

¿Por qué funciona ahora correctamente? Porque cuando el usuario pulsa un botón, se llama a la misma función que antes, pero ahora `i` es un parámetro de la función `registraClick`. JavaScript memoriza el valor de `i` en el momento que se invocó la función `registraClick`, y lo recupera al invocar al `onclick` correspondiente. Lo mismo ocurriría si dentro de `registraClick` definimos variables locales: su valor estaría accesible al código de `onclick`.

Esta capacidad de una función de tener acceso a parámetros y variables locales a la función en la que está definida recibe el nombre de _clausura_, o _closure_ en inglés. Es una capacidad muy potente del lenguaje y dota de gran versatilidad a nuestras funciones.

## Programación funcional

### ✏️ Ejercicio
Crea un nuevo programa llamado `filtra.js`, que muestre los parámetros que comiencen por vocal, pasados a mayúsculas.

**Solución**

Podemos usar los mecanismos vistos en ejercicios anteriores, como `ordena.js`. Pero veamos cómo hacerlo aprovechando al máximo los métodos que proporcionan los objetos de tipo array:

```javascript
let params = process.argv.filter(function(item, i) {
	return i >= 2;
});

let mayusc = params.map(function(palabra) {
	return palabra.toUpperCase();
});

let filtradas = mayusc.filter(function(palabra) {
	return 'AEIOU'.indexOf(palabra[0]) >= 0;
});

console.log(filtradas);
```

Se usan dos métodos muy útiles:
- El método `filter` retorna un array con los elementos del array original que cumplen una determinada condición. El método recibe una función como parámetro, que se invoca para cada elemento del array, y si retorna un valor _truthy_, entonces ese elemento se añade al array resultante.
- El método `map` retorna un array con los elementos del array original transformados en base a la función que se pasa como parámetro. En el ejercicio, pasamos una función que pasa a mayúsculas el valor recibido, de modo que el array resultante de `map` contiene los elementos originales pasados a mayúsculas.

Para entender más a fondo el funcionamiento, podemos añadir un `console.log` que muestre cada array tras cada paso. El resultado será:

```bash
$ node filtra perro oso gato pez antílope
Parámetros: [ 'perro', 'oso', 'gato', 'pez', 'antílope' ]
Mayúsculas: [ 'PERRO', 'OSO', 'GATO', 'PEZ', 'ANTÍLOPE' ]
Resultado: [ 'OSO', 'ANTÍLOPE' ]
```

### Modo abreviado o "fat arrow"
Existe una sintaxis alternativa a `function(parámetros) { código }`, que es útil cuando la función es breve. La sintaxis es más concisa: `(parámetros) => { código }`, y aún puede abreviarse más:
- Si sólo hay un parámetro, no hacen falta los paréntesis: `parámetro => { código }`
- Si el código es sólo una expresión, no hacen falta las llaves: `parámetro => expresión`, y la expresión es el valor retornado por la función.

Veamos dos ejemplos:

```javascript
let cuadrado1 = (x) => {
	return x * x;
};

let cuadrado2 = x => x * x;
```

Las funciones `cuadrado1` y `cuadrado2` son totalmente equivalentes. La sintaxis usada en `cuadrado2` es aún más concisa que la usada en `cuadrado1`, que a su vez es más concisa que la sintaxis más tradicional de `function(...)`.

Veamos cómo podemos usar `=>` en el código del ejercicio:

```javascript
let params = process.argv.filter((item, i) => i >= 2);
let mayusc = params.map(palabra => palabra.toUpperCase());
let filtradas = mayusc.filter(
	palabra => 'AEIOU'.indexOf(palabra[0]) >= 0);

console.log(filtradas);
```

Puede verse que el código es mucho más conciso. Al principio puede parecer críptico, pero cuando uno se acostumbra, la brevedad ayuda a eliminar el "ruido de fondo" y a comprender el código de forma más rápida.

Podemos ir más allá y encadenar los 3 pasos en uno:

```javascript
console.log(process.argv
	.filter((item, i) => i >= 2)
	.map(palabra => palabra.toUpperCase())
	.filter(palabra => 'AEIOU'.indexOf(palabra[0]) >= 0));
```

Cada una de las 4 líneas de código hace una tarea concreta:
1. `console.log(process.argv`: muestra en consola el resultado de aplicar el siguiente método sobre el array process.argv.
2. `.filter(...)`: filtra los parámetros de entrada para aceptar los elementos a partir de la segunda posición (no nos interesan posiciones anteriores porque contienen la ruta de Node y de nuestro programa).
3. `.map(...)`: toma el resultado del paso anterior y aplica una transformación que convierta cada palabra a mayúsculas.
4. `filter(...)`: toma el resultado del paso anterior y selecciona únicamente aquellas palabras que comiencen por vocal.


### Funciones y `this`
Estudia el siguiente código con atención, y explica qué hace:

```javascript
function creaBoton(texto) {
	let elemento = document.createElement('button');
	elemento.innerText = texto;
	return {
		texto: texto,
		elemento: elemento,
		insertaEn: function(padre) {
			padre.appendChild(this.elemento);
		},
		registraClick: function() {
			elemento.onclick = function() {
				alert(`Click en "${this.texto}"`);
			};
		}
	};
}

let b1 = creaBoton('Hola');
b1.insertaEn(document.body);
b1.registraClick();
```

La función `creaBoton` utiliza el estilo de programación sin clases, es decir, creando objetos directamente desde nuestro código, sin definir primero una clase para luego crear objetos de dicha clase mediante `new NombreClase()`. Pero lo que vamos a explicar a continuación aplica para cualquier método, tanto si se define directamente en un objeto como si se define en una clase.

Puede verse que el código de la función `creaBoton` tiene dos partes:
- Primero se inicializa la variable `elemento`, creando un elemento HTML de tipo `button` con el texto pasado como parámetro.
- Luego se crea y retorna un objeto, que tiene 4 propiedades:
	- `texto`, cuyo valor es el parámetro `texto` de la función.
	- `elemento`, cuyo valor es el elemento HTML recién creado.
	- `insertaEn`: método que usaremos para añadir el botón como hijo de otro elemento.
	- `registraClick`: método que modifica el método `onclick` del elemento, asignándole una función que muestra un popup con el texto del botón.

Recordemos que al crear un objeto mediante `{ propiedad1: valor1, propiedad2: valor2 }`, podemos usar una forma abreviada cuando el nombre y valor de la propiedad coinciden, como es el caso con `texto` y `elemento`. También podemos abreviar la forma de definir los métodos eliminando `: function`. Por lo tanto, el siguiente código es totalmente equivalente al anterior:

```javascript
function creaBoton(texto) {
	let elemento = document.createElement('button');
	elemento.innerText = texto;
	return {
		texto,
		elemento,
		insertaEn(padre) {
			padre.appendChild(this.elemento);
		},
		registraClick() {
			elemento.onclick = function() {
				alert(`Click en "${this.texto}"`);
			};
		}
	};
}

let b1 = creaBoton('Hola');
b1.insertaEn(document.body);
b1.registraClick();
```

Copia ahora el código JavaScript en JSBin. Verás que en el recuadro "Output" se muestra un botón con la etiqueta "Hola". Puedes probar a añadir más botones, por ejemplo `b2` y `b3` con diferentes textos.

El método `insertaEn` funciona perfectamente. Sin embargo, al hacer click en el botón, se muestra una alerta que debería decir `Click en "Hola"`, y sin embargo dice `Click en "undefined"`. ¿Por qué `this.texto` vale `undefined`?

Como vimos, la palabra reservada `this` es una variable que está disponible en todo método de un objeto, cuyo valor es el propio objeto cuyo método se está ejecutando. Así, cuando invocamos `b1.insertaEn(document.body)`, dentro del método `insertaEn` la expresión `this.elemento` equivale a `b1.elemento`.

Sin embargo, en el caso del método `registraClick`, `this.texto` no equivale a `b1.texto`. La diferencia entre `insertaEn` y `registraClick` es que `this` sólo está disponible en el código del método, **pero no en el código de cualquier función que definamos en su interior**.

La línea ``alert(`Click en "${this.texto}"`);`` no forma parte del método `registraClick` sino que está dentro de la función asignada a `onclick`. Cuando se llame al método `onclick`, será llamado con la forma `elemento.onclick()`, y por lo tanto `this` valdrá `elemento`, y no el objeto que estamos retornando en `creaBoton`.

Pero esto no sólo ocurre porque `onclick` sea un método de otro objeto: ocurre con cualquier función. De hecho, si la función no es un método, entonces `this` apunta al _objeto global_, que en el caso del navegador es la variable `window`, que es un objeto con las propiedades de la ventana en la que se ejecuta el código JavaScript.

¿Cómo arreglamos nuestro código para poder tener acceso al `this` de `registraClick` en el interior del método `onclick`? Pues simplemente copiamos `this` a una variable local:


```javascript
		registraClick() {
			let that = this;
			elemento.onclick = function() {
				alert(`Click en "${that.texto}"`);
			};
		}
```

Si probamos ahora a hacer click en el botón, veremos que el popup ya se muestra correctamente con la frase `Click en "Hola"`.

Este sistema de hacer `let that = this` es perfectamente válido. Pero existe una forma más elegante: la versión abreviada de `function`.

```javascript
		registraClick() {
			elemento.onclick = () => {
				alert(`Click en "${this.texto}"`);
			};
		}
```

La forma `() => {}` define una función que nunca inicializa el valor de `this` cuando se llama a la función, independientemente de si se llama como un método o como una función sin objeto. Por lo tanto, el valor de `this` es el que tiene asociado `registraClick`, que es una función normal, definida mediante `function`.


## Excepciones
Si bien el uso de excepciones en JavaScript no es tan frecuente como en otros lenguajes, puede resultar útil en determinados casos, y es necesario conocerlas para saber utilizarlas en caso que las encontremos en código ajeno.

Una excepción es un acontecimiento que tiene lugar durante la ejecución de un programa, que rompe el flujo normal de ejecución. Suele tratarse de una condición inesperada, y de una situación errónea.

Por ejemplo, cuando nuestro código contiene un error, el intérprete de JavaScript lanzará una excepción. Los casos de error más frecuentes son:
- **Error de sintaxis** (SyntaxError): cuando nuestro código contiene caracteres incorrectos en una determinada posición, por ejemplo si no cerramos correctamente todos los paréntesis, si nos dejamos una coma, etc.
- **Error de referencia** (ReferenceError): cuando intentamos leer una variable que no existe. Esto puede ser debido o bien a que hemos olvidado inicializarla, o que hayamos escrito su nombre incorrectamente.
- **Error de tipo** (TypeError): cuando un objeto no es del tipo esperado. El caso más frecuente es el intentar invocar un método que no existe.

Cuando una excepción tiene lugar, se interrumpe la ejecución y se busca un código que sea capaz de capturar _(catch)_ la excepción y realizar alguna acción para responder ante el problema (por ejemplo, mostrar un mensaje de error). Si no se encuentra ningún código que capture la excepción, entonces el programa termina, mostrando el error en consola.

JavaScript es un lenguaje muy permisivo, y en comparación con otros lenguajes como Java, trata de minimizar el número de casos en los que se lanzan excepciones como consecuencia de errores de programación. Por ejemplo, en Java, una división por 0 provoca una excepción, mientras que en JavaScript se asigna `Infinity` al resultado.

### Captura de excepciones
Para capturar una posible excepción, se utilizan las palabras reservadas `try` y `catch`:

```javascript
try {
	// Código que puede lanzar la excepción
	// ...
}
catch (error) {
	// Código a ejecutar si se produce la excepción
	// ...
}
```

Es decir, si durante la ejecución del código dentro del bloque `try`, tanto directamente en esas líneas como en el código de funciones y métodos invocados desde ahí, se _lanza_ una excepción, entonces se interrumpirá inmediatamente la ejecución y se ejecutará el código del bloque `catch`.

El bloque catch recibe un objeto error como "parámetro", que contendrá información sobre el error que se ha producido.

**Ejemplo**

```javascript
try {
	console.log('Antes');
	console.log(estaVariableNoExiste);
	console.log('Después');
}
catch (error) {
	console.log(error);
}
```

En este ejemplo trivial estamos provocando a conciencia un error en el segundo console.log. El resultado es que en la consola se mostrará el mensaje `Antes` seguido del texto del error, pero no se llegará a mostrar el mensaje `Después`, puesto que ese código nunca se llegará a ejecutar.

### Lanzamiento de excepciones
En nuestro programa, pueden ocurrir muchos errores que debemos tratar adecuadamente. Hay 3 tipos de error:
- Los provocados por errores en nuestro código: estos deben evitarse a toda costa. La forma de hacerlo es probar nuestro código a fondo, para asegurarnos al máximo que está libre de errores.
- Los provocados por errores introducidos por el usuario: por ejemplo si el usuario introduce texto donde se espera que introduzca números, o fechas incorrectas, etc. La forma de responder a estos errores es añadiendo código que verifique que los datos introducidos por el usuario sean correctos, mostrando mensajes de error en caso contrario.
- Los provocados por operaciones de entrada/salida: por ejemplo si la conexión a internet no está disponible, o si no se encuentra un determinado fichero, etc. La forma de responder a estos errores es detectando cuándo suceden y actuando en consecuencia, ya sea mostrando un mensaje de error, reintentando, etc.

En el segundo y tercer caso, podemos aprovechar la gestión de excepciones para lanzar errores desde nuestro código. Esto aportará las siguientes ventajas:
- Separar el código que maneja errores del código de operación normal.
- Propagar "hacia arriba" los errores, evitando tener que tratar los errores en todas partes.

Las excepciones se lanzan con la palabra reservada `throw` seguida del objeto error. Por ejemplo:

```javascript
function cargarImagen(nombre) {
	let datosImagen = leerFichero(nombreFichero);
	if (!datosImagen)
		throw Error(`Imagen ${nombreFichero} no encontrada`);
	procesarImagen(datosImagen);
	mostrarImagen(datosImagen);
}

try {
	cargarImagen('imagen.jpg');
}
catch (error) {
	console.log(error);
}
```

Cuando utilicemos código de librerías de terceros, es posible que dicho código lance excepciones ante situaciones de error. Si la librería está bien documentada, informará de en qué casos se lanzan excepciones, y por lo tanto podremos decidir de qué forma tratar las excepciones que se lancen.


<!-- ToDo:
	- Módulos
		- Node: require('...');
		- ES6: import ... from ...;
-->
