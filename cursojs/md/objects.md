# Objetos

En JavaScript, los objetos son muy similares a los arrays. Al igual que un array, un objeto contiene un conjunto de valores. Pero mientras que en un array los valores están ordenados por posición, es decir, un índice numérico, en un objeto cada valor se distingue de los demás mediante su nombre.

Veamos un ejemplo:

```javascript
let direccion = {
	calle: 'Tigre',
	numero: 32,
	ciudad: 'Barcelona'
};
```

Cada uno de los elementos contenidos en un objeto recibe el nombre de **propiedad**. Así, la variable `direccion` contiene un objeto JavaScript con 3 propiedades:

- La propiedad `calle`, que contiene el valor `'Tigre'`.
- La propiedad `numero`, que contiene el valor `32`.
- La propiedad `ciudad`, que contiene el valor `'Barcelona'`.

Una propiedad es un par nombre-valor, y un objeto es un conjunto de propiedades. Al igual que con los arrays, la lista de propiedades se separa por `,`. A diferencia de los arrays, los objetos se definen entre `{` y `}` en lugar de `[` y `]`. Los objetos son una forma muy práctica de agrupar datos relacionados y acceder a ellos a través de una única variable. Por ejemplo:

- Todos los datos de una ficha de cliente con su nombre, e-mail, dirección, etc.
- Una factura, con la lista de elementos, precio, total, impuestos, fecha, número de factura, etc.
- Los datos de un objeto en movimiento en un videojuego o programa de simulación: posición x, y, z, velocidad x, y, z, peso, etc.

Para referenciar una propiedad de un objeto determinado, se utiliza la sintaxis `objeto.propiedad`. Continuando con el ejemplo de la dirección:

```javascript
> dreccion.calle
"Tigre"
> direccion.numero
32
> direccion.ciudad = 'Sabadell'
```

Se pueden añadir nuevas propiedades a un objeto existente en cualquier momento:

```javascript
dreccion.provincia = 'Barcelona'
direccion.codigopostal = '08021'
```

Los valores de las propiedades de un objeto pueden ser de cualquier tipo de datos: string, numérico, arrays, otros objetos, etc. Y el nivel de anidamiento está limitado únicamente por la memoria disponible del ordenador.

```javascript
> let dirCliente = {
	calle: 'Tigre',
	numero: 32
};

> let cliente = {
	nombre: 'Juan',
	apellido: 'Diaz',
	direccion: dirCliente,
	telefonos: [ '678 123 456', '931 234 567'],
	ultimaCompra: {
		articulo: 'Nevera',
		precio: 300
	}
};

> cliente.ultimaCompra.precio
300
```

## ✏️ Ejercicio
Toda empresa tiene clientes y quiere tenerlos informatizados. Crea un nuevo programa llamado `clientes.js` y escribe la función `creaCliente`, que reciba 3 parámetros: nombre, apellido y e-mail, y retorne un objeto con 3 propiedades cuyos valores se correspondan con los parámetros recibidos.

**Solución**

```javascript
function creaCliente(nombre, apellido, email) {
	return {
		nombre: nombre,
		apellido: apellido,
		email: email
	};
}
```

Con esta función, podemos crear varios clientes y almacenarlos en variables:

```javascript
let ana = creaCliente('Ana', 'Díaz', 'adiaz@gmail.com');
let juan = creaCliente('Juan', 'García', 'jgarcia@gmail.com');
```

## ✏️ Ejercicio
Añade la función `muestraCliente`, que recibe un objeto cliente como parámetro, y utiliza `console.log` para presentar en consola sus datos, siguiendo este formato:

```bash
Cliente:
    Nombre: Ana
	Apellido: Díaz
	e-mail: adiaz@gmail.com
```
**Solución**

```javascript
function muestraCliente(cliente) {
	console.log('Cliente:');
	console.log('    Nombre: ' + cliente.nombre);
	console.log('    Apellido: ' + cliente.apellido);
	console.log('    e-mail: ' + cliente.email);
}
```

Ahora podemos probar nuestras funciones:

```javascript
let ana = creaCliente('Ana', 'Díaz', 'adiaz@gmail.com');
muestraCliente(ana);
```

## Comparando objetos
Comparar tipos simples como strings, números o booleanos es sencillo:

```javascript
> let n1 = 3
> let n2 = 3
> n1 == n2
true
> let s1 = "Hola"
> let s2 = "Hola"
> s1 == s2
true
```

