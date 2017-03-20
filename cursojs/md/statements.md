# Sentencias

## Prólogo
Hasta ahora hemos estado trabajando con la consola del navegador o de node, escribiendo expresiones o breves sentencias de declaración y asignación de variables. Como gradualmente vamos a escribir más código, a partir de ahora vamos a utilizar un editor de código para escribir nuestros programas en un fichero de texto, para ejecutarlos en node o el navegador.

👉 Cread una nueva carpeta de trabajo que contendrá todos los programas de este curso. Usad un fichero distinto para cada programa, siempre terminando el nombre en .js, por ejemplo `programa1.js`. Una vez tengáis escrito el código de un programa y esté listo para ser probado, podéis ejecutarlo desde node abriendo una línea de comandos y tecleando:

```bash
> node programa1
```

(...o el nombre del programa que proceda). Como node ejecuta ficheros JavaScript, no es necesario escribir la extensión `.js`.

> _ __* Nota__: si estáis usando VS Code, recuperad las instrucciones de instalación y añadid un fichero `.eslintrc.json` a la carpeta donde tendréis vuestros programas._

La consola interactiva siempre muestra el resultado de evaluar cualquier expresión que escribamos. Cuando ejecutamos un programa, si queremos mostrar datos en la consola debemos usar la sentencia `console.log(mensaje)`. Escribid nuestro primer programa para probarlo:

```javascript
console.log('Hola, mundo!');
```

Salvad el código en el fichero `hola.js` y ejecutadlo escribiendo `node hola` en la línea de comandos. Este es el famoso programa "Hello, world!", que desde hace mucho tiempo es el primero que se presenta a todo programador cuando aprende un nuevo lenguaje de programación.

La sentencia `console.log(expresión)` admite cualquier expresión entre los paréntesis. JavaScript se encargará de convertirla en un string antes de mostrarla por la consola.

Para hacer nuestros programas más versátiles, vamos a añadir la capacidad de leer datos de la línea de comandos. Node pone a disposición de nuestros programas el array `process.argv`, en el que cada uno de los elementos del array se corresponde con un parámetro del comando con el que lanzamos el programa. Probad a ejecutar el siguiente programa (llamadlo por ejemplo `params.js`):

```javascript
console.log(process.argv);
```

Pasando un par de parámetros:

```bash
> node params hola adiós
[ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\js\\params', 'hola', 'adiós' ]
```

El contenido del array `process.argv` es el siguiente:
- El primer elemento (índice 0) es la ruta completa al programa node.
- El segundo elemento (índice 1) es la ruta completa a nuestro programa.
- El resto de parámetros (índices del 2 en adelante) se corresponden con los que proporcionamos después del nombre de nuestro programa.

De modo que si modificamos el programa `hola.js` para que contenga este código:

```javascript
console.log('Hola, ' + params.argv[2] + '!');
```

Y luego lo ejecutamos mediante el comando `node hola Ana` (o el nombre que queramos), deberíamos recibir el saludo de nuestro programa:

```bash
Hola, Ana!
```

Para ser útil, todo programa debe ser capaz de leer datos de entrada y generar datos de salida. Mediante `params.argv` podemos leer datos de entrada, y mediante `console.log` podemos generar datos de salida. Son formas rudimentarias de entrada y salida, pero nos servirán para comenzar.


## Condicionales
Es habitual en un programa el evaluar una condición, y si esta se cumple, realizar una acción o acciones determinadas. Para ello la mayoría de lenguajes de programación utilizan la sentencia `if`, que en JavaScript tiene el siguiente aspecto:

```javascript
if (expresión) {
	sentencias a ejecutar
}
```

Por ejemplo, si queremos ver si un número es positivo o negativo, podemos escribir:

```javascript
let x = -2;
if (x < 0) {
	console.log('Negativo');
}
```

### Bloques, indentación y ";"
Todo el código que escribamos entre `{` y `}` se ejecutará sólo si la condición es cierta. Los símbolos `{` y `}` se usan para delimitar lo que se llama un **bloque** de código, es decir, un grupo de sentencias que se ejecutan secuencialmente:

```javascript
if (minutos > 60) {
	console.log('Tiempo excedido');
	console.log('Por favor, introduzca una moneda para continuar');
}
```

Podemos ver además varias características del código de un bloque:
- Separamos cada sentencia en una línea de código. Este es un convenio de estilo: por claridad, conviene no juntar varias sentencias en una misma línea.
- Cada sentencia termina con `;`. De esta forma, JavaScript puede detectar el fin de una sentencia y el principio de la siguiente. Como hemos explicado anteriormente, JavaScript es un lenguaje permisivo y si nos olvidamos el `;` tratará de corregir el error automáticamente, pero no siempre será capaz de hacerlo. Por lo tanto, se recomienda terminar todas las sentencias con `;` aunque no sea estrictamente necesario, porque no podemos estar seguros de si JavaScript va a poder corregirlo o no.

También podemos ver que todo el código del bloque comienza más a la derecha que el código de fuera del mismo. Esta es una norma de estilo que se usa para que sean más fáciles de distinguir los distintos bloques de código. A esta separación se le llama **indentación**, y puede formatearse mediante varios espacios en blanco o usando el tabulador (tecla `-->|`). la elección entre blancos o tabulador es una cuestión de preferencia, pero lo importante es usar siempre el mismo sistema, y, en caso de usarse los espacios en blanco, usar siempre el mismo número de espacios.

👉 Si configurasteis Visual Studio Code siguiendo las instrucciones, el revisor de código ESLint está configurado para detectar tanto la falta de `;` como la indentación incorrecta, y advertirlo mediante unas marcas en el editor.

### Else
Una sentencia `if` se compone de una expresión entre paréntesis, seguido de un bloque a ejecutar si la condición es cierta, y opcionalmente la palabra reservada `else` seguida de otro bloque de código, que se ejecutará si la condición **no** es cierta. El siguiente programa, que podemos llamar `testnum.js`, informa de si el número pasado por la línea de comandos es positivo o negativo:

```javascript
let num = +process.argv[2];
if (num < 0) {
	console.log(num + ' es negativo');
}
else {
	console.log(num + ' es positivo');
}
```

Para probarlo, podemos escribir `node testnum 5` o `node testnum -2` en la línea de comandos.

### Truthy / falsy
La condición que evalúa `if` entre los paréntesis debe ser un Booleano. En caso de no serlo, JavaScript lo convertirá a booleano usando la siguiente regla:
1. Los siguientes valores son considerados _falsy_ (falseables o "falsosos") y serán convertidos a `false`:
	- `0`
	- `""` (cualquier string vacío)
	- `null`
	- `undefined`
	- `NaN`
2. Cualquier otro valor es considerado _truthy_ ("verdaderoso") y será convertido a `true`.

Así, si `x` es un número, entonces `if (x)` ejecutará el bloque si `x` es distinto de `0` y `NaN`; y si `txt` es un string, entonces `if (txt)` ejecutará el bloque si `txt` no es una cadena vacía.

El caso de `NaN` es un poco especial, porque es el único valor que no es igual a sí mismo (y esto se considera un error de diseño del lenguaje). Es decir, como puede comprobarse en la consola, `NaN == NaN` evalúa a `false` y `NaN != NaN` evalúa a `true`.

Según esto, si queremos comprobar si una variable `x` contiene el valor `NaN`, no podemos hacer `if (x == NaN)` porque la condición no se cumplirá nunca: tanto si es un número cualquiera como si es `NaN`. Para solucionar este problema, JavaScript proporciona la función `isNaN`. Por ejemplo, si queremos asegurarnos que el parámetro que recibe nuestro programa por la línea de comandos es un número, podemos escribir lo siguiente:

```javascript
let num = +process.argv[2];
if (isNaN(num)) {
	console.log('Error: el parámetro ' + num + ' debe ser numérico');
}
else if (num < 0) {
	console.log(num + ' es negativo');
}
else {
	console.log(num + ' es positivo');
}
```

Véase también cómo encadenamos dos `if` usando `else if`. De esta forma se pueden comprobar tantas condiciones como necesitemos.

