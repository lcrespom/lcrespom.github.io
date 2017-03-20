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