¿Qué ocurre si comparamos dos objetos que contienen los mismos valores? Por ejemplo, creemos dos clientes aprovechando nuestra función `creaCliente`:

```javascript
let c1 = creaCliente('Pedro', 'Ruiz', 'pruiz@gmail.com');
let c2 = creaCliente('Pedro', 'Ruiz', 'pruiz@gmail.com');
console.log(c1 == c2);
```

A pesar de que `c1` y `c2` contienen las mismas propiedades con los mismos valores, la comparación retornará `false`. Esto es porque los objetos, al igual que los arrays, son tipos de datos compuestos. Los operadores de comparación de igualdad (`==`, `===`, `!=` y `!==`), al comparar datos compuestos, evalúan a `true` (cierto) sólo si los datos apuntan a la misma posición de memoria:

```javascript
let c3 = creaCliente('Eva', 'Ríos', 'erios@gmail.com');
let c4 = c3
console.log(c3 == c4);
```

En este caso sí que se mostrará `true` en consola, porque ahora tanto c1 como c2 apuntan al mismo objeto en memoria.

<p style="text-align: center">
	<img src="img/objetos1.png">
</p>

Como puede verse:
- La asignación entre variables no copia los datos de una a otra, sino que copia la dirección de memoria en la que están almacenados los datos de la otra. Esto es cierto para cualquier asignación, tanto para datos simples como número, string, etc. como compuesto como objeto o array.
- La comparación compara valores en caso de datos simples, y direcciones de memoria en caso de datos compuestos.

## ✏️ Ejercicio
Escribir la función `comparaClientes`, que reciba dos parámetros, `cliente1` y `cliente2`, y retorne `true` si el nombre, apellido y e-mail de `cliente1` y `cliente2` son iguales. Añadir la función al programa `clientes.js` y probar a comparar dos clientes iguales y dos distintos.

**Solución**

```javascript
function comparaClientes(cliente1, cliente2) {
	return cliente1.nombre == cliente2.nombre
		&& cliente1.apellido == cliente2.apellido
		&& cliente1.email == cliente2.email;
}

let c1 = creaCliente('Pedro', 'Ruiz', 'pruiz@gmail.com');
let c2 = creaCliente('Pedro', 'Ruiz', 'pruiz@gmail.com');
let c3 = creaCliente('Eva', 'Ríos', 'erios@gmail.com');
console.log(comparaClientes(c1, c2));	// true
console.log(comparaClientes(c1, c3));	// false
```


## Objetos dinámicos

A diferencia de otros lenguajes orientados a objetos más "clásicos" como Java o C++, JavaScript permite añadir y eliminar propiedades de un objeto existente en cualquier momento. Esta capacidad, entre otras, hace de JavaScript un lenguaje muy dinámico y flexible.

Cualquier string es válido para el nombre de la propiedad, pero en caso que sea una palabra reservada (como por ejemplo `for`, `function` o `else`), o que no sea un nombre de variable válido (es decir, no comience por una letra o `_`), entonces deberá ir entre comillas:

```javascript
let ejemplo = {
	"function": 5,
	"45": {},
	"+*-/": true
};
```

Una vez creado el objeto `ejemplo`, para acceder a la propiedad `"+*-/"`, no puede usarse `ejemplo.+*-/`, porque `+*-/` no es un identificador válido, y produciría un error de sintaxis. Pero sí se puede usar la sintaxis alternativa `ejemplo['+*-/']`. Además, podemos usar cualquier variable o expresión en la parte entre `[` y `]`:

```javascript
> let ejemplo = {
	"function": 5
}
> let nombreProp = 'function'
> ejemplo[nombreProp]
5
```

El valor de `nombreProp` se desconoce hasta el momento de ejecución: puede obtenerse a partir de un valor introducido por el usuario, o a partir de un mensaje de respuesta del servidor, etc. De nuevo, el hecho que puedan manipularse las propiedades de un objeto sin saber sus nombres en tiempo de desarrollo convierte a JavaScript en un lenguaje muy dinámico y flexible.

## ✏️ Ejercicio
Retomemos el ejercicio de la pelota del capítulo anterior. Para no modificar el código existente en nuestro entorno JSBin, vamos a hacer una copia seleccionando la opción "Clone" del menú "File".

