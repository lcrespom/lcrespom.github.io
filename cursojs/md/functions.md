# Funciones

## Programar una vez, usar cuando haga falta
Supongamos que queremos mostrar la hora en formato hh:mm:ss, de modo que las 9 y 5 de la mañana se muestre como 09:05:00, y disponemos de 3 variables: `h`, `m`, y `s`, con la hora, minutos y segundos respectivamente.

Aparte de convertir los números a string y separarlos por `:`, si algún número es menor que 10, habrá que prefijar un 0 porque de lo contrario tendríamos 9:5:0 en lugar de 09:05:00.

A estas alturas sabemos cómo hacer esto:

```javascript
let h = 9;
let m = 5;
let s = 0;

if (h < 10) {
	h = '0' + h;
}
if (m < 10) {
	m = '0' + m;
}
if (s < 10) {
	s = '0' + s;
}
console.log(`Son las ${h}:${m}:${s}`);
```
> 👉 En este ejemplo inicializamos las variables a mano, pero en un caso real podrían venir del usuario, un fichero, una base de datos, etc.

Estamos escribiendo código muy repetitivo. Si en lugar de mostrar una hora por pantalla necesitamos mostrar varias, por ejemplo hora de embarque, de salida y de llegada, entonces parece que deberíamos copiar la sentencia `if (num < 0) ...` otras 6 veces más.

Para ahorrarnos la repetición, podemos definir un bloque de código a ejecutar cuando nos haga falta: la función.

## Definición
Una función es un bloque de código reutilizable que recibe 0 o más parámetros separados por `,`, realiza una serie de acciones y retorna opcionalmente un valor. Se define mediante la siguiente estructura:

```javascript
function nombreFuncion(parametros) {
	sentencias;
	return expresión;
}
```

Por ejemplo podríamos aislar el formateo numérico anterior en una función:

```javascript
function prefijar0(num) {
	let prefijo = '';
	if (num < 10) {
		prefijo = '0';
	}
	return prefijo + num;
}
```

## Invocación

Ahora que la función `prefijar0` está definida, podemos invocarla cuando nos haga falta:

```javascript
let h = 9;
let m = 5;
let s = 0;

h = prefijar0(h);
m = prefijar0(m);
s = prefijar0(s);
console.log(`Son las ${h}:${m}:${s}`);
```

Las funciones son el elemento más potente de la mayoría de lenguajes de programación en general, y más aún en el caso de JavaScript.
- No sólo el código es más conciso, sino que dota de una gran versatilidad a los programas: el uso de parámetros permite llamar a una misma función en condiciones muy distintas.
- Favorece la metodología de "divide y vencerás", es decir, descomponer problemas complejos en partes más sencillas, solucionar cada una de las partes y juntar las soluciones parciales para construir la solución final.
- Permite estructurar el código y hacerlo más fácil de comprender y mantener.
- Permite escribir y reutilizar librerías de funciones con las tareas más frecuentes de los programas: formateo de números y texto, manipulación de arrays, manipulación de los elementos de una página web, etc.

En resumen, las posibilidades son infinitas: dentro del código de una función podemos usar cualquier sentencia, incluida la invocación a otras funciones. Definamos por ejemplo una función que reciba 3 parámetros numéricos `h`, `m`, y `s`, y retorne un texto en formato horario `hh:mm:ss`:

```javascript
function formatearHora(h, m, s) {
	return prefijar0(h) + ':' + prefijar0(m) + ':' + prefijar0(s);
}
```

Y ahora podemos escribir de forma muy concisa los horarios de un vuelo:

```javascript
let hEmbarque = 9; let mEmbarque = 5;
let hSalida = 9; let mSalida = 45;
let hLlegada = 11; let mLlegada = 15;
console.log('Embarque: ' + formatearHora(hEmbarque, mEmbarque, 0));
console.log('Salida: ' + formatearHora(hSalida, mSalida, 0));
console.log('Llegada: ' + formatearHora(hLlegada, mLlegada, 0));
```

### ✏️ Ejercicio
Recupera el programa que muestra una tabla de multiplicar. Crea un nuevo programa llamado `tablamul-func.js` que separe el código de `tablamul-for.js` en dos partes:

1. Una función que muestra por consola la tabla de multiplicar de un número cualquiera pasado como parámetro.
2. El programa principal, que obtiene el número de `process.argv[2]`, valida que sea numérico, y llama a la función o muestra un mensaje de error según el parámetro sea válido o no.

**Solución**:

```javascript
function muestraTabla(num) {
	for (let i = 1; i <= 10; i++) {
		console.log(`${num} por ${i} es ${num * i}`);
	}
}

let numero = +process.argv[2];
if (isNaN(numero)) {
	console.log('Error: se debe pasar un número como parámetro');
}
else {
	muestraTabla(numero);
}
```

El uso de funciones no sólo nos sirve para simplificar el código de nuestro programa. Tiene ventajas conceptuales muy fuertes, permitiendo:
- Separar un programa en distintas partes que tratan problemas distintos. En el ejercicio anterior, mostrar la tabla de multiplicar de un número no tiene nada que ver con cómo se obtiene ese número, si es válido, o qué mensaje dar al usuario si no lo es.
- Razonar sobre nuestros programas en términos más abstractos y de más alto nivel, consiguiendo que "los árboles no nos impidan ver el bosque". Por muy grande y complejo que sea un programa, siempre podremos dividirlo en distintas funciones que realizan distintas tareas independientes.
- Trabajar en grupo repartiendo tareas: varios programadores pueden trabajar en un mismo programa, dedicándose a desarrollar distintas funciones cada uno.


## Parámetros
Los parámetros de una función se comportan igual que variables que existen sólo dentro de ella, y cuyo valor se inicializa con el valor que se le pasa cuando son invocadas. Tomemos un ejemplo sencillo que podemos probar en la consola del navegador o de Node:

```javascript
> function resta(a, b) {
	return a - b;
}
> resta(3, 2)
1
> let x = 7
> let y = 5
> resta(x, y)
2
> let a = 6
> let b = 9
resta(b, a)
3
> resta(b * 2, a + 2)
10
```

Veamos cada una de las llamadas para comprender a fondo el mecanismo de paso de parámetros:
1. Cuando llamamos a `resta(3, 2)`, JavaScript asigna `a = 3` y `b = 2` en el momento de "entrar" en la función `resta`.
2. Por supuesto, lo mismo ocurre en todos los casos. Si pasamos `x` e `y`, se asigna **el valor** de `x` y de `y` a los parámetros, de modo que `a = 7` y `b = 5` porque esos son los valores de `x` e `y` en el momento de invocar a la función. JavaScript pasa todos los parámetros por valor, independientemente del tipo de datos.
3. No debemos confundir el nombre de nuestras variables fuera y dentro de la función. Cuando llamamos a `resta(b, a)`, estamos haciendo el parámetro `a` de la función igual al valor de la variable `b` fuera de ella, y viceversa. No hay ningún conflicto de nombres.
4. Podemos pasar en cada parámetro cualquier expresión. JavaScript calculará el resultado de la expresión antes de invocar a la función.

### Modificación de parámetros
Como con cualquier variable, se puede asignar un nuevo valor a un parámetro. Por ejemplo:

```javascript
> function suma1(x) {
	x = x + 1;
	console.log('x vale ' + x);
}
```

Si hacemos lo siguiente:

```javascript
> let a = 5
> a
5
> suma1(a);
x vale 6
> a
5
```

En efecto, aunque se modifique el valor de un parámetro, esta modificación queda restringida al ámbito de la función, y el valor de la variable usada durante la invocación no se verá modificada. Esto es porque, como hemos visto, JavaScript pasa como parámetro el **valor** de la variable, y no la variable en sí.


## Retorno
Como hemos visto en ejemplos previos, dentro de una función se puede usar en cualquier momento la sentencia `return`. El uso de `return` es opcional, y provoca dos efectos:
1. La función termina de ejecutarse y se retorna el control al código que invocó la función. La sentencia `return` no tiene porque estar situada en la última línea de código de la función, aunque es recomendable usarlo al final para mayor claridad.
2. La función retornará opcionalmente un valor: si se usa la modalidad `return expresión;`, entonces el valor calculado por la expresión será retornado al código que invoca la función. Si se usa la modalidad `return;`, entonces la función retorna `undefined`.

La siguiente función calcula el área de un cuadrado:

```javascript
function areaCuadrado(lado) {
	return lado * lado;
}
```

Y el valor retornado puede usarse para asignar a una variable o formar parte de cualquier expresión:

```javascript
> let area = areaCuadrado(5);
> area
25
```


## Variables locales
Las variables definidas dentro de una función reciben el nombre de **variables locales**: el uso de la sentencia `let` dentro de una función crea una variable que será visible sólo al código de la función:


```javascript
> function f() {
	let x = 3;
	console.log(`x vale ${x}`);
}
> f()
x vale 3
> x
Uncaught ReferenceError: x is not defined
```

