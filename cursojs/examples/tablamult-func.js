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