En un momento determinado, las características de la pelota se definen por su posición _(x, y)_ y su velocidad _(vx, vy)_. Vamos a agrupar estos 4 valores en un objeto de nombre "pelota":

```javascript
let pelota = {
	x: 0,
	y: 250,
	vx: 2,
	vy: 1
};
```

Tras añadir estas líneas al código JavaScript, debemos eliminar la declaración de las variables `x`, `y`, `vx` y `vy`, puesto que ahora quedan definidas dentro del objeto `pelota`.

👉 La pelota ha dejado de botar, porque las funciones `colocaPelota` y `muevePelota` todavía tratan de usar las variables que acabamos de borrar. Adapta el código de estas funciones para que usen la variable global pelota, y esta pueda volver a botar.

> La función `colocaPelota` usa una variable local llamada `pelota`, que deberemos renombrar para evitar que coincida en nombre con la variable global `pelota`.


**Solución**

```javascript
// 1. Declaramos variables
const ancho = 380, alto = 280;
const gravedad = 0.1;
let pelota = {
	x: 0,
	y: 250,
	vx: 2,
	vy: 1
};

// Coloca la pelota en x, y
function colocaPelota() {
	let element = document.getElementById('pelota');
	element.style.left = pelota.x + 'px';
	element.style.bottom = pelota.y + 'px';
}


// 2. Función que mueve la pelota un paso
function muevePelota() {
	pelota.x += pelota.vx;
	pelota.y += pelota.vy;
	if (pelota.x <= 0 || pelota.x >= ancho) pelota.vx = -pelota.vx;
	if (pelota.y <= 0 || pelota.y >= alto) pelota.vy = -pelota.vy;
	else pelota.vy -= gravedad;
	colocaPelota();
}

// 3. Llama a la función cada 10 milisegundos
setInterval(muevePelota, 10);
```

Ahora vamos a modificar el código del punto 3 en el que se mueve la pelota cada 10 milisegundos, para que invoque a una función más genérica que llamaremos `mueveElementos`, en la que por el momento simplemente llamaremos a muevePelota:

```javascript
function mueveElementos() {
	muevePelota();
}

setInterval(mueveElementos, 10);
```

No parece que este cambio tenga gran utilidad, pero nos será útil más adelante.

👉 Haz que las funciones `colocaPelota` y `muevePelota` reciban un parámetro `pelota`, con el objeto pelota a colocar y mover, respectivamente.

**Solución**

```javascript
function colocaPelota(pelota) {
	let element = document.getElementById('pelota');
	element.style.left = pelota.x + 'px';
	element.style.bottom = pelota.y + 'px';
}


function muevePelota(pelota) {
	pelota.x += pelota.vx;
	pelota.y += pelota.vy;
	if (pelota.x <= 0 || pelota.x >= ancho) pelota.vx = -pelota.vx;
	if (pelota.y <= 0 || pelota.y >= alto) pelota.vy = -pelota.vy;
	else pelota.vy -= gravedad;
	colocaPelota(pelota);
}

function mueveElementos() {
	muevePelota(pelota);
}
```

Ahora en estos métodos, la variable global `pelota` se ha convertido en un parámetro. Esto nos permite tener más de una pelota. Vamos a añadir una segunda pelota, comenzando por modificar el HTML y CSS:

```html
  <div id="pista">
    <div class="pelota" id="pelota1"></div>
    <div class="pelota" id="pelota2"></div>
  </div>
```

```css
.pelota {
	width: 20px;
	height: 20px;
	border-radius: 10px;
	bottom: 0px;
	left: 0px;
	position: absolute;
}

#pelota1 {
	background-color: blue;
}

#pelota2 {
	background-color: green;
}
```

En la función `colocaPelota` tenemos la línea

```javascript
let element = document.getElementById('pelota');
```

Que da por hecho que existe un elemento HTML con `id="pelota"`. Esto ahora ha cambiado, así que si queremos poder colocar varias pelotas, deberemos añadir una nueva propiedad `id` a nuestros objetos pelota, que ahora serán `pelota1` y `pelota2`. Aprovechemos para añadir un método `creaPelota`, que retorne un nuevo objeto pelota a partir de sus datos iniciales:

```javascript
let pelota1 = creaPelota(0, 250, 2, 1, 'pelota1');
let pelota2 = creaPelota(100, 200, 2, 1, 'pelota2');

// Crea un objeto pelota
function creaPelota(x, y, vx, vy, id) {
    return {
      x: x, y: y,
      vx: vx, vy: vy,
      id: id
    };
}
```