Puede verse que si intentamos utilizar x fuera de la función, incluso después de haberla ejecutado, obtenemos un error indicando que la variable no existe. Este comportamiento es importante porque de este modo el programa está aislado de las variables definidas en la función: de lo contrario, cada vez que invocásemos a una función se crearían potencialmente nuevas variables y correríamos el riesgo de que se modificase el valor de variables existentes cuyo nombre coincide con variables declaradas dentro de la función invocada.

### Variables globales
Las variables definidas en el programa principal, fuera de cualquier función, reciben el nombre de **variables globales**, y son accesibles desde cualquier parte del programa, tanto fuera como dentro de una función. Se recomienda utilizar el menor número posible de variables globales, idealmente 0, puesto que son compartidas por todo el programa, y en un programa grande cualquier trozo de código puede modificarlas, causando efectos impredecibles sobre otras partes del código.

> 👉 El problema de diseño más grave de JavaScript es qué ocurre si nos olvidamos del `let` en el momento de definir una nueva variable local y simplemente la inicializamos mediante `nuevaVariable = valor`. En lugar de dar un mensaje de error del tipo `esta variable no existe`, JavaScript mirará si existe una variable global con ese nombre, y en caso contrario, **la creará**. De modo que lo que puede comenzar siendo un pequeño olvido (dejarnos un `let`), se convierte en un error potencial muy difícil de identificar, si por ejemplo más adelante el programa usa dicha variable. Afortunadamente, ESLint detecta este tipo de errores y genera un aviso en el editor.

En caso que una función declare una variable local, usando `let`, cuyo nombre coincida con una variable global, existirán dos variables con el mismo nombre: una local, y una global, cada una con su valor:

```javascript
> function f() {
	let x = 3;
	console.log(`x vale ${x}`);
}
> let x = 'Hola'
> x
"Hola"
> f()
x vale 3
> x
"Hola"
```

## Comentarios
Cuando un programa crece en tamaño, cada vez es más difícil que "quepa" todo en la cabeza de una persona. Por eso conviene añadir anotaciones en aquellas partes del código que sean más difíciles de entender, o para documentar cómo se usa una función, o para añadir cualquier otra información descriptiva, como por ejemplo el nombre del autor.

Existen dos tipos de comentarios de JavaScript: de una sola línea y de varias líneas. Los comentarios de una sola línea comienzan con `//` y termina al final de la línea:


```javascript
let nombre = process.argv[2];	// Nombre del usuario
let pw = process.argv[3];		// Contraseña

// Conexión a servidor
let conn = connect(nombre, pw);
```

Todo editor de código moderno detecta los comentarios y les cambia el color para poder distinguirlos fácilmente.

Los comentarios de varias líneas se abren con `/*` y se cierran con `*/`. Entre el principio y fin de comentario pueden haber tantas líneas como se quieran:

```javascript
/* Esta función calcula los n primeros dígitos de PI.
El parámetro n indica el número de dígitos a retornar.
Los dígitos se retornan en un array de números.
*/
function calcularPI(n) {
	// código de la función
}
```

JavaScript ignora por completo todo tipo de comentarios. Para el lenguaje, es como si no existieran, y no afectan para nada a la ejecución.


## ✏️ Ejercicio
Crea un programa llamado `arraymax.js`, y proporciona el código de la función arrayMax, que busca y retorna el valor máximo de un array de números:


```javascript
function arrayMax(nums) {
	// Proporcionar el código aquí
}

// Ejemplos de uso:
console.log(arrayMax([7, 2, 9, 4, 1]));	// 9
console.log(arrayMax([10, 9, 8, 7, 6, 5, 4])); // 10
console.log(arrayMax([7])); // 7
```

Una vez desarrollada una función, podemos realizar pruebas de que está implementada correctamente a base de invocarla repetidas veces con distintos parámetros. En todo desarrollo en equipo que se precie, cada desarrollador debe probar sus funciones antes de entregarlas. Las pruebas forman parte de la entrega del código, y pueden automatizarse para lanzarlas siempre que sea necesario.

**Solución**:

```javascript
function arrayMax(nums) {
	let max = nums[0];
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > max) {
			max = nums[i];
		}
	}
	return max;
}

// Ejemplos de uso:
console.log(arrayMax([7, 2, 9, 4, 1]));	// 9
console.log(arrayMax([10, 9, 8, 7, 6, 5, 4])); // 10
console.log(arrayMax([7])); // 7
```

¿Qué ocurre si invocamos la función pasándole un array de strings?:

```javascript
console.log(arrayMax(['lunes', 'martes', 'miércoles',
	'jueves', 'viernes', 'sábado', 'domingo']));
```