### ✏️ Ejercicio
Escribe un programa que reciba como parámetro un número y responda si es par o impar. Además, si el parámetro no es un número, debe mostrarse un mensaje de error.

> 👉 Para saber si un número es divisible por otro, podemos utilizar el operador `%`, que calcula el resto de la división entera. Por ejemplo, `7 % 2` es `1`, porque al dividir `7 / 2`, tendremos como resultado entero `3` y como resto `1`, mientras que `8 % 2` es `0` porque al ser `8` divisible por `2`, el resto es `0`.


**Solución**:

```javascript
let num = +process.argv[2];
if (isNaN(num)) {
	console.log('Error: debe proporcionarse un número');
}
else if (num % 2 == 0) {
	console.log(num + ' es par');
}
else {
	console.log(num + ' es impar');
}
```

### ✏️ Ejercicio
Vamos a poner en práctica lo aprendido sobre los arrays: escribe un programa que reciba como parámetro un número del 1 al 7 y escriba en la consola el día de la semana correspondiente, siendo 1 = lunes, 2 = martes, etc. hasta domingo = 7. En caso que el parámetro no sea un número entre 1 y 7, debe mostrarse un mensaje de error.

**Solución**:

```javascript
let num = +process.argv[2];
if (isNaN(num) || num < 1 || num > 7) {
	console.log('Error: debe proporcionarse un número entre 1 y 7');
}
else {
	let diasSemana = [
		'lunes', 'martes', 'miércoles',
		'jueves', 'viernes', 'sábado', 'domingo'
	];
	console.log(diasSemana[num - 1]);
}
```

### Comparación estricta
Como hemos visto, si queremos ver si dos valores son iguales usamos el símbolo `==` (que es doble para distinguirlo de la asignación). Cuando hay datos de distinto tipo en una expresión, JavaScript realizará una conversión implícita de tipos antes de realizar la comparación. Esto puede dar lugar a comparaciones algo sorprendentes, por ejemplo:

```javascript
> '33' == 33
true
> 0 == ''
true
```

Esta conversión en la comparación se considera otro error de diseño del lenguaje. Para corregirlo se añade la comparación mediante triple igual: `===`, que no realiza ninguna conversión, retornando cierto únicamente si los valores son del mismo tipo y además iguales:

```javascript
> '33' === 33
false
> 0 === ''
false
```

El mismo problema ocurre con `!=` a la inversa: si comparamos `0 != ''` nos evaluará a `false`, cuando lo lógico es que sea cierto que 0 y la cadena de texto vacía no sean lo mismo. Por lo que se añade la comparación `!==` para verificar si dos valores son estrictamente distintos:

```javascript
> '5' != 5
false
> '5' !== 5
true
```

## Iteraciones
Si en algo son buenas las máquinas, es en hacer tareas repetitivas sin cansarse. En programación imperativa, la sentencia para repetir un bloque de código es el **bucle** o _loop_ en inglés. En JavaScript hay varios tipos de bucle, pero todos tienen la misma estructura: repetir un bloque de código mientras se cumpla una determinada condición.

### While
Veamos el bucle más sencillo, el `while`:

```javascript
while (expresión) {
	sentencias a ejecutar
}
```

Ante un bloque while, JavaScript realizará los siguientes pasos:

1. Evaluar la expresión.
2. Si la expresión es cierta, o más concretamente _truthy_, entonces ir al paso 3, si no, ir al paso 5.
3. Ejecutar el bloque de código dentro de `{` y `}`.
4. Volver al paso 1.
5. Terminar el bucle y ejecutar la sentencia a continuación de `}`.

Obviamente, entre las sentencias que haya dentro del bloque debe ocurrir algo que modifique la condición que se evalúa en `while (expresión)`, porque de lo contrario el bucle continuará indefinidamente, hasta que el usuario se canse y cierre el programa. De hecho, este es un motivo frecuente por el que los programas se quedan "colgados": debido a un error de programación, un bucle no termina y deja bloqueada la ejecución indefinidamente dentro del bucle.

Veamos un primer ejemplo - el siguiente programa cuenta del 1 al 10:

```javascript
let i = 1;
while (i <= 10) {
	console.log(i);
	i = i + 1;
}
```