En la definición de un objeto, en los casos en los que el nombre de la propiedad coincide con la variable que se le asigna, se puede abreviar, evitando la repetición. La función `creaPelota` puede simplificarse así:

```javascript
let pelota1 = creaPelota(0, 250, 2, 1, 'pelota1');
let pelota2 = creaPelota(100, 200, 2, 1, 'pelota2');

// Crea un objeto pelota
function creaPelota(x, y, vx, vy, id) {
    return { x, y, vx, vy, id };
}
```

Finalmente, actualizaremos `mueveElementos` para mover tanto `pelota1` como `pelota2`:

```javascript
// Mueve todas las pelotas
function mueveElementos() {
	muevePelota(pelota1);
	muevePelota(pelota2);
}
```

## ✏️ Ejercicio
- Añade una tercera pelota, con `id="pelota3"`, en el HTML y CSS. En el CSS, asígnale el color violeta para distinguirla de las otras dos.
- Añade también la variable `pelota3` en JavaScript, e inicialízala con coordenadas `x` e `y` distintas de las otras dos. Modifica `mueveElementos` para que también la mueva.
- Cuando tengas las 3 pelotas botando, crea un array `pelotas` que contenga las 3 pelotas, y modifica `mueveElementos` para que, en lugar de contener 3 llamadas a `muevePelota` en secuencia, recorra el array con un bucle `for`.

**Solución**

```javascript
// Declaramos variables
const ancho = 380, alto = 280;
const gravedad = 0.1;
let pelotas = [
	creaPelota(0, 250, 2, 1, 'pelota1'),
	creaPelota(100, 200, 2, 1, 'pelota2'),
	creaPelota(200, 150, 2, 1, 'pelota3')
];

// Crea un objeto pelota
function creaPelota(x, y, vx, vy, id) {
	return { x, y, vx, vy, id };
}

// Coloca la pelota
function colocaPelota(pelota) {
	let element = document.getElementById(pelota.id);
	element.style.left = pelota.x + 'px';
	element.style.bottom = pelota.y + 'px';
}

// Función que mueve la pelota un paso
function muevePelota(pelota) {
	pelota.x += pelota.vx;
	pelota.y += pelota.vy;
	if (pelota.x <= 0 || pelota.x >= ancho) pelota.vx = -pelota.vx;
	if (pelota.y <= 0 || pelota.y >= alto) pelota.vy = -pelota.vy;
	else pelota.vy -= gravedad;
	colocaPelota(pelota);
}

// Mueve todas las pelotas
function mueveElementos() {
	for (let i = 0; i < pelotas.length; i++) {
		muevePelota(pelotas[i]);
	}
}

// Llama a la función cada 10 milisegundos
setInterval(mueveElementos, 10);
```

### for of
Cuando un bucle `for` se usa para visitar todos los elementos de un array, existe una forma alternativa más concisa y expresiva:

```javascript
for (let pelota of pelotas) {
	muevePelota(pelota);
}
```

### ✏️ Ejercicio (avanzado)
- Elimina los tres DIVs en el HTML con id `pelota1`, `pelota2` y `pelota3`, y añade las pelotas al DOM de forma dinámica. Para ello, usa `document.createElement('div')` para crear un nuevo DIV, y luego añádelo a la pista con `pista.appendChild`, donde `pista = document.getElementById('pista')`. También deberás añadir la clase "pelota" al elemento con `elem.classList.add('pelota')` y darle un color inicial con `elem.style.backgroundColor = 'nombreColor'`.
- Utiliza un bucle `for` para inicializar el array `pelotas`, e inicializa las coordenadas `x` e `y` de cada pelota usando `Math.random()`. Prueba a crear 10 pelotas de forma dinámica.

## Métodos
Como hemos visto en el ejemplo de las pelotas, la función `mueveElementos` se pasa como parámetro a la función `setInterval`. Esto es porque las funciones son un tipo de datos, cuyo valor es el código de una función determinada, y que como tal puede asignarse a una variable, pasarse como parámetro, y también almacenarse en una propiedad.

Es decir, igual que en un objeto podemos tener una propiedad de tipo número, string, etc., también podemos tener una propiedad de tipo función. Para definir dicha propiedad, se le puede asignar el nombre de una función existente:

```javascript
function cuadradoNum(num) {
	return num * num;
}

let aritmetica = {
	PI: 3.1415926,
	cuadrado: cuadradoNum
}
```

Esto se puede hacer porque cuando definimos una función con un nombre determinado, en realidad estamos definiendo una variable de tipo función, cuyo nombre es el nombre de la función, y con el valor igual al código de la misma. La siguiente sintaxis es válida y refleja este concepto de forma mucho más directa:

```javascript
> let cuadradoNum = function(num) {
	return num * num;
}
> cuadradoNum(5)
25
```

Y la misma sintaxis se puede utilizar para definir directamente una función en el cuerpo de un objeto:

```javascript
let aritmetica = {
	PI: 3.1415926,
	cuadrado: function(num) {
		return num * num;
	}
}
```

Ahora podemos utilizar la propiedad `cuadrado` del objeto `aritmetica`:

```javascript
> aritmetica.cuadrado(6)
36
```

Cuando una función es una propiedad de un objeto, recibe el nombre de _método_. Los métodos se distinguen claramente en el código porque, a diferencia del resto de funciones, están prefijadas por el nombre del objeto. Es decir:
- Invocación a función que no es método: `nombreFunción(parámetros)`
- Invocación a método: `nombreObjeto.nombreMétodo(parámetros)`

### ✏️ Ejercicio
En nuestro programa de las pelotas, las funciones `muevePelota` y `colocaPelota` podrían ser métodos, puesto que al fin y al cabo se dedican a realizar acciones sobre un objeto pelota. Modifica el código para convertir esas funciones en métodos, definiéndolas en el cuerpo de la función `creaPelota`.

Puesto que estos métodos forman parte del objeto pelota, podemos renombrar `muevePelota` a `mueve` y `colocaPelota` a `coloca`, puesto que ya no es necesario especificar qué es lo que estamos moviendo o colocando.

**Solución**

```javascript
// Crea un objeto pelota
function creaPelota(x, y, vx, vy, id) {
	return {
		x, y, vx, vy, id,
		coloca: function(pelota) {
			let element = document.getElementById(pelota.id);
			element.style.left = pelota.x + 'px';
			element.style.bottom = pelota.y + 'px';
		},
		mueve: function(pelota) {
			pelota.x += pelota.vx;
			pelota.y += pelota.vy;
			if (pelota.x <= 0 || pelota.x >= ancho) pelota.vx = -pelota.vx;
			if (pelota.y <= 0 || pelota.y >= alto) pelota.vy = -pelota.vy;
			else pelota.vy -= gravedad;
			pelota.coloca(pelota);
		}
	};
}

// Mueve todas las pelotas
function mueveElementos() {
	for (let pelota of pelotas) {
		pelota.mueve(pelota);
	}
}
```

### This
Podemos ver que se da cierta redundancia en la invocación a los métodos `mueve` y `coloca`:

```javascript
	pelota.coloca(pelota);
	pelota.mueve(pelota);
```

Estamos usando un objeto `pelota` para llamar a uno de sus métodos, pasándole como parámetro el propio objeto `pelota`, para que el código del método pueda manipular sus propiedades (por ejemplo modificando `pelota.x` y `pelota.y` en función de `pelota.vx` y `pelota.vy`).

Esta situación es tan común, que la gran mayoría de los lenguajes orientados a objetos definen la variable `this`. En en el código de cualquier método, el valor de `this` es siempre el objeto que contiene el método. Es decir, cuando llamamos a `pelota.mueve()`, `this` equivale a `pelota`. De modo que podemos ahorrarnos tener que pasar el parámetro `pelota` porque el método ya tiene el objeto `pelota` referenciado por `this`. Sustituyendo `pelota` por `this` en el interior de los métodos, tenemos:

```javascript
// Crea un objeto pelota
function creaPelota(x, y, vx, vy, id) {
	return {
		x, y, vx, vy, id,
		coloca: function() {
			let element = document.getElementById(this.id);
			element.style.left = this.x + 'px';
			element.style.bottom = this.y + 'px';
		},
		mueve: function() {
			this.x += this.vx;
			this.y += this.vy;
			if (this.x <= 0 || this.x >= ancho) this.vx = -this.vx;
			if (this.y <= 0 || this.y >= alto) this.vy = -this.vy;
			else this.vy -= gravedad;
			this.coloca();
		}
	};
}

// Mueve todas las pelotas
function mueveElementos() {
	for (let pelota of pelotas) {
		pelota.mueve();
	}
}
```

