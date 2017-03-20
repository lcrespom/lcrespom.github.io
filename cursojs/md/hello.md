# Conceptos fundamentales de programación

## Sentencias
De acuerdo con el paradigma imperativo, JavaScript ejecuta las instrucciones del programa una a una, secuencialmente. Cada instrucción recibe el nombre de **sentencia**, y, como iremos viendo, ejecuta un tipo de acción determinado, como por ejemplo realizar cálculos, evaluar una condición, repetir un grupo de sentencias, etc.

## Expresiones
Antes de ver las sentencias del lenguaje, debemos conocer un componente más básico: las expresiones.

Una **expresión** es cualquier trozo de código que genera como resultado un valor. Por ejemplo, expresiones aritméticas del tipo:

```javascript
3 + 2
42
2 * 3 * (4 + 10) - 55
10 / 2
```

👉 Abrid la consola JavaScript del navegador y escribid estas expresiones, de una en una, pulsando el retorno de carro tras cada línea. El navegador responderá con el resultado de evaluar la expresión aritmética:

```javascript
> 3 + 2
5
> 42
42
> 2 * 3 * (4 + 10) - 55
29
> 10 / 2
5
```

## Variables y asignaciones
De poco sirve calcular valores si no podemos almacenarlos en memoria. Para ello, JavaScript utiliza **variables**, que es una forma de reservar una posición de memoria para almacenar un valor y darle un nombre que podamos usar para obtener el valor más adelante.

### Declaración de variable
Para poder utilizar una variable, debemos declararla primero, dándole un nombre. Para ello se utiliza la palabra reservada `let`, por ejemplo:

```javascript
> let precio
```

En este contexto, la palabra `let` podría traducirse del inglés como "sea", es decir, "sea la variable precio". A partir de este momento, JavaScript reserva una posición de memoria para nuestra variable, y asocia el identificador `precio` a dicha posición de memoria.

### Asignación de un valor a una variable
Una vez declarada una variable, podemos asignarle un valor usando el símbolo "`=`":

```javascript
> precio = 99
```
Y ahora podemos usar la variable en expresiones. Al calcular el resultado de una expresión, se sustituirán todas las variables por sus respectivos valores:

```javascript
> precio * 0.21
20.79
```
Una vez declarada una nueva variable, podemos asignarle nuevos valores tantas veces como queramos. Simplemente se sustituirá su valor anterior por el nuevo.

Tanto la declaración de una variable mediante `let` como la asignación de un valor mediante `=` son **sentencias** de JavaScript. Podemos juntar la declaración y asignación en una sola sentencia:

```javascript
> let precio = 99
```

Que podría traducirse como "sea el precio igual a 99".

> _ __* Nota__: JavaScript es muy permisivo y admite asignar valores a variables no existentes, de modo que la variable se creará en el momento de asignarle un valor por primera vez. Pero esto debe evitarse a toda costa porque con frecuencia provoca efectos inesperados._

<!-- ToDo: diagrama -->

El uso de variables nos permite realizar cálculos tan complejos como queramos:

```javascript
> let velocidad = 120
> let tiempo = 2
> let distancia = velocidad * tiempo

> let horas = 2
> let minutos = 30
> let totalSegundos = ((horas * 60) + minutos) * 60
```

Una variable declarada con la palabra `let` puede modificarse tantas veces como queramos:

```javascript
> let colorFavorito = 'rojo'
> colorFavorito = 'verde'
> colorFavorito = 'azul'
```

La palabra `const` también se puede utilizar para declarar variables, y es equivalente a `let` con una diferencia importante: una vez inicializada la variable, no puede modificarse su valor:

```javascript
> const equipoDeFutbol = 'Barça'
> equipoDeFutbol = 'Madrid'
Uncaught TypeError: Assignment to constant variable.
```

Como puede verse, una cosa es cambiar el color favorito, y otra el equipo de fútbol. JavaScript controla cualquier intento de modificación de una variable declarada con `const` y genera un mensaje de error, interrumpiendo la ejecución del programa.


### Precedencia de operadores
Al igual que en matemáticas, los operadores aritméticos tienen distinta prioridad. En concreto, los operadores de multiplicación (`*`) y división (`/`) tienen más prioridad que los de suma (`+`) y resta (`-`). Por lo tanto, en una expresión se evaluarán primero las multiplicaciones y divisiones y luego las sumas y restas:

```javascript
> 5 + 10 * 2
25
```

Al igual que en notación matemática, si queremos modificar la precedencia por defecto, debemos usar paréntesis:

```javascript
> (5 + 10) * 2
30
```