### ✏️ Ejercicio
Escribe un programa llamado `tablamult.js` que lea un número como parámetro y muestre la tabla de multiplicar del 1 al 10 de dicho número. Por ejemplo, si ejecutamos el comando `node tablamult 7`, tiene que imprimir:

```bash
7 por 1 es 7
7 por 2 es 14
7 por 3 es 21
7 por 4 es 28
7 por 5 es 35
7 por 6 es 42
7 por 7 es 49
7 por 8 es 56
7 por 9 es 63
7 por 10 es 70
}
```

**Solución**:

```javascript
let num = +process.argv[2];
let i = 1;
let prod;
while (i <= 10) {
	prod = num * i;
	console.log(num + ' por ' + i + ' es ' + prod);
	i = i + 1;
}
```

Analicemos el código, en particular las líneas destacadas:

```javascript
//let num = +process.argv[2];
let i = 1;
//let prod;
while (i <= 10) {
	//prod = num * i;
	//console.log(num + ' por ' + i + ' es ' + prod);
	i = i + 1;
}
```

Podemos ver que:

1. Hay una parte que inicializa la variable `i`, que es lo que llamamos el **contador** porque lleva el control del número de iteraciones del bucle.
2. Luego está la condición del while, que comprueba el contador para decidir si continuar iterando o terminar el bucle.
3. Finalmente, en el interior del bucle y justo al final del bloque incrementamos el contador para evitar que el bucle se repita indefinidamente. También podríamos decrementar el contador en caso que quisiéramos contar hacia atrás.

### For

Estos tres elementos: inicialización, comprobación e incremento (o decremento) del contador, son comunes a todos los bucles `while`. Existe otro tipo de bucle que junta los tres elementos en un mismo sitio: el `for`, que tiene la siguiente estructura:

```javascript
for (inicialización; condición; incremento) {
	sentencias a ejecutar
}
```

Por ejemplo el primer `while` que vimos y que cuenta de 1 a 10:

```javascript
let i = 1;
while (i <= 10) {
	console.log(i);
	i = i + 1;
}
```

Puede transformarse ahora agrupando inicialización, condición e incremento en los paréntesis del `for`:

```javascript
for (let i = 1; i <= 10; i = i + 1) {
	console.log(i);
}
```

Como puede verse, el código sólo ha cambiado en:
1. La palabra `while` cambia a `if`
2. Se mueven la inicialización y el incremento al interior de los paréntesis, y se separan por `;`.

### ✏️ Ejercicio
Copia el fichero `tablamult.js` a `tablamult-for.js` y sustituye el bucle `while` por un bucle `for`.

### Abreviaciones aritméticas
Vemos que para incrementar el contador en 1 usamos `i = i + 1`. Es decir, asignamos un nuevo valor a `i` que consiste en la suma del valor anterior de `i` + 1. Hay una abreviación para cualquier operación de tipo `a = a + b`, que es `a += b`. Esta abreviación se puede usar también con otros operadores aritméticos, por ejemplo `a *= b` equivale a `a = a * b`.

Cuando `b` es `1`, la abreviación `x += b` se puede reducir aún más a `x++`, que significa "sumar `1` a `x`". Y equivalentemente, la abreviación `x -= 1` se puede reducir a `x--`, que significa "restar `1` a `x`".

Este tipo de abreviaciones son muy comunes en los bucles. Por ejemplo el bucle `for` que se encuentra con más frecuencia es el siguiente:

```javascript
for (let i = 1; i <= 10; i++) {
	console.log(i);
}
```

### Tamaño de array y string
Cuando vimos los tipos de datos `array` y `string`, pasamos por alto una información importante de ambos tipos: su tamaño o longitud, que podemos obtener en ambos casos consultando la propiedad `length`.

En el caso de un `string`, su longitud indica el número de caracteres que lo compone. Por ejemplo:

```javascript
> let saludo = 'hola'
> saludo.length
4
> 'adiós'.length
5
> ''.length
0
```

En el caso de un `array`, su longitud indica el número de elementos que contiene:

```javascript
> [1, 2, 3].length
3
> [].length
0
```