Puesto que los strings pueden compararse con `<`, `<=`, `>` y `>=`, el condicional `if (nums[i] > max) {` evaluará a cierto si el elemento de la tabla es mayor alfabéticamente que el máximo actual, de modo que la función arrayMax retornará el último string de la tabla por orden alfabético.

> A la vista de que arrayMax no sólo funciona con números, quizás deberíamos renombrar el parámetro `nums` por algo más genérico como `tabla` o `items`.

## ✏️ Ejercicio
Amplía el programa `arraymax.js` añadiendo la función `pruebaArrayMax`, que reciba dos parámetros:
- El array de números o strings
- El valor que debería obtenerse en caso que la implementación sea correcta

Esta función invocará a `arrayMax` y comparará el valor retornado con el esperado, dando un mensaje de error en caso que la comparación sea incorrecta. Sustituye el código del programa principal por llamadas a `pruebaArrayMax`.

**Solución**:

```javascript
function arrayMax(items) {
	let max = items[0];
	for (let i = 1; i < items.length; i++) {
		if (items[i] > max) {
			max = items[i];
		}
	}
	return max;
}

function pruebaArrayMax(items, esperado) {
	let resultado = arrayMax(items);
	if (resultado != esperado) {
		console.error(`Error en arrayMax([${items}]):`);
		console.error(`Valor esperado: ${esperado}, valor obtenido: ${resultado}`);
	}
}

// Pruebas
pruebaArrayMax([7, 2, 9, 4, 1], 9);
pruebaArrayMax([10, 9, 8, 7, 6, 5, 4], 10);
pruebaArrayMax([7], 7);
pruebaArrayMax(['lunes', 'martes', 'miércoles',
	'jueves', 'viernes', 'sábado', 'domingo'], 'viernes');
```

Nótese que en lugar de `console.log` estamos usando la variante `console.error`. Ambas funciones muestran el mensaje en la consola, pero un mensaje de error suele mostrarse distinto, por ejemplo en rojo en el caso de la consola del navegador.

> Si queremos probar _provisionalmente_ que pruebaArrayMax se da cuenta cuando nuestra función falla, podemos modificar uno de los valores esperados para ver el mensaje de error.


## ✏️ Ejercicio
Escribe una función llamada `cortaArray` que reciba como parámetros un array y un número, y retorne otro con todos los elementos del primero a partir la posición indicada en el número:

```javascript
function cortaArray(arr, desde) {
	// retornar un nuevo array con todos los elementos de arr
	// desde de la posición "desde" hasta el final
}

console.log(cortaArray([1, 2, 3], 1)); // [2, 3]
```

> Para inicializar un array a vacío, basta con hacer `let resultado = []`. Luego se pueden añadir elementos haciendo `resultado[resultado.length] = nuevoElemento`.

**Solución**:

```javascript
function cortaArray(arr, desde) {
	let resultado = [];
	for (let i = desde; i < arr.length; i++) {
		resultado[resultado.length] = arr[i];
	}
	return resultado;
}

console.log(cortaArray([1, 2, 3], 1)); // [2, 3]
```

## ✏️ Ejercicio
Crea un programa que ordene alfabéticamente las palabras pasadas como parámetro. Por ejemplo:

```bash
> node ordena primera segunda tercera cuarta
['cuarta', 'primera', 'segunda', 'tercera']
```

Para ello, desarrollaremos las siguientes funciones:

1. La función `arrayMinPos`, que busca el valor mínimo de un array de forma similar a arrayMax, pero que retorna la posición o índice del elemento en lugar del elemento en sí.
2. Podemos reutilizar la función `cortaArray` del ejercicio anterior para obtener a partir de `process.argv` un array con todos los elementos a partir de la posición 2, es decir, con los parámetros introducidos por el usuario.
3. La función `ordenaArray`, que recibe como parámetro un array y retorna el array ordenado. Usaremos el método de ordenación por selección, que consiste en seleccionar el elemento menor de un array e irlo añadiendo al array destino. Cada vez que seleccionamos un elemento del array origen, debemos eliminarlo del array para evitar que se vuelva a seleccionar en la siguiente iteración. Para eliminarlo, basta con asignarle el valor `null`. Por lo tanto, la función `arrayMinPos` deberá tener en cuenta que el array puede tener elementos vacíos.

**Solución**:

```javascript
function arrayMinPos(arr) {
	let min = null;
	let minPos = -1;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== null) {
			if (min == null || arr[i] < min) {
				min = arr[i];
				minPos = i;
			}
		}
	}
	return minPos;
}

function cortaArray(arr, desde) {
	let resultado = [];
	for (let i = desde; i < arr.length; i++) {
		resultado[resultado.length] = arr[i];
	}
	return resultado;
}

function ordenaArray(arr) {
	let resultado = [];
	for (let i = 0; i < arr.length; i++) {
		let minPos = arrayMinPos(arr);
		resultado[resultado.length] = arr[minPos];
		arr[minPos] = null;
	}
	return resultado;
}

console.log(ordenaArray(cortaArray(process.argv, 2)));
```

