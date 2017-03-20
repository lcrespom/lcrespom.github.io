# Introducción

## Presentación
- Nombre
- ¿A qué te dedicas?
- Conocimientos de programación y web
- Motivación para realizar el curso

## Historia de los lenguajes de programación

### Código máquina y ensamblador
Los programas son ejecutados por la CPU (unidad central de proceso), que obedece un juego de instrucciones muy reducido:
- Operaciones aritméticas con valores numéricos (+, -, *, /)
- Mover datos entre distintas posiciones de memoria
- Leer de puertos de entrada (ej. teclado, WiFi...)
- Escribir en puertos de salida (ej. pantalla, WiFi...)

![CPU](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Intel_80486DX2_bottom.jpg/440px-Intel_80486DX2_bottom.jpg)

Las instrucciones se almacenan en memoria y se ejecutan en secuencia, una a una, leyéndolas de posiciones consecutivas de memoria, o eventualmente saltando a otra posición de memoria tras comparar dos valores.

Originalmente todos los programas se desarrollaban directamente usando el juego de instrucciones de la CPU. Pero esta programación a tan bajo nivel es una tarea muy tediosa y limita la capacidad de desarrollar programas complejos.

```asm
gcd:   neg     eax
       je      L3
L1:    neg     eax
       xchg    eax,edx
L2:    sub     eax,edx
       jg      L2
       jne     L1
L3:    add     eax,edx
       jne     L4
       inc     eax
L4:    ret
```