## Cadenas de texto
JavaScript no sólo es capaz de calcular, manipular y almacenar valores numéricos. También trabaja con texto. Una cadena de texto se define usando las comillas, por ejemplo:

```javascript
> let nombre = 'Luis'
> let direccion = "C/ Diagonal, 571, Ático 2ª"
```

Como puede verse, se soporta el uso tanto de comilla simple como de comilla doble. Esto nos permitirá incluir comillas dentro de nuestras cadenas de texto:

```javascript
> let cita = 'Confucio dijo: "己所不欲，勿施于人", y aún sigue siendo cierto'
```

Las cadenas de texto también pueden combinarse mediante concatenación en expresiones usando el símbolo `+` como operador de concatenación:

```javascript
> let calle = 'Diagonal 571'
> let piso = 'Ático 2ª'
> let ciudad = 'Barcelona'
> let direccion = calle + ', ' + piso + ', ' + ciudad
```

Si bien se puede usar tanto la comilla simple como doble para delimitar cadenas de texto, el convenio es usar preferentemente la comilla simple. Esto se debe a que el convenio en HTML es usar la comilla doble, y de este modo es más fácil mezclar JavaScript y HTML cuando es necesario.

JavaScript ofrece muchas otras funciones para manipular texto: podemos separar texto en palabras, extraer diferentes partes de un texto, buscar patrones dentro de una cadena, pasar a mayúsculas o minúsculas, etc. Veremos todas estas funciones más adelante.

## Tipos de datos
### Números y textos
Hemos visto que podemos definir variables que almacenan números, como por ejemplo `let a = 1`, y también texto como `let b = "Hola"`. Podemos averiguar el tipo de datos de una variable usando la palabra reservada `typeof`:

```javascript
> let a = 3
> typeof a
"number"
> let b = "Hola"
> typeof b
"string"
```

El nombre "string" es el término que se usa en programación para designar las cadenas de texto.

Todo valor utilizado en JavaScirpt tiene asociado un tipo. El tipo de una variable dependerá del valor que le haya sido asignado. Como podemos asignar distintos valores a una misma variable, el tipo de la variable será el del valor asignado más recientemente.

```javascript
> let a
> a = -43.2
> typeof a
"number"
> a = 'Mr Robot'
> typeof a
"string"
```

A diferencia de otros lenguajes más estrictos, JavaScript permite que una misma variable pueda almacenar valores de distinto tipo. Se dice que es un lenguaje "débilmente tipado" o "permisivamente tipado" (en inglés, _loosely typed_). En general, JavaScript es un lenguaje permisivo en comparación con otros lenguajes de programación.

### Booleanos
Otro tipo de datos muy importante es el utilizado para determinar si una condición es cierta o falsa, por ejemplo:

```javascript
> a = 1
> a < 2
true
> 2 < a
false
> a == 1
true
> a != 3
true
> a <= 0
false
```
Los operadores de comparación `<` (menor que), `<=` (menor o igual que), `>` (mayor que), `>=` (mayor o igual que), `==` (igual) y `!=` (distinto) comparan dos valores y retornan el valor cierto (`true`) o falso (`false`) según la comparación sea correcta o no para los valores comparados. Estos valores se pueden almacenar en variables, por ejemplo:

```javascript
> let iguales = "peras" == "manzanas"
> iguales
false
typeof iguales
"boolean"
```

Las variables cuyo valor es cierto o falso reciben el nombre de booleanos. Son muy útiles porque, como veremos más adelante, pueden utilizarse para decidir realizar una acción dependiendo de si se cumple o no una determinada condición.

Dos o más valores booleanos pueden combinarse lógicamente. Por ejemplo, si queremos comprobar que llueve **y** hace sol:

```javascript
> let lluvia = true
> let sol = true
> let arcoIris = lluvia && sol
> arcoIris
true
> sol = false
> lluvia && sol
false
```

Como puede verse, la expresión ` b1 && b2` evalúa a cierto sólo si tanto `b1` como `b2` son cierto, y en cualquier otro caso evalúa a falso. Si en cambio queremos comprobar si es cierto alguno de los dos booleanos, usaremos la expresión `b1 || b2`:

```javascript
> let sol = true
> let fantasma = false
> let gafasDeSol = sol || fantasma
> gafasDeSol
true
```

Finalmente, la expresión `!b` cambia el valor de `b`, de modo que si `b` es `true`, entonces `!b` es `false`, y viceversa:

```javascript
> let dia = false
> let noche = !dia
> noche
true
```

Los operadores de comparación se pueden usar para comparar valores de cualquier tipo. En el caso de números, los comparadores `<`, `<=`, `>` y `>=` utilizan la ordenación natural de los números. En el caso de strings, la comparación es por orden alfabético:

```javascript
> 'Abascal' <= 'Zunzunegui'
true
> 'antílope' > 'zorro'
false
```

> _Todas las mayúsculas preceden a las minúsculas, y por lo tanto_ `'Zorro' < 'castor'` _evalúa a_ `true`.


### Arrays
Números, strings y booleanos son tipos de datos _primitivos_, en oposición a otros tipos de datos _compuestos_ como es el caso de los arrays.

Un _array_ es un conjunto ordenado de valores, que pueden ser de cualquier tipo de datos. La forma de definir un array es usando "`[`", "`,`" y "`]`":

```javascript
let loto = [4, 8, 15, 16, 23, 42]
let diasSemana = ["lunes", "martes", "miércoles",
	"jueves", "viernes", "sábado", "domingo"]
let mixto = [1, 'dos', 3, false, [100, 200]]
```

Para hacer referencia a una posición determinada del array, usamos `nombre[posición]`:

```javascript
> diasSemana[1]
"martes"
```

Como puede verse, el primer elemento se cuenta a partir del 0, y por lo tanto la posición del segundo elemento utiliza el índice 1 (...y así sucesivamente). Podemos usar la misma notación para modificar el valor de una posición determinada:

```javascript
> diasSemana[4] = 'Friday'
> diasSemana
["lunes", "martes", "miércoles", "jueves", "Friday", "sábado", "domingo"]
```

El índice de un array puede ser cualquier expresión numérica:

```javascript
> diasSemana[1 + 1]
"miércoles"
> let pos = 10 - 5
> diasSemana[pos + 1]
"domingo"
```

### Undefined y Null
Hay un par de tipos de datos especiales, utilizados para denotar valores no disponibles.

Al declarar una variable sin inicializarla, usando la sentencia `let x`, JavaScript le reserva un espacio en memoria y le asigna el valor `undefined`, es decir "indefinido" o "pendiente de inicializar".

El valor `undefined` se usa en todas las variables no inicializadas, y también para denotar elementos inexistentes, por ejemplo si intentamos acceder a una posición de un array más allá de su longitud:

```javascript
> let nums = [11, 22, 33]
> nums[20]
undefined
```

Por su parte, `null` es un valor que podemos utilizar en nuestro código cuando queremos indicar "valor no disponible" o "vacío". Por ejemplo, si tenemos las siguientes variables:

```javascript
> let nombre = 'Carlos'
> let estadoCivil = 'Casado'
> let nombreConyuge = 'Ana'
```

Pero resulta que hay casos en los que el nombre del cónyuge no aplica:

```javascript
> let nombre = 'Juan'
> let estadoCivil = 'Soltero'
> let nombreConyuge = null
```

> _ __* Nota__: en este caso podríamos usar la cadena vacía '', pero no siempre tendremos esa posibilidad._

### Conversión de tipos
Hemos visto que `42` denota un número, mientras que `"42"`, al estar entre comillas, denota una cadena de texto. De este modo, la expresión `40 + 2` evalúa a `42`, porque se están sumando valores numéricos, mientras que la expresión `"40" + "2"` evalúa a `"402"`, porque se está concatenando strings, igual que cuando se concatena `"Hola "` y `"mundo"`.

¿Qué ocurre cuando usamos el operador `+` con datos de distinto tipo? Si uno de los dos datos es un string, entonces convertirá el otro a string y concatenará las cadenas de texto. Por lo tanto, tanto `40 + "2"` como `"40" + 2` evalúan a `"402"`. En resumen, para convertir cualquier número a texto y combinarlo con más texto, basta con concatenar el número con cualquier texto, incluso la cadena vacía: `"" + 10` evalúa a `"10"`.

Si por el contrario queremos convertir un texto a número, la opción más directa es prefijar `+` al valor de texto. Por ejemplo:

```javascript
> let precioTexto = "10"
> let precioNum = +precioTexto
> precioNum * 2
20
```

### NaN
Si intentamos convertir a número un texto que no representa un número, entonces JavaScript le asignará el valor `NaN`, que es la abreviación de _Not a Number_, es decir "no es un número".
`NaN` también se usa para indicar resultados erróneos como por ejemplo una división por 0 o la raíz cuadrada de un número negativo. Si en una expresión aritmética, uno de los términos es NaN, entonces el resultado de la expresión es NaN.

Veamos algunos ejemplos usando la consola:

```javascript
> +'10'
10
> +'10manzanas'
NaN
> 10/0
NaN
> let x = +'Hola'
> x + 2
NaN
```