Podemos ver que la palabra reservada `this` aparece muy frecuentemente en los métodos `mueve` y `coloca`. Esto es normal, puesto que la principal tarea de los métodos de un objeto es la de manipular sus propiedades.

Esta idea es muy importante desde el punto de vista del **diseño de aplicaciones orientadas a objetos**: el diseño de una aplicación consistirá en identificar los **objetos** que participan en ella y sus respectivas **responsabilidades**, implementadas mediante **métodos**.


## Objetos familiares
Repasando los ejemplos y ejercicios de capítulos anteriores, nos damos cuenta que hemos estado usando objetos y métodos sin saberlo:

- `console.log('Hola')`: el objeto `console` tiene el método `log`, que se encarga de mostrar en consola el texto que se le pasa como parámetro.
- `process.argv`: el objeto `process` tiene la propiedad `argv`, que es un array con los parámetros con los que se invoca nuestro programa.
- `length` es una propiedad de todo array, puesto que los arrays son un tipo especial de objeto. De hecho, los arrays tiene muchos métodos que facilitan el trabajo al desarrollador:
	- `push(x)` es un método que añade el elemento `x` al final de un array.
	- `sort()` es un método que ordena los elementos de un array
- `length` es también una propiedad de todo string, que tiene métodos muy útiles como por ejemplo:
	- `search(texto)` busca un texto dentro de otros
	- `substring(desde, hasta)` extrae una porción de texto de dentro de un string