## ✏️ Ejercicio
Para este ejercicio usaremos el navegador en lugar de node.js: vamos a mover una pelota en el navegador. Abre [JSBin](http://jsbin.com/) e introduce el siguiente código en la caja "HTML":

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <div id="pista">
    <div id="pelota"></div>
  </div>
</body>
</html>
```

Como puede verse, se define una página con sólo dos elementos:
- Un `<div>` llamado "pista" que delimitará el área por donde se moverá la pelota.
- Un `<div>` llamado "pelota", para dibujar la pelota en sí.

Nuestro programa JavaScript cambiará la posición del `<div>` "pelota" a lo largo del tiempo, dando la sensación que la pelota se está moviendo.

Añade también el siguiente código en la caja "CSS" de JSBin:

```css
#pista {
  border: 1px solid red;
  width: 400px;
  height: 300px;
  position: relative;
}

#pelota {
  background-color: blue;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  bottom: 0px;
  left: 0px;
  position: absolute;
}
```

El CSS declara dos reglas para definir las características visuales de la pista y la pelota: tamaño, color, etc. Básicamente, la pista es un recuadro con borde rojo de 400 pixels de ancho y 300 pixels de alto, y la pelota es una redonda azul de 20 pixels de diámetro.

La siguiente función JavaScript nos servirá para colocar la pelota en una posición (x, y) determinada, relativa al vértice inferior izquierdo de la pista:

```javascript
function colocaPelota(x, y) {
	let pelota = document.getElementById('pelota');
	pelota.style.left = x + 'px';
	pelota.style.bottom = y + 'px';
}
```

Copia el código de la función en la caja "JavaScript" de JSBin, y añade una invocación para colocar la bola en una posición determinada, por ejemplo `colocaPelota(50, 50);`. JSBin ejecuta el código JavaScript cada vez que lo modificamos, de modo que podemos probar con diferentes posiciones y veremos cómo la pelota va cambiando de posición en la caja "Output".

Si queremos mover la pelota en pantalla, necesitaremos lo siguiente:

1. Unas variables que controlen la posición x e y de la pelota, así como su velocidad horizontal y vertical
2. Una función que mueva la pelota, modificando gradualmente la posición x e y
3. Un mecanismo para llamar a la función que mueve la pelota varias veces por segundo, para obtener un efecto de movimiento.

El siguiente código combina los 3 elementos para mover la pelota horizontalmente:

```javascript
// 1. Declaramos variables
const ancho = 380, alto = 280;
let x = 0, y = 250;
let vx = 2, vy = 1;

// Coloca la pelota en x, y
function colocaPelota(x, y) {
	let pelota = document.getElementById('pelota');
	pelota.style.left = x + 'px';
	pelota.style.bottom = y + 'px';
}

// 2. Función que mueve la pelota un paso
function muevePelota() {
  x += vx;
  if (x <= 0 || x >= ancho) vx = -vx;
  colocaPelota(x, y);
}

// 3. Llama a la función cada 10 milisegundos
setInterval(muevePelota, 10);
```

El "truco" para hacer rebotar la pelota contra la pared de la pista está en comprobar si la coordenada x está tocando alguno de los dos lados, y en ese caso invertir el signo de su velocidad, produciéndose como resultado un cambio de dirección.

Si queremos que la pelota se mueva de otra forma, simplemente debemos modificar el código de la función `muevePelota`. Por ejemplo, para que se mueva y rebote también en el eje vertical:

```javascript
function muevePelota() {
  x += vx;
  y += vy;
  if (x <= 0 || x >= ancho) vx = -vx;
  if (y <= 0 || y >= alto) vy = -vy;
  colocaPelota(x, y);
}
```

Podemos además añadir la gravedad como aceleración negativa sobre el eje vertical, definiéndola como constante:

```javascript
const gravedad = 0.1;
```

Y adecuando la función muevePelota para que tenga en cuenta la gravedad:

```javascript
function muevePelota() {
  x += vx;
  y += vy;
  if (x <= 0 || x >= ancho) vx = -vx;
  if (y <= 0 || y >= alto) vy = -vy;
  else vy -= gravedad;
  colocaPelota(x, y);
}
```

Con esto tenemos una pelota que va botando contra el suelo y rebotando contra las paredes.