![Arduo](http://cdn.awn.com/sites/default/files/styles/inline_wide/public/image/featured/1017077-13-vital-links-screenwriter.png?itok=DrOiC1cc)

### Lenguajes de alto nivel
Para superar las limitaciones del lenguaje máquina, se diseñaron lenguajes con mayor nivel de abstracción, orientados a facilitar la tarea del programador. Como el código máquina es lo único que comprende la CPU de cualquier ordenador, cualquier otro lenguaje de programación debe ser traducido previamente a código máquina para poder ser ejecutado por la CPU.

Tradicionalmente se distinguen dos tipos de traducción:
- **Compilación**: traducción realizada en una etapa previa a la entrega del programa al usuario final, que lo recibe ya en formato de código máquina ejecutable.
- **Interpretación**: el usuario parte del código fuente en el lenguaje de alto nivel, y la traducción se realiza en el momento de ejecutar el programa.

Actualmente esta distinción no es tan clara, puesto que la compilación puede realizarse justo en el momento de ejecutar el programa.

### Paradigmas de programación
Hay diferentes enfoques a la hora de diseñar un lenguaje de alto nivel. Los principales son:
#### Paradigma imperativo
El programa indica con detalle todos los pasos que debe realizar el ordenador para llevar a cabo una tarea determinada. Por ejemplo:

```javascript
Programa "traer cerveza":
	1. Memorizar posición actual
	2. Ir a la nevera
	3. Abrir puerta de la nevera
	4. Si no hay cerveza, ir al paso 6
	5. Coger cerveza
	6. Cerrar puerta de la nevera
	7. Volver a la posición memorizada
```
Este paradigma se corresponde directamente con la forma de ejecutar instrucciones de la CPU, permitiendo el máximo control, pero forzando al programador a controlar todos los detalles.

#### Paradigma orientado a objetos
Basado en el paradigma imperativo, añade el concepto de los _objetos_, que son entidades capaces de almacenar datos y realizar acciones sobre sus propios datos. Por ejemplo:

```javascript
Programa "traer cerveza":
	1. Memorizar posición actual
	2. robot.ir-a(nevera.posición)
	3. nevera.abrir-puerta
	4. Si no nevera.tiene('cerveza') ir al paso 6
	5. robot.coger('cerveza')
	6. nevera.cerrar-puerta
	7. robot.ir-a(posición memorizada)
```

Al encapsular los conceptos de un programa en objetos, se facilita su manipulación. Este paradigma es el más usado en la actualidad desde hace bastante tiempo, aunque el paradigma funcional está ganando cada vez más aceptación.

#### Paradigma funcional
El paradigma funcional es totalmente opuesto al imperativo. El programador define funciones que calculan valores de salida en base a valores de entrada, y el lenguaje de programación se encarga de llamar a las funciones para realizar las tareas pertinentes en cada momento. Por ejemplo:

```javascript
Programa "traer cerveza":
	Entrada: nevera1
	Salida: nevera2, cerveza
	1.- cerveza = buscar(nevera1, 'cerveza')
	2.- nevera2 = nevera1 - cerveza
```

Este paradigma existe a nivel académico desde hace mucho tiempo, y recientemente está empezando a considerarse en ámbitos más prácticos como el desarrollo de aplicaciones Web.


## Historia de JavaScript
- La primera versión de JavaScript fue desarrollada en 1995 por Brendan Eich en 10 días: sus jefes le dijeron que tenía que tener una demo lista en ese tiempo.
	- A causa de las prisas, las primeras versiones del lenguaje estaban llenas de limitaciones e [incoherencias](https://www.destroyallsoftware.com/talks/wat). Algunos de estos problemas se han arrastrado hasta hace poco, porque es necesario mantener la compatibilidad con las páginas antiguas.
- A pesar de eso, el lenguaje es relativamente sencillo y muy potente.
	- Soporta principalmente los paradigmas imperativo y orientado a objetos, pero también el funcional.
	- Debido a su aparente sencillez, la gente se lanza a programar en él sin aprenderlo formalmente, a diferencia de la mayoría de lenguajes de programación.
- En los últimos años el lenguaje se ha actualizado, y con las herramientas adecuadas, se pueden olvidar los problemas del pasado.
- JavaScript **no es** Java:
	- Su nombre original era _LiveScript_
	- Se cambió a JavaScript por motivos comerciales: un acuerdo entre Netscape y Sun
	- La especificación estándar se conoce como _ECMAScript_ (no podía estandarizarse el nombre JavaScript por ser copyright de Sun)
- A pesar de tener 20 años, el lenguaje continúa evolucionando. La versión actual es la 6, también conocida com ES6. Incorpora grandes mejoras respecto de versiones anteriores y está soportada por la práctica totalidad de los navegadores, excepto Internet Explorer 11 (que es el que usaba Windows 7 - Windows 10 usa _Edge_, que sí soporta ES6).

## ¿Por qué aprender JavaScript?
- JavaScript es el lenguaje de ámbito general **más ubicuo** del mundo:
	- El lenguaje de la Web, disponible en todos los navegadores modernos, en ordenadores, móviles, tablets, televisores, etc.
		- Usado para añadir interactividad a las páginas web, permite transformar páginas estáticas que únicamente muestran un documento en aplicaciones completamente interactivas.
		- La web tal como la conocemos actualmente sería imposible sin JavaScript: volveríamos a principios de los 90.
		- Actualmente los navegadores son capaces de mucho más que mostrar documentos HTML estáticos: videojuegos, composición musical, retoque fotográfico, videoconferencia... las posibilidades son ilimitadas.
		<!-- ToDo: añadir imágenes -->
	- Un subconjunto de JavaScript (JSON) es el formato más utilizado para el intercambio de mensajes entre el navegador y el servidor.
	- Recientemente está potenciándose como lenguaje en otros entornos:
		- Entorno de servidor, en detrimento de otros lenguajes más "tradicionales" de dichos entornos como PHP, Java o Ruby. La plataforma de servidor más utilizada es [Node.js](http://nodejs.org).
		- Para aplicaciones _nativas_, ya sea en móviles y tablets ([Cordova](http://cordova.apache.org), [Ionic](http://ionic.io), etc.)
- Debido a su popularidad:
	- Es el lenguaje más utilizado en Open Source
	- Existen innumerables librerías de código gratuitas disponibles para usar en nuestros programas
	- Disponemos de una gran variedad de herramientas de programación: editores, debuggers, entornos de pruebas, revisores de código, etc.
- Los programadores profesionales deberían dominar varios lenguajes de programación
	- _&ldquo;Learn a new programming language every year&rdquo;_ ([The Pragmatic programmer](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X)).


## Referentes

#### Brendan Eich
![](https://avatars2.githubusercontent.com/u/313317?v=3&s=466)
- Creador del lenguaje
- Participa en la modernización de JavaScript
- https://brendaneich.com/

#### Douglas Crockford
![](https://avatars3.githubusercontent.com/u/262641?v=3&s=466)
- Adalid del lenguaje cuando nadie se lo tomaba en serio
- Descubridor de la notación JSON
- Charlas sobre JavaScript muy buenas y amenas
	- [The JavaScript Trilogy](https://www.youtube.com/watch?v=v2ifWcnQs6M&list=PL5586336C26BDB324)
	- [Crockford on JavaScript](https://www.youtube.com/watch?v=JxAXlJEmNMg&list=PL7664379246A246CB)
- Autor del libro _[JavaScript, the good parts](http://shop.oreilly.com/product/9780596517748.do)_
	- Libro muy breve, recomendable para gente que ya sepa programar en otros lenguajes.
- http://www.crockford.com/

#### Kyle Simpson
![](https://avatars1.githubusercontent.com/u/150330?v=3&s=466)
- Autor del libro gratuito (Open Source) _[You don't know JavaScript](https://github.com/getify/You-Dont-Know-JS)_
	- Colección extensa de varios tomos, pero muy recomendable si se quiere aprender JavaScript a fondo.
- https://github.com/getify

<!-- ToDo: revisar js.ppt para más historietas sobre JS -->