En el caso de los strings, podemos usar la misma notación que con los arrays para obtener el carácter en una posición determinada, por ejemplo:

```javascript
> 'abcdefghi'[3]
"d"
```

Y al igual que con los arrays, si el índice es superior o igual al tamaño, no se produce ningún error y simplemente se retorna `undefined`:

```javascript
> 'abcdefghi'[99]
undefined
```

### ✏️ Ejercicio
Crea un programa llamado `cuentaa.js` que cuente el número de veces que aparece la letra `a` en la palabra que el usuario pase como parámetro al programa.

**Solución**:

```javascript
let palabra = process.argv[2];
let numAs = 0;
for (let i = 0; i < palabra.length; i++) {
	if (palabra[i] == 'a') {
		numAs++;
	}
}
console.log('La palabra ' + palabra + ' contiene ' + numAs + ' a(s)');
```

### Interpolación de variables dentro de un string
En la última línea del programa anterior, se concatena texto estático junto con variables para formar una frase a presentar en consola. La versión 6 de JavaScript permite una sintaxis que facilita la mezcla o interpolación de variables de una cadena de texto, usando <code>\`${variable}\`</code>:

```javascript
console.log(`La palabra ${palabra} contiene ${numAs} a(s)`);
```

Cuando se componen strings con mucha intercalación de texto fijo y variables, esta sintaxis es más cómoda y legible. Como ventaja añadida, se pueden definir textos compuestos de varias líneas:

```javascript
> let haiku = `
	Hecho de aire
	entre pinos y rocas
	brota el poema.
`
```

### Do while
Volvamos a ver la estructura del while:

```javascript
while (expresión) {
	sentencias a ejecutar
}
```

El programa primero comprobará si la condición entre paréntesis es cierta, y sólo si lo es, ejecutará el bloque de código. Si la expresión es falsa desde el principio, el bucle ejecutará cero iteraciones.

Existe una variante del while que primero ejecuta el bloque y luego comprueba la condición para decidir si continuar iterando:

```javascript
do {
	sentencias a ejecutar
} while (expresión)
```

Tal como indica el orden de escritura, la condición se comprueba tras una primera iteración, de modo que siempre se ejecutará al menos una iteración. Si bien esta variante puede ser útil en algunos casos, por ejemplo cuando la condición depende de datos calculados dentro del bloque, en la práctica el `do ... while` se usa mucho menos que el `for` o el `while`.

## Switch / case: de vuelta al condicional
Cuando vimos la sentencia `if`, se mostró cómo encadenar varios `if` y `else if` para comprobar múltiples condiciones, por ejemplo:

```javascript
if (diaSemana == 'lunes') {
	console.log('Sopa y pollo');
}
else if (diaSemana == 'martes') {
	console.log('Garbanzos y pescado');
}
else if (diaSemana == 'miércoles') {
	console.log('Ensalada y bistec');
}
else if (diaSemana == 'jueves') {
	console.log('Paella y pescado');
}
else {
	console.log('Cerrado por descanso');
}
```

En casos en los que un mismo valor se compara varias veces seguidas, existe un condicional más adecuado por ser algo más conciso: el `switch`:

```javascript
switch (diaSemana) {
	case 'lunes':
		console.log('Sopa y pollo');
		break;
	case 'martes':
		console.log('Garbanzos y pescado');
		break;
	case 'miércoles':
		console.log('Ensalada y bistec');
		break;
	case 'jueves':
		console.log('Paella y pescado');
		break;
	default:
		console.log('Cerrado por descanso');
}
```

Se puede reconocer la siguiente estructura:
1. El valor a comparar repetidas veces se indica en `switch (expresión)`
2. El valor con que se compara se indica en `case valor:`
3. Tras cada `case` se proporciona el código a ejecutar si la comparación es cierta
4. Cada `case` debe terminar con un `break`, o de lo contrario se ejecutará el código de todos los siguientes `case`, cosa que probablemente no queremos. Esto es un defecto heredado de Java, que a su vez lo heredó de C.
5. El último `else` se corresponde con el `default`, y se ejecutará si el valor a comparar no se corresponde con ninguno de los `case`.