Las siguientes páginas web contienen buenas referencias sobre JavaScript:
- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Referencia muy completa y **normativa** sobre el lenguaje.
- [w3schools.com](http://www.w3schools.com/js/default.asp): referencia más sencilla, con ejemplos más fáciles de entender. En particular:
	- [Propiedades y métodos de los strings](http://www.w3schools.com/jsref/jsref_obj_string.asp)
	- [Propiedades y métodos de los arrays](http://www.w3schools.com/jsref/jsref_obj_array.asp)

## Clases
Examinemos la función `creaPelota`:

```javascript
function creaPelota(x, y, vx, vy, id) {
	return {
		x, y, vx, vy, id,
		coloca: function() {
			// código del método...
		},
		mueve: function() {
			// código del método...
		}
	};
}
```

Independientemente de lo que hagan nuestros programas, en ellos vamos a tener que crear muchos objetos, por ejemplo:
- En una aplicación de comercio electrónico tendremos objetos para nuestros clientes, pedidos, artículos, almacén, etc.
- En una aplicación de _chat_ tendremos objetos para usuarios, mensajes, conversaciones, grupos, etc.
- En un videojuego tendremos objetos para partida, jugador, enemigo, disparo...

Parece que vamos a tener que definir con mucha frecuencia funciones similares a `creaPelota`, como `creaCliente`, `creaGrupo`, etc. Hasta hace relativamente poco tiempo, en JavaScript los objetos se creaban mediante este tipo de función.

En las versiones más recientes del lenguaje, se añade el concepto de **clase**. Una clase es una forma de definir las propiedades de una _categoría_ de objetos, y proporciona un nivel de abstracción superior al de crear un objeto desde una simple función. Veamos cómo se define la clase `Pelota`:

```javascript
class Pelota {

	constructor(x, y, vx, vy, id) {
		this.x = x; this.y = y;
		this.vx = vx; this.vy = vy;
		this.id = id;
	}

	coloca() {
		// código del método...
	}

	mueve() {
		// código del método...
	}
}
```

Esta sintaxis hace más explícita la estructura de nuestros objetos pelota:
- La palabra reservada `class` indica que estamos definiendo las propiedades y métodos de un grupo de objetos.
- La palabra reservada `constructor` se utiliza para inicializar los valores de las propiedades.
- Los métodos se definen como funciones en el interior de la clase.

Con esta nueva sintaxis, se usa la palabra reservada `new` para crear objetos pelota a partir de la clase `Pelota`:

```javascript
let pelota1 = new Pelota(0, 250, 2, 1, 'pelota1');
```



La palabra reservada `new` seguida del nombre de una clase invoca al `constructor` de la clase, pasando los parámetros que acompañan al nombre de la clase, y se retorna un objeto con las propiedades y métodos definidos en la clase.

Por convenio, los nombres de clase empiezan por `Mayúscula`, mientras que los nombres de todas las variables empiezan por `minúscula`. La única excepción son las constantes, que pueden escribirse con todas sus letras en `MAYÚSCULAS`.

### ✏️ Ejercicio
Modificar el programa de la pelota, definiendo la clase `Pelota` y usando `new Pelota(...)` para crear cada una de las pelotas.

**Solución**

```javascript
const ANCHO = 380, ALTO = 280;
const GRAVEDAD = 0.1;

class Pelota {
	constructor(x, y, vx, vy, id) {
		this.x = x; this.y = y;
		this.vx = vx; this.vy = vy;
		this.id = id;
	}

	coloca() {
		let element = document.getElementById(this.id);
		element.style.left = this.x + 'px';
		element.style.bottom = this.y + 'px';
	}

	mueve() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x <= 0 || this.x >= ANCHO) this.vx = -this.vx;
		if (this.y <= 0 || this.y >= ALTO) this.vy = -this.vy;
		else this.vy -= GRAVEDAD;
		this.coloca();
	}
}

function mueveElementos() {
	for (let pelota of pelotas) {
		pelota.mueve();
	}
}

let pelotas = [
    new Pelota(0, 250, 2, 1, 'pelota1'),
    new Pelota(100, 200, 2, 1, 'pelota2'),
    new Pelota(200, 150, 2, 1, 'pelota3')
];

setInterval(mueveElementos, 10);
```

### ✏️ Ejercicio
Para descansar de las pelotas, veamos un caso totalmente diferente. Tenemos que gestionar los datos de una escuela de informática. Queremos crear dos clases: la clase `Alumno` y la clase `Profesor`.
- Las propiedades de la clase `Alumno` son las siguientes:
	- `nombre`: string, nombre del alumno
	- `apellido`: string, apellido del alumno
	- `email`: string, e-mail del alumno
	- `asignaturas`: array de strings con los nombres de las asignaturas que cursa
	- `matricular`: método que añade una asignatura al array de asignaturas
- Las propiedades de la clase `Profesor` son las siguientes:
	- `nombre`: string, nombre del profesor
	- `apellido`: string, apellido del profesor
	- `email`: string, e-mail del profesor
	- `web`: string, dirección a la web del profesor

En ambas clases queremos tener el método `nombreCompleto`, que retorna un string con el nombre + apellido + e-mail entre paréntesis, por ejemplo "Ana Díaz (adiaz@gmail.com)".

**Solución**

Una forma directa de implementar esto es la siguiente:

```javascript
class Alumno {

	constructor(nombre, apellido, email) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.asignaturas = [];
	}

	matricular(asignatura) {
		this.asignaturas.push(asignatura);
	}

	nombreCompleto() {
		return `${this.nombre} ${this.apellido} (${this.email})`;
	}
}

class Profesor {
	constructor(nombre, apellido, email, web) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.web = web;
	}

	nombreCompleto() {
		return `${this.nombre} ${this.apellido} (${this.email})`;
	}
}
```

## Herencia
Puede verse que hay mucha repetición entre las dos clases, puesto que ambas tienen mucho en común. La herencia nos permite definir las características comunes a ambas clases en una _superclase_ de la que ambas pueden _heredar_. Vamos a definir la superclase `Persona`:

```javascript
class Persona {
	constructor(nombre, apellido, email) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
	}

	nombreCompleto() {
		return `${this.nombre} ${this.apellido} (${this.email})`;
	}
}

class Alumno extends Persona {
	constructor(nombre, apellido, email) {
		super(nombre, apellido, email);
		this.asignaturas = [];
	}

	matricular(asignatura) {
		this.asignaturas.push(asignatura);
	}
}

class Profesor extends Persona {
	constructor(nombre, apellido, email, web) {
		super(nombre, apellido, email);
		this.web = web;
	}
}
```

Ahora, cuando ejecutemos `new Alumno('Juan', 'Pérez', 'jperez@gmail.com')`, se ejecutará la siguiente secuencia:

1. Se crea un nuevo objeto de la clase `Alumno`, que por extender de `Persona`, hereda el método `nombreCompleto`.
2. Se ejecuta el constructor de `Alumno`, que comienza con una llamada a `super(nombre, apellido, email)`, es decir, ejecuta el constructor de la clase `Persona`, que procede a inicializar las propiedades `nombre`, `apellido` y `email`.
3. Se termina de ejecutar el constructor de `Alumno`, inicializándose la propiedad `asignaturas`.

Toda clase que en su declaración extiende de otra, hereda sus propiedades y métodos. Una clase puede extender de otra que a su vez extiende de otra. Por ejemplo, podríamos tener una clase `Doctorando`, que extienda de `Alumno` para aquellos alumnos que están cursando la tesis doctoral.

### ✏️ Ejercicio
Usa las clases recién definidas para:

1. Crear un profesor y 3 alumnos.
2. Matricula a los alumnos de 2 asignaturas cada uno.
3. Muestra en consola el nombre completo de cada uno de ellos (profesor y alumnos).
4. En el caso de alumnos, muestra en consola la lista de asignaturas matriculadas.

Finalmente, repasa el código y sigue mentalmente la ejecución del programa. Esta es una práctica muy buena para comprender a fondo el código que escribimos (o que leemos, si es código escrito por otra persona).


### No conviene abusar

> Quien tiene un martillo, todo le parecen clavos

La herencia es un mecanismo para aumentar el nivel de reutilización de código. En el pasado se recomendaba diseñar los objetos de una aplicación como una jerarquía de clases que extienden las unas de las otras.

Con el tiempo se ha visto que este enfoque trae problemas a la hora de mantener una aplicación grande, puesto que es muy difícil prever qué objetos vamos a necesitar, y porque a menudo un objeto determinado puede tener características comunes a varios objetos, mientras que en JavaScript sólo podemos extender de una clase.

La tendencia actual es la de evitar abusar de la herencia, extendiendo como máximo un nivel de jerarquía. Algunos autores abogan incluso por prescindir por completo de la palabra reservada `class`, y trabajar únicamente con objetos creados desde métodos del estilo `creaPelota` visto anteriormente.

Según este enfoque, para evitar la repetición de código, en lugar de usar la herencia se puede simplemente usar objetos compuestos de otros objetos. Tendríamos por ejemplo el objeto `datosAlumno`, que tendría una propiedad `persona` con los datos de la persona, y también una propiedad `asignaturas` con la lista de asignaturas.

Sin embargo, algunos _frameworks_ JavaScript requieren el uso de clases para definir los componentes de la aplicación, y por lo tanto es bueno tanto saber definir clases propias como reconocer código con clases y comprenderlo.


## JSON
Las aplicaciones JavaScript que se ejecutan en el navegador suelen comunicarse con el servidor para obtener los datos a presentar en pantalla. La aplicación del navegador envía un mensaje de petición y recibe un mensaje de respuesta, con los datos a presentar.

Los mensajes viajan en forma de cadena de texto, que debe transformarse en un objeto u objetos con los datos. Por ejemplo, si queremos mostrar en pantalla los datos de un cliente, necesitaremos transformar un string en un objeto cliente. Por su parte el servidor habrá obtenido el objeto cliente, probablemente de una base de datos, y deberá transformarlo en texto para poder enviar el mensaje de respuesta.

JavaScript utiliza un mecanismo muy sencillo para transformar objetos en texto y viceversa: JSON, que son las iniciales de JavaScript Object Notation. El formato de mensaje JSON es simplemente el código JavaScript con el que se define un objeto, es decir:

```bash
{
	propiedad1: valor1,
	propiedad2: valor2,
	...
	propiedadN: valorN
}
```

Además, para que este tipo de código sea considerado JSON, se deben cumplir las siguientes restricciones:

1. Ninguna propiedad puede ser un método, es decir sólo se admiten datos.
2. Los nombres de las propiedades deben ir siempre entre dobles comillas.
3. No se admiten comentarios.

El sigiuente texto es un mensaje JSON con los datos de un cliente:

```javascript
{
	"nombre": "Juan",
	"apellido": "Díaz",
	"direccion": {
		"calle": "Pez",
		"numero": 33,
		"ciudad": "Barcelona"
	}
}
```

JavaScript pone a disposición el objeto JSON con dos funciones:

- `JSON.stringify(objeto)`: recibe como parámetro un objeto y retorna un string en formato JSON.
- `JSON.parse(texto)`: recibe como parámetro un string en formato JSON, y retorna el objeto correspondiente.

JSON es un formato tan práctico (sobre todo si se compara con XML), que se ha convertido en un estándar _de facto_, y se utiliza no sólo para comunicar aplicaciones desarrolladas en JavaScript, sino también en otros lenguajes como Java, PHP, Ruby, etc.
